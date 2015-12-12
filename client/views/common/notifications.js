Template.notifications.rendered = function() {

}

var notis = [{
  label: 'Friend request from bob!',
  type: 'requfest',
}];

var FADE_TIME = 500;

Template.notifications.helpers({
  notis: function() {
    return notis;
  }
});

// takes in event and fades the target out
var hideNoti = function(event) {
  Meteor.defer(function() {
    var element = $(event.target.parentNode.parentNode);
    var classes = element.attr('class');
    classes = 'noti-out ' + classes;
    element.attr('class', classes);
  });
}

Template.notifications.events({
  'click .okay': function(event) {
    event.preventDefault();
    console.log('okay: ' + this.type);

    hideNoti(event);
  },

  'click .accept': function(event) {
    event.preventDefault();
    console.log('accept: ' + this.type);

    hideNoti(event);
  },

  'click .decline': function(event) {
    event.preventDefault();
    console.log('decline: ' + this.type);

    hideNoti(event);
  }
});
