Template.listItem.rendered = function() {
  Meteor.call('getBoughtUserName', this.data._id, function(error, result) {
    if (error) {
      console.log(error);
    } else {
      boughtUser = result;
      if (boughtUser) {
        Session.set('bought_user', boughtUser);
      }
    }
  });
}

Template.listItem.events({
  'click .delete': function() {
    console.log('deleting');
    Meteor.call('deleteItem', this._id, this.wishlist,
      function(error, response) {
        if (error) {
          console.log(error);
        } else {
          // console.log('deleted: ' + response)
        }
      });
  },

  'click .buy': function() {
    if (this.bought && this.bought_id === Meteor.userId()) {
      Meteor.call('unbuyItem', this._id, function(error, result) {
        if (error) {
          console.log(error);
        } else {
          console.log(result);
        }
      });
    } else {
      if (this.bought === undefined || this.bought === null) {
        return;
      }
      Meteor.call('buyItem', this._id, function(error, response) {
        if (error) {
          console.log(error);
        } else {
          console.log('updated: ' + response);
        }
      });
    }
  }
});


Template.listItem.helpers({
  imageUrl: function() {
    var image = this.image;
    if (!image || image === '') {
      image = '/images/gift.svg';
    }
    return image;
  },

  boughtByMe: function() {
    return this.bought_id === Meteor.userId();
  }
});