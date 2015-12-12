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
  var newEmail = user.emails[0].address
  console.log(newEmail);
  var emailExists = Meteor.users.find({
    'emails.address': newEmail
  }, {
    limit: 1
  }).count() > 0;

  console.log(emailExists + 'existance');

  if (emailExists === true) {
    // do something
  } else {
    profile = {};
    profile.nameOfArray = [];
    return user;
  }

})