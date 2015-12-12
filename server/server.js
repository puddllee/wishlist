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

  logCurrentUser: function(userId) {
    user = Meteor.users.findOne({
      _id: userId
    });
    console.log(user)
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