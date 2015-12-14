// global functions that are useful to be called within templates

helpers = {
  timeAgo: function(date) {
    return moment(date).format('h:mm a MMM Do');
  },

  compare: function(v1, v2) {
    return v1 === v2;
  },

  favicon: function(url) {
    if (!url || url === '') {
      return false;
    }
    var pathArray = url.split('/');
    var protocol = pathArray[0];
    var host = pathArray[2];
    if (host && protocol) {
      return protocol + '//' + host + '/favicon.ico';
    }
    return false;
  },

  sadFace: function() {
    var lessSadFaces = [
      '◔̯◔',
      '٩◔̯◔۶',
    ];

    return lessSadFaces[Math.floor(Math.random() * lessSadFaces.length)];
  }
};
Helpers.addScope('H', helpers);