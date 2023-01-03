'use strict';
function renderGameWaitScreen() {
   if (DEBUG) console.log('Render game wait screen');

   mainNode.appendChild(templateEngine(gameWaitScreenTemplate()));
   const screen = document.querySelector('.screen__status-box');

   renderBlock('gameStatusBlock', screen);
}

function renderGameWaitStatusBlock(container) {
   req('startGame', (data) => {
      if (DEBUG) console.log(data);
      if (data.status === 'error') {
         switch (data.message) {
            case "token doesn't exist":
               container.appendChild(templateEngine(gameWaitBlockTemplate('Нет игрока с таким токеном')));
               break;

            case 'player is already in game':
               container.appendChild(
                  templateEngine(gameWaitBlockTemplate('Игрок уже в игре, нельзя начать две игры одновременно'))
               );
               break;

            default:
               throw Error('Unknown error in renderGameStatusBlock()');
         }
      } else if (data.status === 'ok') {
         player.gameId = data['player-status'].game.id;
         renderScreen('inGameScreen');
      } else {
         throw Error('Something very wrong...');
      }
   });
}

function renderPlayerInfoBlock(container, result = null) {
   let [win, lose] = [0, 0];

   if (result === 'win') win = 1;
   if (result === 'lose') lose = 1;

   container.replaceChildren();
   container.appendChild(
      templateEngine(
         getPlayerInfoTemplate({
            login: creds.get('login'),
            wins: creds.get('wins') + win,
            loses: creds.get('loses') + lose,
         })
      )
   );
}

function renderInGameScreen() {
   if (DEBUG) console.log('Render in game screen');

   mainNode.appendChild(templateEngine(inGameScreenTemplate()));

   document.querySelector('.screen').addEventListener('click', (event) => {
      const target = event.target;

      if (!target.dataset.move) return;

      req(
         'move',
         (data) => {
            if (DEBUG) console.log('Your move: ' + target.dataset.move);
            if (DEBUG) console.log(data);
         },
         target.dataset.move
      );

      renderScreen('inGameScreen');
   });

   renderBlock('playerInfoBlock', mainNode.querySelector('.screen__player'));

   const box = document.querySelector('.screen__game-box');

   renderBlock('inGameBlock', box);

   timers.push(
      setInterval(() => {
         renderBlock('inGameBlock', box);
      }, 500)
   );
}

function renderInGameBlock(container) {
   req('getGameStatus', (data) => {
      if (DEBUG) console.log(data);
      if (data.status === 'ok') {
         switch (data['game-status'].status) {
            case 'waiting-for-start':
               if (DEBUG) console.log('Waiting for the enemy to enter the game');
               container.replaceChildren(templateEngine(waitingForStartTemplate()));
               break;

            case 'waiting-for-your-move':
               if (DEBUG) console.log('Waiting for your move');
               clearTimers();
               container.replaceChildren(templateEngine(waitingForYourMoveTemplate(data)));
               break;

            case 'waiting-for-enemy-move':
               if (DEBUG) console.log('Waiting for enemy move');
               container.replaceChildren(templateEngine(waitingForEnemyMoveTemplate(data)));
               break;

            case 'lose':
               if (DEBUG) console.log('You are loooooseeeer!');

               container.replaceChildren(templateEngine(youLoseTemplate(data)));

               renderBlock('playerInfoBlock', mainNode.querySelector('.screen__player'), 'lose');
               renderBlock('finishGameButtons', container);
               updateLocalPlayerStats();

               clearTimers();
               break;

            case 'win':
               if (DEBUG) console.log('You are WINNER!');

               container.replaceChildren(templateEngine(youWinTemplate(data)));

               renderBlock('playerInfoBlock', mainNode.querySelector('.screen__player'), 'win');
               renderBlock('finishGameButtons', container);
               updateLocalPlayerStats();

               clearTimers();
               break;

            default:
               throw Error('Unknown game status');
         }
      } else if (data.status === 'error') {
         if (DEBUG) console.log('Error: ' + data.message);

         container.replaceChildren(templateEngine(gameWaitBlockTemplate('Ошибка приложения.')));
      } else {
         throw Error('Something very wrong...');
      }
   });
}

function updateLocalPlayerStats() {
   req('getPlayersList', (players) => {
      setLocalPlayerStats(players);
   });
}

function setLocalPlayerStats(players) {
   players.list.forEach((elem) => {
      if (elem.hasOwnProperty('you')) {
         creds.set({ wins: elem.wins, loses: elem.loses });
      }
   });
}

function renderfinishGameButtons(container) {
   container.appendChild(templateEngine(finishGameButtonsTemplate()));

   container.querySelector('.new-game').addEventListener('click', () => {
      renderScreen('gameWaitScreen');
   });

   container.querySelector('.to-lobby').addEventListener('click', () => {
      renderScreen('lobbyScreen');
   });
}

function finishGameButtonsTemplate() {
   return [
      {
         tag: 'button',
         cls: ['screen__button', 'new-game'],
         content: 'Играть ещё',
      },
      {
         tag: 'button',
         cls: ['screen__button', 'to-lobby'],
         content: 'В лобби',
      },
   ];
}

function youLoseTemplate() {
   return {
      tag: 'p',
      cls: 'screen__game-lose',
      content: 'Ты проиграл!',
   };
}

function youWinTemplate() {
   return {
      tag: 'p',
      cls: 'screen__game-win',
      content: 'Ты выиграл!',
   };
}

function getPlayerInfoTemplate(player) {
   return {
      tag: 'p',
      cls: 'player',
      content: [
         player.login + ' ',
         {
            tag: 'div',
            cls: 'player-rate',
            content: [
               {
                  tag: 'span',
                  cls: 'player-rate__wins',
                  content: player.wins,
               },
               '/',
               {
                  tag: 'span',
                  cls: 'player-rate__loses',
                  content: player.loses,
               },
            ],
         },
      ],
   };
}

function waitingForEnemyMoveTemplate(data) {
   return [
      {
         tag: 'p',
         cls: 'screen__game-enemy',
         content: ['Противник:', getPlayerInfoTemplate(data['game-status'].enemy)],
      },
      {
         tag: 'p',
         cls: 'screen__status-text',
         content: 'Ожидаем ход соперника...',
      },
   ];
}

function waitingForYourMoveTemplate(data) {
   return [
      {
         tag: 'p',
         cls: 'screen__game-enemy',
         content: ['Противник:', getPlayerInfoTemplate(data['game-status'].enemy)],
      },
      {
         tag: 'p',
         cls: 'screen__game-header',
         content: 'Ваш ход!',
      },
      {
         tag: 'button',
         cls: ['screen__button', 'screen__button--move'],
         content: 'Камень',
         attrs: {
            'data-move': 'rock',
         },
      },
      {
         tag: 'button',
         cls: ['screen__button', 'screen__button--move'],
         content: 'Ножнитсы',
         attrs: {
            'data-move': 'scissors',
         },
      },
      {
         tag: 'button',
         cls: ['screen__button', 'screen__button--move'],
         content: 'Бумаго',
         attrs: {
            'data-move': 'paper',
         },
      },
   ];
}

function waitingForStartTemplate() {
   return {
      tag: 'p',
      cls: 'screen__status-text',
      content: 'Ожидаем подключение соперника...',
   };
}

function inGameScreenTemplate() {
   return {
      tag: 'div',
      cls: 'screen',
      content: [
         {
            tag: 'h1',
            cls: 'screen__header',
            content: 'Игра',
         },
         {
            tag: 'p',
            cls: 'screen__player',
            // content: [
            //    'Вы: ',
            //    getPlayerInfoTemplate({
            //       login: creds.get('login'),
            //       wins: creds.get('wins'),
            //       loses: creds.get('loses'),
            //    }),
            // ],
         },
         {
            tag: 'div',
            cls: 'screen__game-box',
         },
      ],
   };
}

function gameWaitScreenTemplate() {
   return {
      tag: 'div',
      cls: 'screen',
      content: [
         {
            tag: 'h1',
            cls: 'screen__header',
            content: 'Вход в игру',
         },
         {
            tag: 'div',
            cls: 'screen__status-box',
         },
      ],
   };
}

function gameWaitBlockTemplate(message) {
   return {
      tag: 'p',
      cls: 'screen__status-text',
      content: message,
   };
}
