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

Items.before.update(function(userId, doc, fieldNames, modifier, options) {
  // if (fieldNames && fieldNames.length > 0 && fieldNames[0] === 'detail') {
  //   if (modifier.$unset) {
  //     modifier.$set = {
  //       'detail': ''
  //     };
  //     delete modifier.$unset;
  //     console.log(modifier);
  //   }
  // }
});

Items.attachSchema(ItemSchema);
