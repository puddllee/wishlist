Meteor.methods({
  emailExists: function(email) {
    var user = Meteor.users.findOne({
      $or: [{
        'emails.address': email
      }, {
        'services.facebook.email': email
      }, {
        'services.google.email': email
      }]
    });
    return user;
  },

  getUserType: function(email) {
    var google_logged_in = Meteor.users.find({
      'services.google.email': email
    });
    var facebook_logged_in = Meteor.users.find({
      'services.facebook.email': email
    });
    if (facebook_logged_in.count() >= 1) {
      return 'facebook';
    } else if (google_logged_in.count() >= 1) {
      return 'google';
    } else {
      return;
    }
  },

  addItem: function(wishlist, name, seller, price, detail, url, image, callback) {
    Wishlist.addItem(wishlist, name, seller, price, detail, url, image, callback);
  },

  deleteItem: function(itemId) {
    Wishlist.deleteItem(itemId);
  },

  getWishlist: function(userId) {
    return Wishlist.getWishlist(userId);
  }
});

Accounts.onCreateUser(function(options, user) {
  // Instantiate the wishes
  w = Wishlists.insert({
    'owner': user._id,
    'last_updated': Date.now()
  });

  if (options.profile) {
    user.profile = options.profile;
  } else if (options.email) {
    user.profile = {
      name: nameFromEmail(options.email)
    };
  }
  return user;
});
