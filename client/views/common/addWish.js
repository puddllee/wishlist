Template.addWish.rendered = function() {
  Session.set('amazon-active', true);
  Session.set('addWishError', '');
  Session.set('amazonDisabled', true);
}

var addWish = function(params, callback) {
  var name = params.name || '';
  var price = params.price || '';
  var seller = params.seller || '';
  var url = params.url || '';
  var image = params.image || '';
  var detail = params.detail || '';

  Meteor.call('getWishlist', Meteor.user()._id, function(error, response) {
    wishlist = response;
    if (error) {
      return;
    }
    if (validateInput(name) && validateInput(seller) && wishlist) {
      Session.set('addWishError', '');
      Meteor.call('addItem', wishlist._id, name, seller, price, detail, url, image, function(error, result) {
        if (error) {
          Session.set('addWishError', 'Something went wrong. Maybe try again?');
          if (callback) {
            callback({
              isValid: false
            });
          }
          return;
        } else {
          if (callback) {
            callback(null);
          }
        }
      });
    } else {
      console.log(wishlist);
      Session.set('addWishError', 'Missing required fields');
      if (callback) {
        callback({
          isValid: false
        });
      }
    }
  });
}

Template.addWish.events({
  'click #amazon-tab': function() {
    Session.set('amazon-active', true);
    Session.set('addWishError', '');
  },

  'click #text-tab': function() {
    Session.set('amazon-active', false);
    Session.set('addWishError', '');
  },

  'input .amazon-input': function(event) {
    var input = $('.amazon-input').val();
    if (input && input !== '') {
      Session.set('amazonDisabled', false);
    } else {
      Session.set('amazonDisabled', true);
    }
  },

  'submit .add-wish-form': function(event) {
    event.preventDefault();

    if (Session.get('amazon-active')) {
      // amazon wish
      var url = event.target.amazonurl.value;
      event.target.amazonurl.value = '';
      if (validateAmazonURL(url)) {
        Session.set('addWishError', '');
        Meteor.call('productForURL', url, function(err, res) {
          if (!err && res) {
            var item = res.Item;

            if (!item) {
              // console.log('Amazon\'s fault, not ours');
              addWish({
                name: res.name,
                price: res.price,
                seller: 'Amazon',
                url: res.url,
                image: res.image,
                detail: res.detail
              });
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
                price = att.ListPrice.FormattedPrice + getCurrencyCode(att.ListPrice);
                detail = '';

                if (item.Offers && item.Offers.Offer && item.Offers.Offer.OfferListing && item.Offers.Offer.OfferListing.Price) {
                  price = item.Offers.Offer.OfferListing.Price.FormattedPrice + getCurrencyCode(item.Offers.Offer.OfferListing.Price);
                }

              } catch (error) {
                // parse error, don't do anything
              }

              addWish({
                name: name,
                seller: seller,
                image: image,
                url: url,
                price: price,
                detail: detail
              }, function(error) {});
            }
          }
        });
      } else {
        Session.set('addWishError', 'Invalid Amazon URL');
      }
    } else {
      // text wish
      var name = event.target.name.value;
      var seller = event.target.seller.value;
      var price = event.target.price.value;
      var url = event.target.url.value;
      var detail = event.target.detail.value;
      var image = event.target.imageUrl.value;

      addWish({
        name: name,
        seller: seller,
        price: price,
        url: url,
        detail: detail,
        image: image
      }, function(error) {
        if (!error) {
          // remove items from form
          event.target.seller.value = '';
          event.target.price.value = '';
          event.target.url.value = '';
          event.target.detail.value = '';
          event.target.imageUrl.value = '';
          event.target.name.value = '';
        }
      });
    }
  }
});

Template.addWish.helpers({
  amazonActive: function() {
    return Session.get('amazon-active') ? "active-tab" : "";
  },

  textActive: function() {
    return Session.get('amazon-active') ? "" : "active-tab";
  },

  amazonDisabled: function() {
    return Session.get('amazonDisabled');
  }
});
