Items = new Mongo.Collection('items');

var ItemScheme = new SimpleSchema({
  name: {
    type: String,
    optional: false
  },

  createdAt: {
    type: Date,
    optional: false
  }
});
Items.attachSchema(ItemScheme);
