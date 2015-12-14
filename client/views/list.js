var SAVE_WAIT_TIME = 1000; // ms
var last_save;

Template.list.rendered = function () {
  Session.set('yourList', []);
  // var wishlist = Wishlists.findOne({
  //   owner: Meteor.userId()
  // });
  // Session.set('wishlist', wishlist);
  // console.log(wishlist);

  Meteor.call('getWishlist', Meteor.userId(), function (error, wishlist) {
    if (wishlist) {
      Session.set('wishlist', wishlist);
      Session.set('isMine', Meteor.userId() === wishlist.owner);
    }
  });
}

Template.list.helpers({
  wishlist: function () {
    var user = Meteor.userId(); // should make this get recalled when user changes
    Meteor.call('getWishlist', Meteor.userId(), function (error, wishlist) {
      if (wishlist) {
        console.log('setting here');
        Session.set('wishlist', wishlist);
        Session.set('isMine', Meteor.userId() === wishlist.owner);
      }
    });
  }
});

Template.list.events({});
