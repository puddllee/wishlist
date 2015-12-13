Template.wishList.helpers({
  yourItems: function() {
    var wishlist = Session.get('wishList');
    var items = [];
    if (wishlist) {
      items = Items.find({
        wishlist: wishlist._id
      }, {
        sort: {
          created_at: -1
        }
      }).fetch();
    }
    return items;
  }
});