Accounts.onResetPasswordLink(function(token, done) {
  Router.go('changepass.token', {
    token: token
  })
});

// remove annoying debug messages from streamy
Meteor._debug = (function(super_meteor_debug) {
  return function(error, info) {
    if (info && _.has(info, 'msg'))
    // super_meteor_debug("Streamy message is allowed!", info)
    ;
    else
      super_meteor_debug(error, info);
  }
})(Meteor._debug);
