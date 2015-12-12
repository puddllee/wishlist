Wishlists = new Mongo.Collection('wishlists');

var WishlistsSchema = new SimpleSchema({
	owner: {
		type: String,
		optional: false
	},

	lastUpdated: {
		type: Date,
		optional: false
	}
});
Wishlists.attachSchema(WishlistsSchema);