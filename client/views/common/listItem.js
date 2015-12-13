Template.listItem.rendered = function() {

}

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
    Meteor.call('buyItem', Meteor.userId(), function(error, response) {
      if (error) {
        console.log(error);
      } else {
        // do something
      }
    });
  }
});


Template.listItem.helpers({
  imageUrl: function() {
    var image = this.image;
    if (!image || image === '') {
      image = '/images/star.svg';
    }
    return image;
  }
});