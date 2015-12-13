Template.friendItem.rendered = function() {

}

Template.friendItem.events({
  'click .unfriend': function(event) {
    event.preventDefault();
    console.log(this);
    console.log('unfriend ' + this.profile.name);
  }
});
