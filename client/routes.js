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
  action: function() {
    this.render('home', {
      data: function() {
        return {
          posts: ['post red', 'post blue']
        }
      }
    });
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

LoginController = MainController.extend({
  action: function() {
    if (Meteor.user()) {
      this.render('list');
    } else {
      Router.go('/');
    }
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
