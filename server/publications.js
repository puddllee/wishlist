Meteor.publish('items', function() {
  return Items.find({});
});

Meteor.publish('wishlists', function() {
  return Wishlists.find({
    owner: this.userId
  });
});

Meteor.publish('notis', function() {
  return Notis.find({
    owner: this.userId
  });
});

Meteor.publish(null, function() {
  return Meteor.users.find({
    _id: this.userId
  }, {
    fields: {
      'services': 1,
    }
  });
});
