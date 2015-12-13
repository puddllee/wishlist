Notis = new Mongo.Collection('notis');

var NotiSchema = new SimpleSchema({
  owner: {
    type: String,
    optional: false
  },

  label: {
    type: String,
    optional: false
  },

  type: {
    type: String,
    optional: false
  },

  from: {
    type: String,
    optional: true
  },
});
Notis.attachSchema(NotiSchema);