Noti = {
  addNoti: function(label, type, owner, from) {
    owner = owner || Meteor.userId();
    if (Meteor.user()) {
      Notis.insert({
        label: label,
        type: type,
        owner: owner || Meteor.userId(),
        from: from || null,
        created_at: new Date()
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

    var user = Meteor.users.findOne({
      _id: friend_id
    });

    if (user) {
      var noti = Notis.findOne({
        owner: user._id,
        from: fromId
      });
    }

    var sentLabel = 'Friend request sent';
    this.addNoti(sentLabel, 'timed');

    // do not make new request if there is alreay one for same users
    if (!noti) {
      if (user) {
        var requestLabel = Meteor.user().profile.name + ' wants to be your friend';
        this.addNoti(requestLabel, 'request', user._id, fromId);
      }
    } else {}
  }
}

Meteor.methods(Noti);