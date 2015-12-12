Meteor.methods({
  addItem: function(name, callback) {
    Items.insert({
      name: name,
      createdAt: new Date()
    }, callback);
  },

  deleteItem: function(itemId) {
    Items.remove(itemId);
  },

  emailExists: function(email) {
    console.log('email: ' + email)
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
    console.log('google: ' + google_logged_in.count());
    console.log('facebook: ' + facebook_logged_in.count());
    if (facebook_logged_in.count() >= 1) {
      return 'facebook';
    } else if (google_logged_in.count() >= 1) {
      return 'google';
    } else {
      return;
    }
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
