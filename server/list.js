Wishlist = {
  addItem: function(wishlist, name, seller, price, detail, url, image, callback) {
    Items.insert({
      name: name,
      seller: seller,
      price: price,
      detail: detail,
      url: url,
      image: image,
      bought: false,
      wishlist: wishlist,
      created_at: new Date()
    }, callback);
  },

  deleteItem: function(itemId) {
    Items.remove(itemId);
  },

  getItemsForList: function(userId) {

  },

  getWishlist: function(userId) {
    wishlist = Wishlists.findOne({
      owner: userId
    });
    return wishlist;
  },

  buyItem: function(itemId) {
    //
  }
}