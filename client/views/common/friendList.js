Template.friendList.rendered = function() {

}

Template.friendList.events({
  'submit .add-friend': function(event) {
    event.preventDefault();

    var search = event.target.search.value;
    console.log('seach: ' + search);
  }
});

Template.friendList.helpers({
  addDisabled: function() {
    return true;
  }
});
