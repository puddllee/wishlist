Meteor.methods({
  getUserFriends: function(accessToken) {
    var fb = new Facebook(accessToken);
    var data = fb.getUserFriends();
    console.log('friends: ' + JSON.stringify(data))
    return data;
  }
})
Friends = {
  // adds user id as friend to current user
  addFriend: function(userId) {
    if (!Meteor.userId()) {
      console.log('couldn\'t find user');
      return;
    }
    console.log('adding ' + userId + ' as friend to ' + Meteor.user().profile.name);
    Meteor.call('insertFriends', Meteor.userId(), userId, function(error, result) {});

  },

  insertFriends: function(accepter, requester) {
    Meteor.users.update({
      _id: accepter
    }, {
      $push: {
        'profile.friends': requester
      }
    });
    Meteor.users.update({
      _id: requester
    }, {
      $push: {
        'profile.friends': accepter
      }
    });
    // Send a notification back to the sender notifying them their request was accepted
    var from_label = Meteor.users.findOne({
      _id: accepter
    }).profile.name;
    console.log('from: ' + from_label)
    Meteor.call('addNoti', from_label + ' has accepted your friend request.', 'ok', requester);
  },

  removeFriend: function(userId) {
    if (!Meteor.userId()) {
      console.log('couldn\'t find user');
      return;
    } else {
      Meteor.users.update({
        _id: userId
      }, {
        $pull: {
          'profile.friends': Meteor.userId()
        }
      });
      Meteor.users.update({
        _id: Meteor.userId,
      }, {
        $pull: {
          'profile.friends': userId
        }
      });
    }
  },

  getFriends: function() {
    friends = [];
    if (Meteor.userId()) {
      console.log('getting friends for ' + Meteor.user().profile.name);
      Meteor.user().profile.friends.forEach(function(friendId) {
        var friend = Meteor.users.findOne({
          _id: friendId
        });
        friends.push(friend);
        console.log('adding ' + friend.profile.name + ' to friends.')
      });
    } else {
      console.log('error getting friends');
    }
    return friends;
  },

  isFriend: function(friendId) {
    var flag = false; // I should probably figure out more JS so I don't need to do this
    if (Meteor.userId()) {
      var user = Meteor.user();
      user.profile.friends.forEach(function(id) {
        console.log('comparing ' + friendId + ' with ' + id);
        if (id === friendId) {
          flag = true;
        }
      });
      return flag;
    }
  }
}

Meteor.methods(Friends);