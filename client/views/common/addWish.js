Template.addWish.rendered = function() {
  Session.set('amazon-active', true);
  Session.set('addWishError', '');
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

  'submit .add-wish-form': function(event) {
    event.preventDefault();

    if (Session.get('amazon-active')) {
      // amazon wish
      var url = event.target.amazonurl.value;
      if (validateInput(url)) {
        Session.set('addWishError', '');
        console.log('AMAZON: ' + url);
      } else {
        Session.set('addWishError', 'Amazon url required');
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
        if (validateInput(name) && validateInput(seller) && validateInput(price) && wishlist) {
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
  }
});
