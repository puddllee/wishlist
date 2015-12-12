Template.user.rendered = function() {

}

Template.user.helpers({
  name: function() {
    var name = '';
    var user = Meteor.user();
    if (user) {
      if (user.profile && user.profile.name) {
        name = user.profile.name;
      } else if (user.emails.length > 0 && user.emails[0].address) {
        var email = user.emails[0].address;
        var index = email.indexOf('@');
        name = email.substring(0, index);
      }
    }

    return name;
  },

  avatar: function() {
    var avatar = '';
    var user = Meteor.user();
    if (user) {
      if (user.services && user.services.google) {
        avatar = user.services.google.picture;
      } else if (user.emails.length > 0 && user.emails[0].address) {
        var email = user.emails[0].address;
        var md5Hash = Gravatar.hash(email);
        avatar = Gravatar.imageUrl(email);
      }
    }
    return avatar;
  }
});
