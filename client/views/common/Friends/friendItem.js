Template.friendItem.rendered = function() {

}

Template.friendItem.events({
  'click .unfriend': function(event) {
    event.preventDefault();
    Meteor.call('removeFriend', this._id, function(error, result) {
      if (error) {
        console.log(error);
        return;
      } else {
        // success
        Session.set('friendsList', Meteor.user().profile.friends);
      }
    });
  }
});

Template.friendItem.helpers({
  allBought: function() {
    var itemCount = this.profile.itemCount;
    var unBoughtCount = this.profile.unBoughtCount;
    return (itemCount !== 0 && unBoughtCount === 0);
  },

  anyItems: function() {
    var itemCount = this.profile.itemCount;
    return itemCount !== 0;
  },

  itemCount: function() {
    var itemCount = this.profile.itemCount;
    var unBoughtCount = this.profile.unBoughtCount;
    if (itemCount === unBoughtCount) {
      return '';
    } else {
      return itemCount + ' Item' + (itemCount !== 1 ? 's' : '');
    }
  },

  unBoughtCount: function() {
    var itemCount = this.profile.itemCount;
    var unBoughtCount = this.profile.unBoughtCount;
    if (unBoughtCount === 0) {
      return '';
    } else {
      if (itemCount !== unBoughtCount) {
        return unBoughtCount + ' Unbought';
      } else {
        return unBoughtCount + ' Unbought Item' + (unBoughtCount !== 1 ? 's' : '');
      }
    }
  }
});
