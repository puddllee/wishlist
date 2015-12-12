var addFriendList = [{
  name: 'Hello',
  avatar: 'https://avatars1.githubusercontent.com/u/3044853?v=3&s=460'
}, {
  name: 'Hello',
  avatar: 'https://avatars1.githubusercontent.com/u/3044853?v=3&s=460'
}, {
  name: 'Hello',
  avatar: 'https://avatars1.githubusercontent.com/u/3044853?v=3&s=460'
}, {
  name: 'Hello',
  avatar: 'https://avatars1.githubusercontent.com/u/3044853?v=3&s=460'
}, {
  name: 'Test',
  avatar: 'https://avatars1.githubusercontent.com/u/3044853?v=3&s=460'
}, {
  name: 'Single',
  avatar: 'https://avatars1.githubusercontent.com/u/3044853?v=3&s=460'
}, {
  name: 'Test',
  avatar: 'https://avatars1.githubusercontent.com/u/3044853?v=3&s=460'
}, {
  name: 'Test',
  avatar: 'https://avatars1.githubusercontent.com/u/3044853?v=3&s=460'
}];

searchFriendList = function(search) {
  var filterFunc = function(obj) {
    return obj.name.toLowerCase().indexOf(search.toLowerCase()) != -1;
  }
  var filtered = addFriendList.filter(filterFunc);
  Session.set('addFriendList', filtered);
}

Template.friendList.rendered = function() {
  Session.set('typing', false);
  Session.set('addFriendList', []);
}

Template.friendList.events({
  'submit .add-friend': function(event) {
    event.preventDefault();

    var search = event.target.search.value;
    console.log('send email to ' + search);
  },

  'input .friend-input': function(event) {
    event.preventDefault();

    var search = event.target.value;
    if (search && search !== '') {
      Session.set('typing', true);
      searchFriendList(search);
    } else {
      Session.set('typing', false);
    }
  },

  'click .addfriend': function(event) {
    event.preventDefault();

    console.log('add: ' + this.name);
  }
});

Template.friendList.helpers({
  addDisabled: function() {
    return Session.get('typing') ? false : true;
  }
});
