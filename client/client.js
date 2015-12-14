Accounts.onResetPasswordLink(function(token, done) {
  console.log('routing to view: ' + token)
  Router.go('changepass.token', {
    token: token
  })
});