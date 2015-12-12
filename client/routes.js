Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading'
});

Router.route('/', {name: 'home', controller: 'HomeController'});
Router.route('/about', {
  name: 'about',
  waitOn: function() {
    // return Meteor.subscribe('items');
  }
});
Router.route('/list', {
  name: 'list'
});

MainController = RouteController.extend({
  action: function() {
  	this.render('home', {
	    data: function () {
	      return { posts: ['post red', 'post blue'] }
	    }
  	});
  }
});

HomeController = MainController.extend({
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
    this.render('list');
  }
});
