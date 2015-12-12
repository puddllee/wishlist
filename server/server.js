Meteor.methods({
  addItem: function(name, callback) {
    Items.insert({
      name: name,
      createdAt: new Date()
    }, callback);
  },

  deleteItem: function(itemId) {
    Items.remove(itemId);
  }
});
