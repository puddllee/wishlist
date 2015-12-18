Template.pageHeader.events({
  'click .logout': function(event) {
    event.preventDefault();
    Meteor.logout();
    Router.go('/');
  },

  'click .profile': function(event) {
    // event.preventDefault();
    // Router.go('/me');
  },

  'click .home': function(event) {
    // event.preventDefault();
    // Router.go('/');
  }
});

Template.pageHeader.helpers({
  showHome: function() {
    var path = Router.current().route.path(this);
    return path === '/me';
  }
});
