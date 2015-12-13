User = {
	'getUser': function(userId) {
		return Meteor.users.findOne({
			_id: userId
		});
	}
}

Meteor.methods(User)