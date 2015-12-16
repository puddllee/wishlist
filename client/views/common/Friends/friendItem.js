Template.friendItem.rendered = function() {

}

Template.friendItem.events({
  'click .unfriend': function(event) {
    event.preventDefault();
    Meteor.call('removeFriend', this._id, function(error, result) {
      if (error) {
        reutnr;
      } else {
        // success
        Session.set('friendsList', Meteor.user().profile.friends);
      }
    });
  }
});
