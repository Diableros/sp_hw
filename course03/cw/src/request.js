function req(type, callback, move = null) {
   let url = 'https://skypro-rock-scissors-paper.herokuapp.com/';

   const gameId = window.app.player.gameId;

   switch (type) {
      case 'ping':
         url += 'ping';
         break;

      case 'getPlayerStatus':
         url += 'player-status?token=' + creds.get('token');
         break;

      case 'createNewPlayer':
         url += 'login?login=' + creds.get('login');
         break;

      case 'getPlayersList':
         url += 'player-list?token=' + creds.get('token');
         break;

      case 'startGame':
         url += 'start?token=' + creds.get('token');
         break;

      case 'getGameStatus':
         url += 'game-status?token=' + creds.get('token') + '&id=' + gameId;
         break;

      case 'move':
         url += 'play?token=' + creds.get('token') + '&id=' + gameId + '&move=' + move;
         break;

      default:
         throw Error('Unknown type of req() was called');
   }

   // if (DEBUG) console.log('URL:' + url);

   fetch(url)
      .then((response) => response.json())
      .then((data) => callback(data));
}
