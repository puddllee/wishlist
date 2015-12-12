Hashs = new Mongo.Collection('hashs');

var HashSchema = new SimpleSchema({
  user_id: {
    type: String,
    optional: false
  },

  hash_string: {
    type: String,
    optional: false
  }
});
Hashs.attachSchema(HashSchema);
