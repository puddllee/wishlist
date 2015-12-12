Meteor.methods({
  emailExists: function(email) {
    return Meteor.users.find({
      'emails[0].address': email
    }).count() > 0 || Meteor.users.find({
      'services.facebook.email': email
    }).count() > 0 || Meteor.users.find({
      'services.google.email': email
    }).count() > 0;
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
    'lastUpdated': Date.now()
  });
  Meteor.publish("wishlists", function() {
    return Wishlists.find({
      _id: w
    }, {
      fields: {
        owner: 1,
        lastUpdated: 1
      }
    })
  })
  console.log('wishlist: ' + w)

  if (options.profile) {
    user.profile = options.profile;
  }
  return user;
});
