// returns true if input is valid
validateInput = function(input) {
  if (input !== undefined && input !== null && input !== '') {
    return true;
  }
  return false;
}

var EMAIL_REGEX = /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i;
validateEmail = function(input) {
  if (input && input !== '' && input.match(EMAIL_REGEX)) {
    return true;
  }
  return false;
}

nameFromEmail = function(email) {
  var index = email.indexOf('@');
  name = email.substring(0, index);
  return name;
}


userForEmail = function(email) {
  var user = Meteor.users.findOne({
    $or: [{
      'emails.address': email
    }, {
      'services.facebook.email': email
    }, {
      'services.google.email': email
    }]
  });
  return user;
}