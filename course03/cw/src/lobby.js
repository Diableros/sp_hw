'use strict';
function renderLobbyScreen() {
   if (DEBUG) console.log('Render lobby screen');

   mainNode.appendChild(templateEngine(lobbyScreenTemplate()));
   const screen = document.querySelector('.screen');

   renderBlock('playersOnline', screen);
   refreshPlayersList();
   renderBlock('startGameBtn', screen);
}

function renderPlayersOnline(container) {
   container.appendChild(templateEngine(playersOnlineTemplate()));

   timers.push(
      setInterval(() => {
         refreshPlayersList();
      }, 1000)
   );
}

function refreshPlayersList() {
   const playersList = document.querySelector('.screen__players-box');

   req('getPlayersList', (players) => {
      if (DEBUG) console.log(`Online ${players.list.length} players`);
      if (DEBUG) console.log(players.list);

      setLocalPlayerStats(players);

      playersList.replaceChildren(templateEngine(playersOnlineListTemplate(players.list)));
   });
}

function renderStartGameBtn(container) {
   container.appendChild(templateEngine(startGameBtnTemplate()));

   container.closest('.form').addEventListener('submit', (event) => {
      event.preventDefault();

      renderScreen('gameWaitScreen');
   });
}

function lobbyScreenTemplate() {
   return {
      tag: 'form',
      cls: ['screen', 'form'],
      content: [
         {
            tag: 'h1',
            cls: 'screen__header',
            content: 'Лобби',
         },
      ],
   };
}

function playersOnlineTemplate() {
   return [
      {
         tag: 'p',
         cls: 'screen__players-header',
         content: 'Игроки онлайн',
      },
      {
         tag: 'div',
         cls: 'screen__players-box',
      },
   ];
}

function playersOnlineListTemplate(playersArray) {
   return {
      tag: 'ul',
      cls: 'screen__players-list',
      content: playersArray.map((player) => ({
         tag: 'li',
         cls: player.hasOwnProperty('you') ? 'screen__players-you' : 'screen__players-item',
         content: getPlayerInfoTemplate(player),
      })),
   };
}

function startGameBtnTemplate() {
   return {
      tag: 'button',
      cls: 'screen__button',
      content: 'Играть!',
   };
}
