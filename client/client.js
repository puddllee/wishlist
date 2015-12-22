Accounts.onResetPasswordLink(function(token, done) {
  Router.go('changepass.token', {
    token: token
  })
});
