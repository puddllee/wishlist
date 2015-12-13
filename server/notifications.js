Noti = {
  addNoti: function(label, type, owner) {
    owner = owner || Meteor.userId();
    if (Meteor.user()) {
      Notis.insert({
        label: label,
        type: type,
        owner: owner || Meteor.userId()
      });
    }
  },

  deleteNoti: function(notiId) {
    Notis.remove(notiId);
  },

  addRequestNoti: function(friend_id) {
    if (!Meteor.userId()) {
      return;
    }
    user = Meteor.users.findOne({
      _id: friend_id
    })
    console.log('sending request notification from ' + Meteor.user().profile.name + ' to ' + user.profile.name)
    var requestLabel = Meteor.user().profile.name + ' wants to be your friend';
    this.addNoti(requestLabel, 'request', user._id);

    var sentLabel = 'Friend request sent.';
    this.addNoti(sentLabel, 'ok');
  }
}

Meteor.methods(Noti);