Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading'
});

Router.route('/', {
  name: 'home',
  controller: 'HomeController'
});

Router.route('/about', {
  name: 'about',
  waitOn: function() {
    // return Meteor.subscribe('items');
  }
});

Router.route('/list', {
  name: 'list'
});

Router.route('/user/:_id', {
  name: 'user'
});

MainController = RouteController.extend({
  onBeforeAction: function() {
    var query = this.params.query;
    if (Meteor.userId() && query && query.friendrequest) {
      console.log(query.friendrequest);
      // Meteor.call('addFriendForHash', query.friendrequest);
    }
    this.next();
  },

  action: function() {
    this.render('home');
  }
});

HomeController = MainController.extend({
  onBeforeAction: function() {
    if (Meteor.user()) {
      this.render('list');
    } else {
      this.next();
    }
  },

  action: function() {
    this.render('home');
  }
});


AboutController = MainController.extend({
  action: function() {
    this.render('about');
  }
});

ListController = MainController.extend({
  onBeforeAction: function() {
    if (!Meteor.userId()) {
      this.render('home');
    } else {
      this.next();
    }
  },

  action: function() {
    this.render('list');
  }
});

UserController = MainController.extend({
  onBeforeAction: function() {
    if (!Meteor.userId()) {
      this.render('home');
    } else {
      this.next();
    }
  },

  action: function() {
    this.render('user');
  }
});
