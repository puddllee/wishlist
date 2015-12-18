Meteor.publish('items', function() {
  var wishlistIds = [];
  // var user = Meteor.users.findOne(this.userId);
  return Items.find({});
  // if (this.userId) {}
  // user.profile.friends.forEach(function(friend) {
  //   var friendWishlist = Wishlists.findOne({
  //     owner: friend._id
  //   });
  //   if (friendWishlist) {
  //     wishlistIds.push(friendWishlist._id);
  //   }
  // });
  // var userWishlist = Wishlists.findOne({
  //   owner: this.userId
  // });
  // wishlistIds.push(userWishlist._id);
  // console.log(wishlistIds);
  // var items = Items.find({
  //   wishlist: {
  //     $in: wishlistIds
  //   }
  // }).serverTransform({
  //   'bought': function(doc) {
  //     console.log('woah');
  //     return true
  //   }
  // });
  // return items;

  // if (user) {
  //   user.profile.friends.forEach(function(friend) {
  //     var friendWishlist = Wishlists.findOne({
  //       owner: friend._id
  //     });
  //     if (friendWishlist) {
  //       wishlistIds.push(friendWishlist._id);
  //     }
  //   });
  //   console.log(wishlistIds)
  //   return Items.find({
  //     _id: {
  //       $in: wishlistIds
  //     }
  //   }, {
  //     sort: {
  //       created_at: -1
  //     }
  //   });
  // }
});

// Meteor.publish('myItems', function() {
//   check(this.userId, String);
//   var wishlist = Wishlists.findOne({
//     owner: this.userId
//   });
//   console.log(wishlist);
//   console.log('myItems');
//   return Items.find({
//     wishlist: wishlist._id
//   }, {
//     sort: {
//       created_at: -1
//     },
//     fields: {
//       bought: 0,
//       bought_id: 0
//     }
//   });
// });

Meteor.publish('me', function() {
  if (this.userId) {
    return Meteor.users.find({
      _id: this.userId
    });
  }
});

Meteor.publish('wishlists', function() {
  return Wishlists.find({
    owner: this.userId
  });
});

Meteor.publish('notis', function() {
  return Notis.find({
    owner: this.userId
  });
});

Meteor.publish(null, function() {
  return Meteor.users.find({
    _id: this.userId
  }, {
    fields: {
      'services': 1,
    }
  });
});
