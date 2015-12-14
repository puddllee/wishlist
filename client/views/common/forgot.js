Template.forgot.rendered = function() {
  Session.set('forgotError', '');
  Session.set('forgotSuccess', '');
}

Template.forgot.events({
  'submit .login': function(event, template) {
    event.preventDefault();

    var email = event.target.email.value;
    console.log('email: ' + email);

    if (validateEmail(email)) {
      Accounts.forgotPassword({
        email: email
      }, function(err) {
        if (err) {
          if (err.message === 'User not found [403]') {
            Session.set('forgotError', 'We couldn\'t find anyone with that email');
          } else {
            console.log('error resetting password');
          }
        } else {
          Session.set('forgotSuccess', 'We\'ve emailed you a link to reset your password.');
        }
      });
    } else {
      Session.set('forgotSuccess', '');
      Session.set('forgotError', 'Invalid email address');
      return;
    }
  },
});