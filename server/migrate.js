// Run code once and remove to migrate db or whatnot when needed

var users = Meteor.users.find({});

// removes non http from users at startup
users.forEach(function(u) {
  if (u.profile.avatar.indexOf('http://www.gravatar.com/') !== -1) {
    var av = u.profile.avatar.replace('http://www.gravatar.com/', 'https://secure.gravatar.com/');
    console.log(av);
    u.profile.avatar = av;
    Meteor.users.update({
      _id: u._id
    }, {
      $set: {
        "profile.avatar": av
      }
    });
  }
});
