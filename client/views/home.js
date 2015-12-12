Template.home.helpers({
  myAppVariable: function() {
    return Session.get('myAppVariable');
  }
});

Template.home.rendered = function() {
  Session.set('loginError', '');
}

var afterLogin = function() {
  // Router.go('list');
  var query = Router.current().params;
  if (query && query.friendrequest) {
    Meteor.call('addFriendForHash', query.friendrequest);
  }
}

Template.home.events({
  'submit .login': function(event, template) {
    event.preventDefault();

    var email = event.target.email.value;
    var password = event.target.password.value;

    if (validateInput(email) && validateInput(password)) {
      Session.set('loginError', '');
    } else {
      Session.set('loginError', 'All inputs are required');
    }

    var emailExists = Meteor.call('emailExists', email, function(error, result) {
      if (error) {
        console.log(error);
        return;
      } else {
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
                    afterLogin();
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
                    afterLogin();
                  }
                });
              default:
                Meteor.loginWithPassword({
                  'email': email
                }, password, function(error) {
                  if (error) {
                    console.log(error);
                  } else {
                    afterLogin();
                  }
                })
            }
          });

        } else {
          Accounts.createUser({
            email: email,
            password: password
          }, function(error) {
            if (!error) {
              Meteor.loginWithPassword({
                'email': email
              }, password, function(error) {
                if (error) {
                  console.log(error);
                } else {
                  afterLogin();
                }
              });
            } else {
              Meteor.loginWithPassword({
                'email': email
              }, password, function(error) {
                if (error) {
                  console.log(error);
                } else {
                  afterLogin();
                }
              });
            }
          })
        }
      }
    });
  },

  'click .fb': function(event) {
    event.preventDefault();
    if (!Meteor.user()) {
      Meteor.loginWithFacebook({
        requestPermissions: ['email', 'user_friends'],
        loginStyle: 'redirect',
        redirectUrl: Meteor.absoluteUrl() + "list"
      }, function(error) {
        if (error) {
          console.log(error);
        } else {
          afterLogin();
        }
      });
    } else {
      Router.go('list');
    }
  },

  'click .gplus': function(event) {
    event.preventDefault();
    if (!Meteor.user()) {
      Meteor.loginWithGoogle({
        requestPermissions: ['email', 'profile'],
        loginStyle: "redirect",
        redirectUrl: Meteor.absoluteUrl() + "list"
      }, function(error) {
        if (error) {
          console.log(error);
        } else {
          afterLogin();
        }
      });
    } else {
      afterLogin();
    }
  }
});
