addPlusOne = function(a, b) {
  return a + b + 1;
}

// runs only when template is first created #once
Template.about.created = function() {
  Session.set('counter', 0);
}

// runs whenever template is rendered/re-rendered
Template.about.rendered = function() {
}

Template.about.helpers({
  msg: function() {
    return 'test message';
  },

  counter: function() {
    return Session.get('counter');
  },

  items: function() {
    return Items.find({}, {sort: {createdAt: -1}});
  }
});

Template.about.events({
  'click .increase': function(event) {
    event.preventDefault();
    Session.set('counter', Session.get('counter') + 1);
  },

  'click .decrease': function(event) {
    event.preventDefault();
    Session.set('counter', Session.get('counter') - 1);
  },

  'submit .new-item': function(event) {
    event.preventDefault();

    var name = event.target.name.value;
    Meteor.call('addItem', name, function(error, result) {
      if (error) {
        console.log('error adding item');
      }
    });

    event.target.name.value = "";
  }
});
