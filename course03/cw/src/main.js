'use strict';
import KyReq from './request.js';

const BASE_URL = 'https://skypro-rock-scissors-paper.herokuapp.com/';

window.app = {
   blocks: {},
   screens: {},
   renderScreen: (screenName) => {
      if (!screens[screenName])
         throw Error('Вызов рендера несуществующего экрана!');

      clearTimers();

      window.app.mainNode.replaceChildren();

      screens[screenName]();
   },
   renderBlock: (blockName, container) => {
      if (!blocks[blockName])
         throw Error('Вызов рендера несуществующего блока!');

      blocks[blockName](container);
   },
   timers: [],
   clearTimers: clearTimers,
   player: {},
   mainNode: document.querySelector('.container'),
   req: new KyReq(BASE_URL),
};

const blocks = window.app.blocks;
const screens = window.app.screens;

// ЛОГИН
screens['startScreen'] = renderStartScreen;
blocks['createBtn'] = renderCreateButton;

// ЛОББИ
screens['lobbyScreen'] = renderLobbyScreen;
blocks['playersOnline'] = renderPlayersOnline;
blocks['startGameBtn'] = renderStartGameBtn;

screens['gameWaitScreen'] = renderGameWaitScreen;
blocks['gameStatusBlock'] = renderGameWaitStatusBlock;

screens['inGameScreen'] = renderInGameScreen;
blocks['inGameBlock'] = renderInGameBlock;
blocks['finishGameButtons'] = renderfinishGameButtons;

function clearTimers() {
   if (window.app.timers.length > 0) {
      window.app.timers.forEach((timer) => clearInterval(timer));
      window.app.timers = [];
   }
}

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
         } else if (data.status === 'ok') {
            console.log('User token alive!');
            window.app.req.getPlayerStatus(window.app.player.token, (data) => {
               if (!data.status === 'ok')
                  throw Error('No player with this token');
               console.log(data);
               switch (data['player-status'].status) {
                  case 'game':
                     console.log('Current user now in game!');
                     window.app.player.gameId = data['player-status'].game.id;
                     window.app.renderScreen('inGameScreen');
                     break;
                  case 'lobby':
                     window.app.renderScreen('lobbyScreen');
                     break;
                  default:
                     throw Error('Unknown player status');
               }
            });
         }
      });
   }
}

initApp();
