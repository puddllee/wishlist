Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading'
});

Router.route('/', {
  name: 'home',
  controller: 'HomeController'
});

Router.route('/me', {
  name: 'me',
  controller: 'MeController'
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
    if (Meteor.userId() && query && query.friendrequest && query.friendrequest !== '') {
      Meteor.call('addFriendForHash', query.friendrequest);

      // remove query from
      var uri = window.location.toString();
      if (uri.indexOf("?") > 0) {
        var clean_uri = uri.substring(0, uri.indexOf("?"));
        window.history.replaceState({}, document.title, clean_uri);
      }
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
    this.state.set('userId', this.params._id);
    this.render('user', {
      data: function() {
        return this.params._id
      }
    });
  }
});

MeController = UserController.extend({
  onBeforeAction: function() {
    Router.go('user', {
      _id: Meteor.userId()
    })
  }
});