Template.changePassword.rendered = function() {
  console.log(this)
  var token = this.data;
  Session.set('token', token);
}

Template.changePassword.events({
  'submit .login': function(event, template) {
    event.preventDefault();

    var token = Session.get('resetPasswordToken');
    var newpass = event.target.newpass.value;
    var passagain = event.target.passagain.value;

    console.log('token: ' + token);

    if (validateInput(newpass) && validateInput(passagain) && token) {
      if (newpass === passagain) {
        Session.set('passwordError', '');
        Accounts.resetPassword(token, newpass, function(err) {
          if (err) {
            console.log(err);
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