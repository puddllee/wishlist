Template.user.helpers({
  userId: function() {
    var controller = User.controller();
    return controller.state.get('userId');
  },

  avatar: function() {
    var profile = Session.get('profile');
    if (profile) {
      return profile.avatar;
    }
  },

  email: function() {
    var profile = Session.get('profile');
    if (profile) {
      return profile.email;
    }
  },

  name: function() {
    var profile = Session.get('profile');
    if (profile) {
      return profile.name;
    }
  }
});

Template.user.events = ({
  'click .passtext': function(event) {
    event.preventDefault();
    Router.go('changepass')
  }
});

Template.user.rendered = function() {

  var data = this.data;
  this.autorun(function() {
    data = Template.currentData();
    Meteor.call('getUser', data, function(error, result) {
      if (error) {
        return;
      } else {
        if (!result) {
          //bad address
          Router.go('home');
          return;
        }
        var user = result._id
        Meteor.call('getWishlist', result._id, function(error, result) {
          if (error) {
            return;
          } else {;
            Session.set('isMine', Meteor.userId() === user);
            Session.set('wishlist', result);
          }
        });
        Session.set('user', result);
        Session.set('profile', result.profile);
      }
    });
  })
};
