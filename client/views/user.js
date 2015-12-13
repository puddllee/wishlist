Template.user.helpers = ({

})

Template.user.events = ({

})

Template.user.rendered = function() {
  Router.go('user', {
    _id: Meteor.userId()
  });
}