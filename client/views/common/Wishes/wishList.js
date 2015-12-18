Template.wishList.rendered = function() {
  // Tracker.autorun(function() {
  //   Session.set('loadingItems', true);
  //   var wishlist = Session.get('wishlist');
  //   var items = Meteor.call('getItemsForList', wishlist, function(err, res) {
  //     Tracker.autorun(function() {
  //       console.log('fuck');
  //       Session.set('loadingItems', false);
  //       if (!err) {
  //         Session.set('yourItems', res);
  //       }
  //     });
  //   });
  // });
}

Template.wishList.helpers({
  yourItems: function() {
    // return Session.get('yourItems');
    var items = [];
    var wishlist = Session.get('wishlist');
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
