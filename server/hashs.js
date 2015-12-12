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
    console.log(hash);
    if (!Meteor.user()) {
      return;
    }
    return;

    var friend = Hash.getUserFromHash(hash);
    if (friend) {
      console.log('will add ' + friend._id + ' as friend for ' + Meteor.userId());
    } else {
      console.log('cannot find user for that hash: ' + hash);
    }
  }
}


Meteor.methods({
  addFriendForHash: Hash.addFriendForHash
});
