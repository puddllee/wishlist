Noti = {
  addNoti: function(label, type, owner) {
    owner = owner || Meteor.userId();
    if (Meteor.user()) {
      Notis.insert({
        label: label,
        type: type,
        owner: Meteor.userId()
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
    var label = Meteor.user().profile.name + ' wants to be your friend';
    this.addNoti(label, 'request');
  }
}

Meteor.methods(Noti);
