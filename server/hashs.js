var Greg = Meteor.npmRequire('greg');

// CARE
// Hash object : the one below with useful methods
// Hashs object : Mongo collection

Hash = {
  createHash: function(user_id) {
    var hash = Greg.sentence().split(' ').join('-');
    Hashs.insert({
      hash_string: hash,
      user_id: user_id
    });
    return hash;
  },

  removeHash: function(hashId) {
    Hashs.remove(hashId);
  },

  getUserFromHash: function(hash) {
    return Hashs.findOne({
      hash_string: hash
    });
  },

  // add the user_id associated with the hash
  // as a friend to the currently logged in user
  addFriendForHash: function(hash) {
    if (!Meteor.user()) {
      console.log('error.')
      return;
    }

    var friend = Hash.getUserFromHash(hash);
    if (friend) {
      Friends.addFriend(friend.user_id);
      Hash.removeHash(friend._id);
    } else {
      console.log('cannot find user for that hash: ' + hash);
    }
  }
}


Meteor.methods(Hash);