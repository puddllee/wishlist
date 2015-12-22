Template.item.events({
  'click .delete': function() {
    Meteor.call('deleteItem', this._id);
  }
});
