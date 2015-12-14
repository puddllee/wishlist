Template.changePassword.rendered = function() {
  var token = this.data;
  Session.set('token', token);
}

Template.changePassword.events({
  'submit .login': function(event, template) {
    event.preventDefault();

    var token = Session.get('resetPasswordToken');
    var newpass = event.target.newpass.value;
    var passagain = event.target.passagain.value;

    if (validateInput(newpass) && validateInput(passagain) && token) {
      if (newpass === passagain) {
        Session.set('passwordError', '');
        Accounts.resetPassword(token, newpass, function(err) {
          if (err) {
            return;
          } else {
            Router.go('home');
          }
        })
      } else {
        Session.set('passwordError', 'Passwords do not match');
      }
    } else {
      Session.set('passwordError', 'Both passwords are required');
      return;
    }
  },
});
