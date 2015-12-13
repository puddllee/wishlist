searchFriendList = function(search) {
  var filterFunc = function(obj) {
      return obj.name.toLowerCase().indexOf(search.toLowerCase()) != -1;
    }
    // var filtered = addFriendList.filter(filterFunc);
    // Session.set('addFriendList', filtered);
}

var getFriends = function() {
  Meteor.call('getFriends', Meteor.user(), function(error, result) {
    if (error) {
      console.log(error);
      return;
    }
    Session.set('friendList', result);
  });
}

Template.friendList.rendered = function() {
  Session.set('typing', false);
  Session.set('addFriendList', []);
  Session.set('email', '');
  Session.set('emailvalid', false);

  Streamy.on('friendupdate', function() {
    getFriends();
  });

  getFriends();

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

    var search = event.target.value;
    if (validateInput(search)) {
      Session.set('typing', true);
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
