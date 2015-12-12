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
    this.unblock();

    Email.send({
      to: to,
      from: MAIL_NAME,
      subject: subject,
      text: text
    });
  }
}

Meteor.methods({
  sendMail: Mail.sendMail,

  sendRequestEmail: function(email) {
    var user = Meteor.user();
    if (validateEmail(email)) {
      // var subject = 'Wish List friend request from ' + Me
    } else {
      // email invalid
    }
  }
});
