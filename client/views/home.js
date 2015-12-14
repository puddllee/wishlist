Template.home.helpers({
  myAppVariable: function () {
    return Session.get('myAppVariable');
  }
});

Template.home.rendered = function () {
  Session.set('loginError', '');
  var query = Router.current().params.query;
  if (query && query.friendrequest) {
    Session.set('friendrequest', query.friendrequest);
  }
}

var afterLogin = function () {
  var friendrequest = Session.get('friendrequest');
  if (friendrequest) {
    Meteor.call('addFriendForHash', friendrequest);
  }
  Router.go('list');
}

var addFriendCookie = function () {
  var friendrequest = Session.get('friendrequest');
  if (friendrequest && friendrequest !== '') {
    var expires = 3 * 60; // 3 minutes
    Cookie.set('friendrequest', friendrequest, {
      expires: expires
    });
  }
}

Template.home.events({
  'click .heading': function (event) {
    event.preventDefault();
    Router.go('/');
  },

  'click .forgot': function (event) {
    event.preventDefault();
    Router.go('/forgot');
  },

  'submit .login': function (event, template) {
    event.preventDefault();

    var email = event.target.email.value;
    Session.set('email', email);
    var password = event.target.password.value;

    if (validateEmail(email) && validateInput(password)) {
      Session.set('loginError', '');
    } else {
      if (!validateEmail(email)) {
        Session.set('loginError', 'Invalid email');
      } else {
        Session.set('loginError', 'All inputs are required');
      }
      return;
    }

    Meteor.call('emailExists', email, function (error, result) {
      if (error) {
        console.log(error);
        return;
      } else {
        if (result) {
          Meteor.call('getUserType', email, function (error, result) {
            user_type = result || "";
            switch (user_type) {
            case 'facebook':
              Meteor.loginWithFacebook({
                requestPermissions: ['email', 'user_friends'],
                loginStyle: 'redirect',
                redirectUrl: Meteor.absoluteUrl() + "list"
              }, function (error) {
                if (error) {
                  console.log(error);
                } else {
                  afterLogin();
                }
              });
              break;
            case 'google':
              Meteor.loginWithGoogle({
                requestPermissions: ['email', 'profile',
                  'https://www.googleapis.com/auth/contacts.readonly'
                ],
                requestOfflineToken: true,
                loginStyle: "redirect",
                redirectUrl: Meteor.absoluteUrl() + "list",
                responseType: 'token'
              }, function (error) {
                if (error) {
                  console.log(error);
                } else {
                  afterLogin();
                }
              });
              break;
            default:
              Meteor.loginWithPassword({
                'email': email
              }, password, function (error) {
                if (error) {
                  if (error.error === 403) {
                    Session.set('loginError', 'Incorrect password');
                    return;
                  }
                } else {
                  afterLogin();
                }
              });
            }
          });

        } else {
          Accounts.createUser({
            email: email,
            password: password
          }, function (error) {
            if (!error) {
              Meteor.loginWithPassword({
                'email': email
              }, password, function (error) {
                if (error) {
                  console.log(error);
                } else {
                  afterLogin();
                }
              });
            } else {
              console.log(error);
            }
          })
        }
      }
    });
  },

  'click .fb': function (event) {
    event.preventDefault();
    if (!Meteor.user()) {
      addFriendCookie();
      Meteor.loginWithFacebook({
        requestPermissions: ['email', 'user_friends'],
        loginStyle: 'redirect',
        redirectUrl: Meteor.absoluteUrl() + "list"
      }, function (error) {
        if (error) {
          console.log(error);
        } else {
          afterLogin();
        }
      });
    } else {
      afterLogin();
    }
  },

  'click .gplus': function (event) {
    event.preventDefault();
    if (!Meteor.user()) {
      addFriendCookie();
      Meteor.loginWithGoogle({
        requestPermissions: ['email', 'profile'],
        loginStyle: "redirect",
        redirectUrl: Meteor.absoluteUrl() + "list"
      }, function (error) {
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
