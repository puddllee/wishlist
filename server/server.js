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

getAvatar = function(email) {
  var md5Hash = Gravatar.hash(email);
  avatar = Gravatar.imageUrl(email);
  return avatar;
}

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
      name: nameFromEmail(options.email),
    };
  }
  user.profile.friends = [];
  if (user.services.facebook) {
    user.profile.avatar = getAvatar(user.services.facebook.email);
    user.profile.email = user.services.facebook.email;
  } else if (user.services.google) {
    user.profile.avatar = user.services.google.picture;
    user.profile.email = user.services.google.email;
  } else {
    user.profile.avatar = getAvatar(user.emails[0].address);
    user.profile.email = user.emails[0].address;
  }
  console.log('created new user with email: ' + user.profile.email);
  console.log('and avatar url: ' + user.profile.avatar)
  return user;
});