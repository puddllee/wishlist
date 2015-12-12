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
  },

  'click .fb': function(event) {
    event.preventDefault();
    console.log('fb');
  },

  'click .gplus': function(event) {
    event.preventDefault();
    console.log('plus');
  }
});
