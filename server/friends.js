function Facebook(accessToken) {
	console.log('sucessful call to facebook open graph');
	this.accessToken = accessToken;
	FBGraph.setAccessToken(this.accessToken);
	this.options = {
		timeout: 3000,
		pool: {
			maxSockets: Infinity
		},
		headers: {
			connectino: 'keep-alive'
		}
	}
	FBGraph.setOptions(this.options);
}

Facebook.prototype.query = function(query, method) {
	var self = this;
	var method = (typeof method === 'undefined') ? 'get' : method;
	var data = Meteor.sync(function(done) {
		FBGraph[method](query, function(err, res) {
			done(null, res);
		});
	});
	return data.result;
}

Facebook.prototype.getUserFriends = function() {
	return this.query('me/friends?fields=id,name,relationship_status,political,religion,work,languages,hometown,favorite_teams,education,birthday');
}

Meteor.methods({
	getUserFriends: function(accessToken) {
		var fb = new Facebook(accessToken);
		var data = fb.getUserFriends();
		console.log('friends: ' + JSON.stringify(data))
		return data;
	}
})