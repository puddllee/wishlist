// send event to userIds to tell them to update friend list
var updateFriendSessions = function(userIds) {
  // send friends to all user ids

  userIds.forEach(function(userId) {
    var friendList = Friends.getFriends(userId);
    if (friendList) {
      Streamy.sessionsForUsers([userId]).emit('friendlist', {
        'friendlist': friendList
      });
    }
  });
  // Streamy.sessionsForUsers([userId1, userId2]).emit('friendupdate', {});
};

Friends = {
  // adds user id as friend to current user
  addFriend: function(userId) {
    if (!Meteor.userId()) {
      console.log('couldn\'t find user');
      return;
    }
    Meteor.call('insertFriends', Meteor.userId(), userId, function(error, result) {});
  },

  insertFriends: function(accepter, requester) {
    // dont allow adding yourself as friend
    if (accepter === requester) {
      return;
    }

    // check if accepter and requester are already friends
    var accepterUser = Meteor.users.findOne({
      _id: accepter
    });
    if (accepterUser.profile && accepterUser.profile.friends && accepterUser.profile.friends.indexOf(
        requester) !== -1) {
      return;
    }

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
    Meteor.call('addNoti', from_label + ' has accepted your friend request.', 'timed',
      requester);
    updateFriendSessions([accepter, requester]);
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
        _id: Meteor.userId(),
      }, {
        $pull: {
          'profile.friends': userId
        }
      });
      updateFriendSessions([userId, Meteor.userId()]);
    }
  },

  getFriends: function(userId) {
    userId = userId || Meteor.userId();
    friends = [];
    var user = Meteor.users.findOne({
      _id: userId
    });
    if (user) {
      user.profile.friends.forEach(function(friendId) {
        // do not add yourself if for whatever reason you are friends with yourself
        if (userId !== friendId) {
          var friend = Meteor.users.findOne({
            _id: friendId
          });
          friends.push(friend);
        }
      });
    } else {
      console.log('error getting friends');
    }
    friends.sort(function(a, b) {
      var aName = a.profile.name.toUpperCase();
      var bName = b.profile.name.toUpperCase();
      return (aName < bName) ? -1 : (aName > bName) ? 1 : 0;
    });

    // var items = Items.find({owner})
    friends.forEach(function(user) {
      var wishlist = Wishlists.findOne({
        owner: user._id
      });
      var items = Items.find({
        wishlist: wishlist._id
      });
      var unBoughtItems = Items.find({
        wishlist: wishlist._id,
        bought: false
      });

      var itemCount = items.count();
      var unBoughtCount = unBoughtItems.count();

      user.profile.itemCount = itemCount;
      user.profile.unBoughtCount = unBoughtCount;
    });

    return friends;
  },

  isFriend: function(friendId) {
    var flag = false; // I should probably figure out more JS so I don't need to do this
    if (Meteor.userId()) {
      var user = Meteor.user();
      var friend = null;
      user.profile.friends.forEach(function(id) {
        if (id === friendId) {
          flag = true;
        }
      });
      return flag;
    }
  },
}

Meteor.methods(Friends);
