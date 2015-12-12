Friends = {
  // adds user id as friend to current user
  addFriend: function(userId) {
    if (!Meteor.userId()) {
      return;
    }
    console.log('adding ' + userId + ' as friend to ' + Meteor.user().profile.name);
    Noti.addNoti(Meteor.user().profile.name + ' accepted your friend request', 'okay', userId);
  }
}

Meteor.methods(Friends);
