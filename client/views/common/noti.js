var FADE_TIME = 300;
var PROG_TIME = 3100;

// takes in event and fades the target out
var hideNoti = function(noti) {
  var element = $('#noti-' + noti._id);
  var classes = element.attr('class');
  classes = 'noti-out ' + classes;
  element.attr('class', classes);
};

// removes noti from db and hides fades it out
// takes noti object and click event
var removeNoti = function(noti) {
  setTimeout(function() {
    Meteor.call('deleteNoti', noti._id);
  }, FADE_TIME);
  hideNoti(noti);
}

var startProgress = function(noti) {
  setTimeout(function() {
    var element = $('#progress-' + noti._id);
    element.addClass('progress-start');
    setTimeout(function() {
      removeNoti(noti);
    }, PROG_TIME);
  }, 100);
}

Template.noti.rendered = function() {
  if (this.data.type === 'timed') {
    startProgress(this.data);
  }
}

Template.noti.events({
  'click .okay': function(event) {
    event.preventDefault();

    removeNoti(this);
  },

  'click .accept': function(event) {
    event.preventDefault();
    Meteor.call('insertFriends', this.owner, this.from, function(error) {
      if (error) {
        return;
      }
    });

    removeNoti(this);
  },

  'click .decline': function(event) {
    event.preventDefault();

    removeNoti(this);
  }
});
