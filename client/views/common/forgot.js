Template.forgot.rendered = function() {
  Session.set('forgotError', '');
}

Template.forgot.events({
  'submit .login': function(event, template) {
    event.preventDefault();

    var email = event.target.email.value;

    if (validateEmail(email)) {

    } else {
      Session.set('forgotError', 'Invalid email address');
      return;
    }
  },
});
