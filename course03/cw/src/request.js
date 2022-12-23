function req(type, callback, move = null) {
   let url = 'https://skypro-rock-scissors-paper.herokuapp.com/';

   const token = localStorage.getItem('rspToken');
   const login = localStorage.getItem('rspUserName');
   const gameId = window.app.player.gameId;

   switch (type) {
      case 'ping':
         url += 'ping';
         break;

      case 'getPlayerStatus':
         url += 'player-status?token=' + token;
         break;

      case 'createNewPlayer':
         url += 'login?login=' + login;
         break;

      case 'getPlayersList':
         url += 'player-list?token=' + token;
         break;

      case 'startGame':
         url += 'start?token=' + token;
         break;

      case 'getGameStatus':
         url += 'game-status?token=' + token + '&id=' + gameId;
         break;

      case 'move':
         url += 'play?token=' + token + '&id=' + gameId + '&move=' + move;
         break;

      default:
         throw Error('Unknown type of req() was called');
   }

   if (DEBUG) console.log('URL:' + url);

   fetch(url)
      .then((response) => response.json())
      .then((data) => callback(data));
}
