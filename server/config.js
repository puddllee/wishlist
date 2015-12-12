ServiceConfiguration.configurations.remove({
  service: "google"
});

ServiceConfiguration.configurations.insert({
  service: "google",
  clientId: "738048454565-1en1rhvonv9832ok9qdv6gdd5bbdgdfm.apps.googleusercontent.com",
  secret: "COqDfAjsZRcwpGEb_83I3zi5",
  loginStyle: "popup"
});

ServiceConfiguration.configurations.remove({
  service: "facebook"
});

ServiceConfiguration.configurations.insert({
  service: "facebook",
  appId: "130018900700595",
  secret: "087d7b3aa5534cf672e78a524869ea9a"
});

MAIL_FROM = 'Wish List';
MAIL_ADDRESS = "listwishapp@gmail.com";
MAIL_URL = "smtp://listwishapp%40gmail.com:Cedarwood3950B@smtp.gmail.com:465/";
