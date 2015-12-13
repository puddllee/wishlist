Noti = {
  addNoti: function(label, type, owner, from) {
    owner = owner || Meteor.userId();
    if (Meteor.user()) {
      Notis.insert({
        label: label,
        type: type,
        owner: owner || Meteor.userId(),
        from: from || null
      });
    }
  },

  deleteNoti: function(notiId) {
    Notis.remove(notiId);
  },

  addRequestNoti: function(friend_id, fromId) {
    if (!Meteor.userId()) {
      return;
    }
    user = Meteor.users.findOne({
      _id: friend_id
    })
    console.log('sending request notification from ' + Meteor.user().profile.name + '-' + fromId + ' to ' + user.profile.name)
    var requestLabel = Meteor.user().profile.name + ' wants to be your friend';
    this.addNoti(requestLabel, 'request', user._id, fromId);

    var sentLabel = 'Friend request sent.';
    this.addNoti(sentLabel, 'ok');
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
  }

}

Meteor.methods(Noti);