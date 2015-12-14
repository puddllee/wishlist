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
    } else if (validateInput(newpass) && validateInput(passagain) && Meteor.userId()) {
      Meteor.call('resetPasswordNoLogout', Meteor.userId(), newpass, function(err) {
        if (err) {
          console.log(err);
          Session.set('passwordError', 'Could not set password.');
        } else {
          Router.go('list');
        }
      });
    } else {
      Session.set('passwordError', 'Both passwords are required');
      return;
    }
  },
});