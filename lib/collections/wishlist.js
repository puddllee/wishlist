Wishlists = new Mongo.Collection('wishlists');

var WishlistsSchema = new SimpleSchema({
  owner: {
    type: String,
    optional: false
  },

  last_updated: {
    type: Date,
    optional: false
  }
});
Wishlists.attachSchema(WishlistsSchema);
