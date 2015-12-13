Wishlist = {
    addItem: function(wishlist, name, seller, price, detail, url, image, callback) {
      Items.insert({
        name: name,
        seller: seller,
        price: price,
        detail: detail,
        url: url,
        image: image,
        bought: false,
        wishlist: wishlist,
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
        console.log(wishlist)
        if (!wishlist) {
          return;
        }
        ownerId = wishlist.owner;
        owner = User.getUser(ownerId);
        console.log('owner: ' + owner);
        if (owner) {
          console.log('sending delete notification')
          label = owner.profile.name + " has removed " + item.name + " from their wishlist"
          Noti.addNoti(label, 'ok', item.bought_id, ownerId);
        }
      }
      Items.remove(itemId);
    },

    getItemsForList: function(userId) {

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
      console.log('buying: ' + itemId);
      if (Meteor.userId()) {
        console.log('updating')
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
        return Meteor.users.findOne({
          _id: item.bought_id
        })
      }
    }
  }
  // Meteor.methods(Wishlist);