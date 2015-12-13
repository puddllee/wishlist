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

});

Template.user.rendered = function() {
  Meteor.call('getUser', this.data, function(error, result) {
    if (error) {
      console.log(error);
    } else {
      var user = result._id
      Meteor.call('getWishlist', result._id, function(error, result) {
        if (error) {
          console.log(error);
        } else {;
          Session.set('isMine', Meteor.userId() === user);
          Session.set('wishlist', result);
        }
      });
      Session.set('user', result);
      Session.set('profile', result.profile);
      console.log(result.profile);
    }
  });
};
