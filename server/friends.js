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
      return;
    }
    console.log('adding ' + userId + ' as friend to ' + Meteor.user().profile.name);
    Noti.addNoti(Meteor.user().profile.name + ' accepted your friend request', 'okay', userId);
  },

  getFriends: function() {
    friends = [];
    if (Meteor.userId()) {
      console.log('getting friends for ' + Meteor.user());
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