Template.user.helpers = ({
  userId: function() {
    var controller = User.controller();
    return controller.state.get('userId');
  }
})

Template.user.events = ({

})

Template.user.rendered = function() {

  console.log(this);
  Session.set('user', this.data)
}