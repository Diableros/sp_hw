'use strict';
import KyReq from './request.js';
// export * from './lobby.js';

const BASE_URL = 'https://skypro-rock-scissors-paper.herokuapp.com/';

window.app = {
   blocks: {},
   screens: {},
   renderScreen: (screenName) => {
      if (!screens[screenName])
         throw Error('Вызов рендера несуществующего экрана!');

      if (window.app.timers.length > 0) {
         window.app.timers.forEach((timer) => clearInterval(timer));
         window.app.timers = [];
      }

      window.app.mainNode.replaceChildren();

      screens[screenName]();
   },
   renderBlock: (blockName, container) => {
      if (!blocks[blockName])
         throw Error('Вызов рендера несуществующего блока!');

      blocks[blockName](container);
   },
   timers: [],
   player: {},
   mainNode: document.querySelector('.container'),
};

window.app.req = new KyReq(BASE_URL);

const blocks = window.app.blocks;
const screens = window.app.screens;

screens['lobbyScreen'] = renderLobbyScreen;
blocks['playersOnline'] = renderPlayersOnline;
blocks['startGameBtn'] = renderStartGameBtn;

screens['startScreen'] = renderStartScreen;
blocks['createBtn'] = renderCreateButton;

// инициализация начального состояния приложения
function initApp() {
   if (
      !localStorage.getItem('rspUserName') ||
      !localStorage.getItem('rspToken')
   ) {
      console.log('Registered user not found. Render create user screen.');
      window.app.renderScreen('startScreen');
   } else {
      console.log('Current user exist');

      window.app.player.userName = localStorage.getItem('rspUserName');
      window.app.player.token = localStorage.getItem('rspToken');

      // проверяем живой ли токен
      window.app.req.getPlayerStatus(window.app.player.token, (data) => {
         // console.log(data);

         if (data.status === 'error') {
            console.log('Token was expired. Request new token.');

            window.app.req.createNewPlayer(
               localStorage.getItem('rspUserName'),
               (data) => {
                  if (data.status === 'ok')
                     console.log('Save new token to local storage');
                  localStorage.setItem('rspToken', data.token);
                  window.app.renderScreen('lobbyScreen');
               }
            );

            // window.app.req.getPlayersList(
            //    localStorage.getItem('rspToken'),
            //    (data) => console.log(data)
            // );
         } else if (data.status === 'ok') {
            console.log('User token alive!');
            window.app.renderScreen('lobbyScreen');
         }
      });
   }
}

initApp();
