Template.pageHeader.events({
  'click .logout': function(event) {
    event.preventDefault();
    Meteor.logout();
    Router.go('/');
  },

  'click .profile': function(event) {
    event.preventDefault();
    Router.go('/me');
  },

  'click .header-text': function(event) {
    event.preventDefault();
    Router.go('/');
  }
});
