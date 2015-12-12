Template.listItem.rendered = function() {

}

Template.listItem.events({
  'click .delete': function() {
    Meteor.call('deleteItem', this._id
      function(error, response) {
        if (error) {
          console.log(error);
        } else {
          console.log('deleted: ' + response)
        }
      })

  }
});