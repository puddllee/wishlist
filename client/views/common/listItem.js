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
    boughtUser = Meteor.users.findOne({
      _id: this.bought_id
    });
    if (boughtUser) {
      return boughtUser.profile.name
    }
  },

  boughtByMe: function() {
    return this.bought_id === Meteor.userId();
  }
});