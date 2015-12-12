Meteor.methods({
  addItem: function(wishlist, name, seller, price, detail, url, image, callback) {
    Items.insert({
      name: name,
      seller: seller,
      price: price,
      detail: detail,
      url: url,
      image: image,
      bought: false,
      wishlist: wishlist
    }, callback);
  },

  deleteItem: function(itemId) {
    Items.remove(itemId);
  },

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

  getWishlist: function(userId) {
    console.log('getting wishlist');
    wishlist = Wishlists.findOne({
      owner: userId
    });
    console.log(wishlist);

    return wishlist;
  }

});

Meteor.publish(null, function() {
  return Meteor.users.find({
    _id: this.userId
  }, {
    fields: {
      'services': 1,
    }
  });
})

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