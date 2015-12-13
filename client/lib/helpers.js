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
    var soSadFaces = [
      'o͡͡͡╮༼ • ʖ̯ • ༽╭o͡͡͡',
      'ლ(ಥ Д ಥ )ლ',
      '┌(˵༎ຶ  ل͟  ༎ຶ˵)┐',
      '(-_-｡)',
      '( ຈ ﹏ ຈ )',
      '໒( ݓ Ĺ̯ ݓ )७',
      '໒( •́ ‸ •̀ )७',
      '〳 ‾́ ﹏ ‾́ 〵',
      '┏༼ ◉ ╭╮ ◉༽┓',
      '┏༼ •́ ╭╮ •̀ ༽┓',
      'ʕ ಡ ﹏ ಡ ʔ',
      '໒( , ⊙ – ⊙ , )७',
      'ლ(ಠ益ಠ)ლ'
    ]

    return soSadFaces[Math.floor(Math.random() * soSadFaces.length)];

  }
};
Helpers.addScope('H', helpers);