Template.listItem.rendered = function() {

}

Template.listItem.events({
  'click .delete': function() {
    console.log('delete ' + this.title);
  }
});
