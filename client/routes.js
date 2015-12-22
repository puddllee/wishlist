Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  trackPageView: true
});

// default route transitions
// Transitioner.default({ in : 'transition.fadeIn',
//   out: 'transition.fadeOut'
// });

Router.route('/', {
  name: 'index',
  controller: 'HomeController'
});

Router.route('/home', {
  name: 'home',
  controller: 'HomeController'
});

Router.route('/me', {
  name: 'me',
  controller: 'MeController'
});

// Router.route('/about', {
//   name: 'about',
//   waitOn: function() {
//     // return Meteor.subscribe('items');
//   }
// });

Router.route('/changepass', {
  name: 'changepass',
  controller: 'ChangePasswordController'
});

Router.route('/changepass/:token', {
  name: 'changepass.token',
  controller: 'ChangePasswordController'
});

Router.route('/forgot', function() {
  this.render('forgot');
});

Router.route('/list', {
  name: 'list'
});

Router.route('/user/:_id', {
  name: 'user'
});

// Router.route('/home', function() {
//   this.render('home');
// });

MainController = RouteController.extend({
  waitOn: function() {
    Meteor.subscribe('items');
    Meteor.subscribe('wishlists');
    Meteor.subscribe('notis');
    Meteor.subscribe('users');
    Meteor.subscribe('me');
  },

  onBeforeAction: function() {
    var friendrequest = '';
    var query = this.params.query;
    if (query && query.friendrequest && query.friendrequest !== '') {
      friendrequest = query.friendrequest;
    }
    // prioritize cookie value
    var fr = Cookie.get('friendrequest');
    if (fr && fr !== '') {
      friendrequest = fr;
    }

    if (Meteor.userId() && friendrequest !== '') {

      Meteor.call('addFriendForHash', friendrequest);
      Cookie.remove('friendrequest');

      // remove query from
      var uri = window.location.toString();
      if (uri.indexOf("?") > 0) {
        var clean_uri = uri.substring(0, uri.indexOf("?"));
        window.history.replaceState({}, document.title, clean_uri);
      }
    }

    Session.set('emailUser', isEmailUser());
    this.next();
  }
});

HomeController = MainController.extend({
  onBeforeAction: function() {
    var path = Router.current().route.path(this);
    this.next();
    // if (path !== '/home' && Meteor.userId() && !Meteor.loggingIn()) {
    //   this.render('list');
    // } else {
    //   this.next();
    // }
  },

  action: function() {
    this.render('home');
  }
});

ChangePasswordController = MainController.extend({
  onBeforeAction: function() {
    if (this.params.token && isEmailUser()) {
      Accounts._resetPasswordToken = this.params.token;
      this.next();
    } else if ((Meteor.userId() || Meteor.loggingIn()) && isEmailUser()) {
      this.next();
    } else {
      if (Meteor.userId() && !isEmailUser()) {
        this.render('list');
      } else {
        this.render('home');
      }

    }
  },

  action: function() {
    this.render('changePassword', {
      data: function() {
        return this.params.token;
      }
    });
  }
});

ListController = MainController.extend({
  onBeforeAction: function() {
    if (!Meteor.userId() && !Meteor.loggingIn()) {
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
    if (!Meteor.userId() && !Meteor.loggingIn()) {
      this.render('home');
    } else {
      this.next();
    }
  },

  action: function() {
    // this.state.set('userId', this.params._id);
    this.render('user', {
      data: function() {
        return this.params._id
      }
    });
  }
});

MeController = MainController.extend({
  onBeforeAction: function() {
    if (!Meteor.userId() && !Meteor.loggingIn()) {
      this.render('home');
    } else {
      this.next();
    }
  },

  action: function() {
    this.state.set('data', Meteor.userId());
    this.render('user', {
      data: function() {
        return Meteor.userId()
      }
    })
  }
});
