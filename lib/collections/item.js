Items = new Mongo.Collection('items');

var ItemSchema = new SimpleSchema({
  wishlist: {
    type: String,
    optional: false
  },

  name: {
    type: String,
    optional: false
  },

  seller: {
    type: String,
    optional: false
  },

  price: {
    type: String,
    optional: true
  },

  detail: {
    type: String,
    optional: true
  },

  url: {
    type: String,
    optional: true
  },

  image: {
    type: String,
    optional: true
  },

  bought: {
    type: Boolean,
    optional: false
  },

  bought_id: {
    type: String,
    optional: true
  },

  created_at: {
    type: Date,
    optional: false
  }
});
Items.attachSchema(ItemSchema);

Items.after.find(function(userId, selector, options, cursor) {});