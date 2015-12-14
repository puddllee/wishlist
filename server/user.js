User = {
  'getUser': function(userId) {
    return Meteor.users.findOne({
      _id: userId
    });
  },

  'resetPasswordNoLogout': function(userId, pass) {
    Accounts.setPassword(userId, pass, {
      logout: false
    })
  }
}

Meteor.methods(User)