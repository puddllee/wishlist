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

Router.route('/forgot', function() {
  this.render('forgot');
});

Router.route('/list', {
  name: 'list'
});

Router.route('/user/:_id', {
  name: 'user'
});

MainController = RouteController.extend({
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
      console.log('adding friend for hash ' + friendrequest);
      Meteor.call('addFriendForHash', friendrequest);
      Cookie.remove('friendrequest');

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
    if (Meteor.userId()) {
      Session.set('wishlist', []);
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

ChangePasswordController = MainController.extend({
  onBeforeAction: function() {
    if (!Meteor.userId()) {
      Router.go('/');
    } else {
      this.next();
    }
  },

  action: function() {
    this.render('changePassword');
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
    if (!Meteor.userId()) {
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
