ServiceConfiguration.configurations.remove({
  service: "google"
});

ServiceConfiguration.configurations.insert({
  service: "google",
  clientId: GOOGLE_ID,
  secret: GOOGLE_SECRET,
  loginStyle: "popup"
});

ServiceConfiguration.configurations.remove({
  service: "facebook"
});

ServiceConfiguration.configurations.insert({
  service: "facebook",
  appId: FACEBOOK_ID,
  secret: FACEBOOK_SECRET
});
