Meteor.methods({
  addNoti: function(label, type, callback) {
    console.log(Meteor.userId());
    if (Meteor.user()) {
      Notis.insert({
        label: label,
        type: type,
        owner: Meteor.userId()
      }, callback);
    }
  },

  deleteNoti: function(notiId) {
    Notis.remove(notiId);
  }
});
