Template.addWish.rendered = function() {
  Session.set('amazon-active', true);
  Session.set('addWishError', '');
  Session.set('amazonDisabled', true);
  Session.set('isWishing', false);

  // only show loading animation if loading more than 300ms
  Tracker.autorun(function() {
    var isWishing = Session.get('isWishing');
    if (!isWishing) {
      Session.set('showWishingLoading', false);
    }
    setTimeout(function() {
      if (Session.get('isWishing')) {
        Session.set('showWishingLoading', true);
      } else {
        Session.set('showWishingLoading', false);
      }
    }, 300);
  });
}

// sets all input values to blank
var emptyInputs = function() {
  $('.amazon-input').val('');
  $('.add-wish-form').find('input[name="name"]').val('');
  $('.add-wish-form').find('input[name="seller"]').val('');
  $('.add-wish-form').find('input[name="price"]').val('');
  $('.add-wish-form').find('input[name="url"]').val('');
  $('.add-wish-form').find('input[name="imageUrl"]').val('');
  $('.add-wish-form').find('input[name="detail"]').val('');
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
      if (validateAmazonURL(url)) {
        Session.set('addWishError', '');
        Session.set('isWishing', true);
        Meteor.call('addWishFromAmazon', url, function(err, res) {
          Session.set('isWishing', false);
          if (err) {
            Session.set('addWishError', err.reason);
          } else {
            emptyInputs();
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
      var event = event;

      var params = {
        name: name || '',
        price: price || '',
        seller: seller || '',
        url: url || '',
        image: image || '',
        detail: detail || ''
      }

      Session.set('addWishError', '');
      Session.set('isWishing', true);
      Meteor.call('addWish', params, function(err, res) {
        Session.set('isWishing', false);
        if (err) {
          Session.set('addWishError', err.reason);
        } else {
          emptyInputs();
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
