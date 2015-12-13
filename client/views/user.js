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
      Session.set('user', result)
      Session.set('wishList', Wishlists.findOne({
        owner: result._id
      }))
    }
  });
};