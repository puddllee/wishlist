Template.notifications.rendered = function() {}

var notis = [{
  label: 'Friend request from bob!',
  type: 'requfest',
}];

var FADE_TIME = 500;

Template.notifications.helpers({
  notis: function() {
    return Notis.find({});
  }
});

createNoti = function(label, type) {
  Meteor.call('addNoti', label, type);
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

    removeNoti(this, event);
  },

  'click .decline': function(event) {
    event.preventDefault();

    removeNoti(this, event);
  }
});
