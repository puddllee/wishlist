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
