Template.addWish.rendered = function() {
  Session.set('amazon-active', true);
  Session.set('addWishError', '');
  Session.set('amazonDisabled', true);
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
          if (!err && res && res.length > 0) {
            var item = res[0];
            var att = item.ItemAttributes[0];
            var name = att.Title[0];
            var seller = 'Amazon';
            var image = item.MediumImage[0].URL[0];
            var detail = '';

            var price = '';

            console.log(item);

            // prevent parsing errors
            try {
              if (att.ListPrice && att.ListPrice.length > 0 && att.ListPrice[0].FormattedPrice.length > 0) {
                price = att.ListPrice[0].FormattedPrice[0];
              }

              if (item.Offers && item.Offers.length > 0 && item.Offers[0].Offer[0].OfferListing.length > 0 && item.Offers[0].Offer[0].OfferListing[0].Price.length > 0 && item.Offers[0].Offer[0].OfferListing[0].Price[0].FormattedPrice) {
                price = item.Offers[0].Offer[0].OfferListing[0].Price[0].FormattedPrice[0];
              }
            } catch (err) {}

            // get user wish list then add item to that list
            Meteor.call('getWishlist', Meteor.user()._id, function(error, response) {
              wishlist = response;
              console.log(wishlist);
              if (error) {
                console.log(error);
                return;
              }
              if (validateInput(name) && validateInput(seller) && wishlist) {
                Session.set('addWishError', '');
                Meteor.call('addItem', wishlist._id, name, seller, price, detail, url, image, function(error, result) {
                  if (error) {
                    console.log(error);
                    Session.set('addWishError', 'Something went wrong. Maybe try again?');
                  } else {

                  }
                });
              } else {
                Session.set('addWishError', 'Missing required fields');
              }
            });

          } else {
            Session.set('addWishError', 'Error fetching results from Amazon')
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
      Meteor.call('getWishlist', Meteor.user()._id, function(error, response) {
        wishlist = response;
        if (error) {
          console.log(error);
        }
        if (validateInput(name) && validateInput(seller) && wishlist) {
          Session.set('addWishError', '');
          Meteor.call('addItem', wishlist._id, name, seller, price, detail, url, image, function(error, result) {
            if (error) {
              console.log(error);
              Session.set('addWishError', 'Something went wrong. Maybe try again?');
            } else {
              event.target.seller.value = '';
              event.target.price.value = '';
              event.target.url.value = '';
              event.target.detail.value = '';
              event.target.imageUrl.value = '';
              event.target.name.value = '';
            }
          });
        } else {
          Session.set('addWishError', 'Missing required fields');
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