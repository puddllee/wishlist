Template.home.helpers({
  myAppVariable: function() {
    return Session.get('myAppVariable');
  }
});

Template.home.rendered = function() {
  Session.set('loginError', '');
}

Template.home.events({
  'submit .login': function(event, template) {
    event.preventDefault();

    var name = event.target.name.value;
    var email = event.target.email.value;
    var password = event.target.password.value;

    console.log('name: ' + name);
    console.log('email: ' + email);
    console.log('pass: ' + password);

    if (validateInput(name) && validateInput(email) && validateInput(password)) {
      Session.set('loginError', '');
    } else {
      Session.set('loginError', 'All inputs are required');
    }

    var emailExists = Meteor.call('emailExists', email, function(error, result) {
      if (error) {
        console.log(error);
        return;
      } else {
        console.log('result: ' + result)
        if (result) {
          Meteor.call('getUserType', email, function(error, result) {
            user_type = result;
            console.log('user_type: ' + user_type);
            switch (user_type) {
              case 'facebook':
                Meteor.loginWithFacebook({
                  requestPermissions: ['email', 'user_friends'],
                  loginStyle: 'redirect',
                  redirectUrl: Meteor.absoluteUrl() + "list"
                }, function(error) {
                  if (error) {
                    console.log(error);
                  } else {
                    window.location.href = Meteor.absoluteUrl() + "list";
                  }
                });
                break;
              case 'google':
                Meteor.loginWithGoogle({
                  requestPermissions: ['email', 'profile'],
                  loginStyle: "redirect",
                  redirectUrl: Meteor.absoluteUrl() + "list"
                }, function(error) {
                  if (error) {
                    console.log(error);
                  } else {
                    window.location.href = Meteor.absoluteUrl() + "list";
                  }
                });
              default:
                Meteor.loginWithPassword({
                  'email': email
                }, password, function(error) {
                  if (error) {
                    console.log(error);
                  } else {
                    window.location.href = Meteor.absoluteUrl() + "list";
                  }
                })
            }
          });

        } else {
          console.log('email does not exist, creating new user')
          Accounts.createUser({
            email: email,
            password: password
          }, function(error) {
            console.log(error);
          })
        }
      }
    });
  },

  'click .fb': function(event) {
    event.preventDefault();
    console.log('fb');
    if (!Meteor.user()) {
      console.log('logging in')
      Meteor.loginWithFacebook({
        requestPermissions: ['email', 'user_friends'],
        loginStyle: 'redirect',
        redirectUrl: Meteor.absoluteUrl() + "list"
      }, function(error) {
        if (error) {
          console.log(error);
        } else {}
      })
    }
  },

  'click .gplus': function(event) {
    event.preventDefault();
    console.log('plus');
    if (!Meteor.user()) {
      console.log('logging in')
      Meteor.loginWithGoogle({
        requestPermissions: ['email', 'profile'],
        loginStyle: "redirect",
        redirectUrl: Meteor.absoluteUrl() + "list"
      }, function(error) {
        if (error) {
          console.log(error);
        } else {}
      });
    }
  }
});