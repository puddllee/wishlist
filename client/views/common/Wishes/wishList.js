Template.wishList.rendered = function() {

}

Template.wishList.helpers({
  yourItems: function() {
    var wishlist = Session.get('wishlist');
    var items = [];
    if (wishlist) {
      if (wishlist.owner === Meteor.userId()) {
        items = Items.find({
          wishlist: wishlist._id
        }, {
          sort: {
            created_at: -1
          },
          fields: {
            bought: 0,
            bought_id: 0
          }
        }).fetch();
      } else {
        items = Items.find({
          wishlist: wishlist._id
        }, {
          sort: {
            created_at: -1
          }
        }).fetch();
      }
    }
    return items;
  },
});
