Template.notifications.rendered = function() {}

var notis = [{
  label: 'Friend request from bob!',
  type: 'requfest',
}];

var FADE_TIME = 300;

sendMail = function(subject, text) {
  Meteor.call('sendMail', 'jakerunzer@gmail.com', subject, text);
}

Template.notifications.helpers({
  notis: function() {
    return Notis.find({});
  }
});

createNoti = function(label, type, owner, from) {
  Meteor.call('addNoti', label, type, owner, from);
};

getNotis = function() {
  return Notis.find({}).fetch();
}

// takes in event and fades the target out
var hideNoti = function(event) {
  var element = $(event.target.parentNode.parentNode);
  var classes = element.attr('class');
  classes = 'noti-out ' + classes;
  element.attr('class', classes);
};

// removes noti from db and hides fades it out
// takes noti object and click event
var removeNoti = function(noti, event) {
  setTimeout(function() {
    Meteor.call('deleteNoti', noti._id);
  }, FADE_TIME);
  hideNoti(event);
}



Template.notifications.events({
  'click .okay': function(event) {
    event.preventDefault();

    removeNoti(this, event);
  },

  'click .accept': function(event) {
    event.preventDefault();
    console.log(this);
    console.log(event)
    Meteor.users.update({
      _id: Meteor.userId()
    }, {
      $push: {
        'profile.friends': this.owner
      }
    })
    Meteor.users.update({
      _id: this.from
    }, {
      $push: {
        'profile.friends': Meteor.userId()
      }
    })
    createNoti(Meteor.user().profile.name + ' has accepted your friend request.', 'ok', this.owner);
    removeNoti(this, event);
  },

  'click .decline': function(event) {
    event.preventDefault();

    removeNoti(this, event);
  }
});
