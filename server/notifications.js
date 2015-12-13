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
  }
}

Meteor.methods(Noti);