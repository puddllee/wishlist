// global functions that are useful to be called within templates

helpers = {
  timeAgo: function(date) {
    return moment(date).format('h:mm a MMM Do');
  },

  compare: function(v1, v2) {
    return v1 === v2;
  }
};
Helpers.addScope('H', helpers);
