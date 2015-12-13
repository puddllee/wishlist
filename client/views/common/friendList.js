getFriends = function() {
  friends = [];
  if (!Meteor.userId()) {
    Route.go('/')
  }
  Meteor.user().profile.friends.forEach(function(friendId) {
    friends.push(Meteor.users.findOne({
      _id: friendId
    }));
  });
  return friends;
}

searchFriendList = function(search) {
  var filterFunc = function(obj) {
      return obj.name.toLowerCase().indexOf(search.toLowerCase()) != -1;
    }
    // var filtered = addFriendList.filter(filterFunc);
    // Session.set('addFriendList', filtered);
}

Template.friendList.rendered = function() {
  Session.set('typing', false);
  Session.set('addFriendList', []);
  Session.set('email', '');
  Session.set('emailvalid', false);
  Meteor.call('getFriends', Meteor.user(), function(error, result) {
    if (error) {
      console.log(error);
    }
    console.log(result);
    Session.set('friendList', result);
  })

}

Template.friendList.events({
  'submit .add-friend': function(event) {
    event.preventDefault();

    var search = event.target.search.value;
    if (validateEmail(search)) {
      Meteor.call('addFriendByEmail', search);
      event.target.search.value = '';
    }
  },

  'input .friend-input': function(event) {
    event.preventDefault();

    // Meteor.call('getfbContacts', Meteor.user().services.facebook.id, function(error) {
    //   if (errror) {
    //     console.log(error);
    //   }
    // })

    var search = event.target.value;
    if (validateInput(search)) {
      Session.set('typing', true);
      // Meteor.call('getGContacts', Meteor.user());
      searchFriendList(search);
    } else {
      Session.set('typing', false);
    }
    if (validateEmail(search)) {
      Session.set('typing', false);
      Session.set('emailvalid', true);
      Session.set('email', search);
    } else {
      Session.set('emailvalid', false);
    }
  },

  'click .addfriend': function(event) {
    event.preventDefault();

    console.log('add: ' + this.name);
  }
});

Template.friendList.helpers({
  addDisabled: function() {
    return Session.get('emailvalid') ? false : true;
  }
});