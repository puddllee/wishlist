Template.notifications.rendered = function() {}

var notis = [{
  label: 'Friend request from bob!',
  type: 'requfest',
}];

sendMail = function(subject, text) {
  Meteor.call('sendMail', 'jakerunzer@gmail.com', subject, text);
}

Template.notifications.helpers({
  notis: function() {
    return Notis.find({}, {
      sort: {
        created_at: -1
      }
    });
  }
});

createNoti = function(label, type, owner, from) {
  Meteor.call('addNoti', label, type, owner, from);
};

Template.notifications.events({

});
