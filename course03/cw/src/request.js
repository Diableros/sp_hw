'use strict';
import ky from '../node_modules/ky/distribution/index.js';

class KyReq {
   constructor(BASE_URL) {
      console.log('Create Request Class instance.');
      this.BASE_URL = BASE_URL;
      this.checkPing();
   }

   async checkPing() {
      const ping = await ky.get(this.BASE_URL + 'ping').json();
      console.log(`Server: I'm ${ping.status}! I say ${ping.message}!`);
   }

   async createNewPlayer(login, callback) {
      const res = await ky.get(this.BASE_URL + 'login?login=' + login).json();

      return callback(res);
   }

   async getPlayersList(token, callback) {
      const res = await ky
         .get(this.BASE_URL + 'player-list?token=' + token)
         .json();

      return callback(res.list);
   }

   async getPlayerStatus(token, callback) {
      const res = await ky
         .get(this.BASE_URL + 'player-status?token=' + token)
         .json();

      return callback(res);
   }

   async startGame(token, callback) {
      const res = await ky.get(this.BASE_URL + 'start?token=' + token).json();

      return callback(res);
   }

   async getGameStatus(token, gameId, callback) {
      const res = await ky.get(this.BASE_URL + 'game-status?token=' + token + '&id=' + gameId).json();

      return callback(res);
   }

   async move(token, gameId, move, callback) {
      const res = await ky.get(this.BASE_URL + 'play?token=' + token + '&id=' + gameId + '&move=' + move).json();

      return callback(res);
   }
}

export default KyReq;
