
Template.home.helpers({
  myAppVariable: function() {
    return Session.get('myAppVariable');
  }
});

Template.home.rendered = function() {
  Session.set('loginError', '');
}

Template.home.events({
  'click button': function(event, template) {
    Session.set('myAppVariable', Math.floor(Math.random() * 11));
  },

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
  }
});
