Template.listItem.rendered = function() {}

Template.listItem.events({
  'click .delete': function() {
    Meteor.call('deleteItem', this._id,
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
      image = '/images/star.svg';
    }
    return image;
  },

  bought_user: function() {
    Meteor.call('getBoughtUserName', this._id, function(error, result) {
      if (error) {
        console.log(error);
      } else {
        boughtUser = result;
        if (boughtUser) {
          label = boughtUser.profile.name;
          Session.set('bought_user', boughtUser);
        }
      }
    });
  },

  boughtByMe: function() {
    return this.bought_id === Meteor.userId();
  }
});