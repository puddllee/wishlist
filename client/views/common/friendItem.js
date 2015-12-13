Template.friendItem.rendered = function() {

}

Template.friendItem.events({
  'click .unfriend': function(event) {
    event.preventDefault();
    console.log(this);
    console.log('unfriend ' + this.profile.name);
    Meteor.call('removeFriend', this._id, function(error, result) {
      if (error) {
        console.log(error);
      } else {
        // success
        Session.set('friendsList', Meteor.user().profile.friends);
      }
    });
  }
});