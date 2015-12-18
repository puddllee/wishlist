Wishlist = {
  addWish: function(params, callback) {
    var wishlist = Wishlist.getWishlist(Meteor.userId());
    if (!wishlist) {
      throw new Meteor.Error(500, 'Wishlist not found');
      return;
    }

    if (validateInput(params.name) && validateInput(params.seller)) {
      Wishlist.addItem(wishlist, params.name, params.seller, params.price, params.detail, params.url, params.image, callback);
    } else {
      throw new Meteor.Error(500, 'Missing required fields');
    }
  },

  addWishFromAmazon: function(url, callback) {
    if (validateAmazonURL(url)) {
      var res = AMAZON.productForURL(url);
      var item = res.Item;
      if (!item) {
        // console.log('Amazon\'s fault, not ours');
        res.seller = 'Amazon';
        Wishlist.addWish(res, callback);
        return;
      } else {
        var name = '';
        var seller = '';
        var image = '';
        var price = '';
        var detail = '';

        // returns current code if usd or can, otherwise empty string
        // takes in amazon price object
        var getCurrencyCode = function(price) {
          if (price.CurrencyCode === 'USD' || price.CurrencyCode === 'CAN') {
            return ' ' + price.CurrencyCode;
          }
          return '';
        }

        try {
          var att = item.ItemAttributes;
          name = att.Title;
          seller = 'Amazon';
          image = item.MediumImage.URL;
          url = item.DetailPageURL;
          detail = '';

          if (att.ListPrice) {
            price = att.ListPrice.FormattedPrice + getCurrencyCode(att.ListPrice);
          }
          if (item.Offers && item.Offers.Offer && item.Offers.Offer.OfferListing && item.Offers.Offer.OfferListing.Price) {
            price = item.Offers.Offer.OfferListing.Price.FormattedPrice + getCurrencyCode(item.Offers.Offer.OfferListing.Price);
          }

        } catch (error) {
          // parse error, don't do anything
        }

        Wishlist.addWish({
          name: name,
          seller: seller,
          image: image,
          url: url,
          price: price,
          detail: detail
        }, callback);
      }
    } else {
      throw new Meteor.Error(500, 'Invalid Amazon URL');
    }
  },

  addItem: function(wishlist, name, seller, price, detail, url, image, callback) {
    Items.insert({
      name: name,
      seller: seller,
      price: price,
      detail: detail,
      url: url,
      image: image,
      bought: false,
      wishlist: wishlist._id,
      owner: wishlist.owner,
      created_at: new Date()
    }, callback);
  },

  deleteItem: function(itemId, wishlistId) {
    var item = Items.findOne({
      _id: itemId
    });
    if (item && item.bought) {
      // send notification to buyer
      wishlist = Wishlists.findOne({
        _id: wishlistId
      })
      if (!wishlist) {
        return;
      }
      ownerId = wishlist.owner;
      owner = User.getUser(ownerId);
      label = owner.profile.name + " has removed " + item.name + " from their wishlist"
      Noti.addNoti(label, 'ok', item.bought_id, ownerId);
    }
    Items.remove(itemId);
  },

  getItemsForList: function(wishlist) {
    var items = [];
    if (wishlist) {
      if (wishlist.owner === Meteor.userId()) {
        items = Items.find({
          wishlist: wishlist._id
        }, {
          sort: {
            created_at: -1
          },
          fields: {
            bought: 0,
            bought_id: 0
          }
        }).fetch();
      } else {
        items = Items.find({
          wishlist: wishlist._id
        }, {
          sort: {
            created_at: -1
          }
        }).fetch();
      }
    }
    return items;
  },

  getWishlist: function(userId) {
    // hide the bought status from the user if it is their own list
    if (userId === Meteor.userId()) {
      wishlist = Wishlists.findOne({
        owner: userId
      }, {
        fields: {
          'bought': 0,
          'bought_id': 0
        }
      });
    } else {
      wishlist = Wishlists.findOne({
        owner: userId
      });
    }
    return wishlist
  },

  buyItem: function(itemId) {
    if (Meteor.userId()) {
      var item = Items.findOne({
        _id: itemId
      });
      if (!item) {
        console.log('Buy Item: Item not found');
      }
      if (item.bought) {
        console.log('Cannot buy already bought item');
        return;
      }
      Items.update({
        _id: itemId
      }, {
        $set: {
          bought: true,
          bought_id: Meteor.userId()
        }
      }, function(error, result) {
        if (error) {
          console.log(error);
        } else {
          console.log(result);
          return result;
        }
      });
    }
  },

  unbuyItem: function(itemId) {
    if (Meteor.userId()) {
      Items.update({
        _id: itemId
      }, {
        $set: {
          bought: false,
          bought_id: null
        }
      })
    }
  },

  getBoughtUserName: function(itemId) {
    var item = Items.findOne({
      _id: itemId
    });
    if (item) {
      user = Meteor.users.findOne({
        _id: item.bought_id
      });
      if (user) {
        return user.profile.name;
      }
    } else {
      console.log('item not found');
    }
  }
};
Meteor.methods(Wishlist);
