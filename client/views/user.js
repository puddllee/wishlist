Template.user.helpers = ({
  userId: function() {
    var controller = User.controller();
    return controller.state.get('userId');
  }
});

Template.user.events = ({

});

Template.user.rendered = function() {
  console.log(this);
  Meteor.call('getUser', this.data, function(error, result) {
    if (error) {
      console.log(error);
    } else {
      var user = result._id
      Meteor.call('getWishlist', result._id, function(error, result) {
        if (error) {
          console.log(error);
        } else {
          Session.set('isMine', Meteor.userId() === user);
          Session.set('wishList', result);
        }
      });
      Session.set('user', result);
      console.log(result);
    }
  });
};