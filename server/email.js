// configure mail on startup
Meteor.startup(function() {
  process.env.MAIL_URL = MAIL_URL;

  Accounts.emailTemplates.from = MAIL_FROM + ' ';

  //-- Application name
  Accounts.emailTemplates.siteName = 'Wish List';

  //-- Subject line of the email.
  Accounts.emailTemplates.verifyEmail.subject = function(user) {
    return 'Confirm Your Email Address for Wish List';
  };

  //-- Email text
  Accounts.emailTemplates.verifyEmail.text = function(user, url) {
    return 'Thank you for registering.  Please click on the following link to verify your email address: \r\n' + url;
  };

  // 3.  Send email when account is created
  Accounts.config({
    sendVerificationEmail: false // TODO: FIX
  });
});

// methods to send emails!
Mail = {
  sendMail: function(to, subject, text) {
    check([to, subject, text], [String]);

    // wait for other method calls to finish
    // before sending email
    if (this && this.unblock) {
      this.unblock();
    }

    Email.send({
      to: to,
      from: MAIL_FROM,
      subject: subject,
      text: text
    });
  }
}

Meteor.methods({
  sendMail: Mail.sendMail,

  addFriendByEmail: function(email) {
    var user = Meteor.user();

    // cannot send yourself an email
    if (user.profile.email === email) {
      Noti.addNoti('already friends with yourself', 'timed');
      return;
    }
    console.log('add friend by email');
    if (user && validateEmail(email)) {
      var friend = userForEmail(email);
      if (friend) {
        console.log('someone with that email already exists');

        // check if the friend is already a friend
        Meteor.call('isFriend', friend._id, function(error, response) {
          if (error) {
            console.log(error);
          } else {
            if (!response) {
              Noti.addRequestNoti(friend._id, user._id);
            } else {
              // Notify the user that they are friends already
              Noti.addNoti('Already friends with ' + friend.profile.name, 'timed');
            }
          }
        });
      } else {
        var hash = Hash.createHash(Meteor.userId());
        var url = Meteor.absoluteUrl() + '?friendrequest=' + hash;
        var subject = 'Wish List friend request from ' + user.profile.name;
        var text = 'You received a friend request from ' + user.profile.name + ' for Wish List.';
        text += '\r\nClick the following link to create and account and accept.';
        text += '\r\n' + url;
        Mail.sendMail(email, subject, text);

        Noti.addRequestNoti(null, Meteor.userId());
      }
    } else {
      // email invalid
    }
  }
});
