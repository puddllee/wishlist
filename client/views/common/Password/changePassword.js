Template.changePassword.rendered = function () {
  var token = this.data;
  Session.set('token', token);
  Session.set('passwordError', '');
}

Template.changePassword.events({
  'submit .login': function (event, template) {
    event.preventDefault();

    var token = Session.get('resetPasswordToken');
    var newpass = event.target.newpass.value.trim();
    var passagain = event.target.passagain.value.trim();

    if (validateInput(newpass) && validateInput(passagain)) {
      if (newpass !== passagain) {
        Session.set('passwordError', 'Passwords do not match');
        return;
      }
    } else {
      Session.set('passwordError', 'Both passwords are required');
      return;
    }
    Session.set('passwordError', '');

    if (token && token !== '') {
      Accounts.resetPassword(token, newpass, function (err) {
        if (err) {
          return;
        } else {
          Meteor.call('addNoti', 'Password successfully changed', 'timed');
          Router.go('/');
        }
      })
    } else if (Meteor.userId()) {
      Meteor.call('resetPasswordNoLogout', Meteor.userId(), newpass, function (err) {
        if (err) {
          console.log(err);
          Session.set('passwordError', 'Could not set password.');
        } else {
          Meteor.call('addNoti', 'Password successfully changed', 'timed');
          Router.go('list');
        }
      });
    }
  },
});
