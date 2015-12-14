Template.changePassword.rendered = function() {}

Template.changePassword.events({
  'submit .login': function(event, template) {
    event.preventDefault();

    var newpass = event.target.newpass.value;
    var passagain = event.target.passagain.value;

    if (validateInput(newpass) && validateInput(passagain)) {
      if (newpass === passagain) {
        Session.set('passwordError', '');
      } else {
        Session.set('passwordError', 'Passwords do not match');
      }
    } else {
      Session.set('passwordError', 'Both passwords are required');
      return;
    }
  },
});