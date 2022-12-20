'use strict';
function renderGameWaitScreen() {
   console.log('Render game wait screen');

   window.app.mainNode.appendChild(templateEngine(gameWaitScreenTemplate()));
   const screen = document.querySelector('.screen__status-box');

   window.app.renderBlock('gameStatusBlock', screen);
}

function renderGameWaitStatusBlock(container) {
   window.app.req.startGame(window.app.player.token, (data) => {
      console.log(data);

      if (data.status === 'error') {
         switch (data.message) {
            case "token doesn't exist":
               container.appendChild(
                  templateEngine(
                     gameWaitBlockTemplate('Нет игрока с таким токеном')
                  )
               );
               break;

            case 'player is already in game':
               container.appendChild(
                  templateEngine(
                     gameWaitBlockTemplate(
                        'Игрок уже в игре, нельзя начать две игры одновременно'
                     )
                  )
               );
               break;

            default:
               throw Error('Unknown error in renderGameStatusBlock()');
         }
      } else if (data.status === 'ok') {
         window.app.player.gameId = data['player-status'].game.id;
         window.app.renderScreen('inGameScreen');
      }
   });
}

function renderInGameScreen() {
   console.log('Render in game screen');

   window.app.mainNode.appendChild(templateEngine(inGameScreenTemplate()));

   document.querySelector('.screen').addEventListener('click', (event) => {
      const target = event.target;
      const player = window.app.player;

      // console.log(player.token, player.gameId, target.dataset.move);

      window.app.req.move(
         player.token,
         player.gameId,
         target.dataset.move,
         (data) => {
            console.log(data);
         }
      );
   });

   const box = document.querySelector('.screen__game-box');

   window.app.renderBlock('inGameBlock', box);

   window.app.timers.push(
      setInterval(() => {
         window.app.renderBlock('inGameBlock', box);
      }, 1000)
   );
}

function renderInGameBlock(container) {
   window.app.req.getGameStatus(
      window.app.player.token,
      window.app.player.gameId,
      (data) => {
         console.log(data);

         if (data.status === 'ok') {
            switch (data['game-status'].status) {
               case 'waiting-for-start':
                  console.log('Waiting for the enemy to enter the game');
                  container.replaceChildren(
                     templateEngine(waitingForStartTemplate())
                  );
                  break;

               case 'waiting-for-your-move':
                  console.log('Waiting for your move');
                  container.replaceChildren(
                     templateEngine(waitingForYourMoveTemplate(data))
                  );
                  break;

               case 'waiting-for-enemy-move':
                  console.log('Waiting for enemy move');
                  container.replaceChildren(
                     templateEngine(waitingForEnemyMoveTemplate(data))
                  );
                  break;

               case 'lose':
                  console.log('You are loooooseeeer!');
                  container.replaceChildren(
                     templateEngine(youLoseTemplate(data))
                  );
                  window.app.renderBlock('finishGameButtons', container);
                  window.app.clearTimers();
                  break;

               case 'win':
                  console.log('You are WINNER!');
                  container.replaceChildren(
                     templateEngine(youWinTemplate(data))
                  );
                  window.app.renderBlock('finishGameButtons', container);
                  window.app.clearTimers();
                  break;

               default:
                  throw Error('Unknown game status');
            }
         } else if (data.status === 'error') {
            console.log('Error: ' + data.message);

            container.replaceChildren(
               templateEngine(gameWaitBlockTemplate('Ошибка приложения.'))
            );
         } else {
            throw Error('Something very wrong...');
         }
      }
   );
}

function renderfinishGameButtons(container) {
   container.appendChild(templateEngine(finishGameButtonsTemplate()));

   container.querySelector('.new-game').addEventListener('click', () => {
      window.app.renderScreen('gameWaitScreen');
   });

   container.querySelector('.to-lobby').addEventListener('click', () => {
      window.app.renderScreen('lobbyScreen');
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

function waitingForEnemyMoveTemplate(data) {
   return [
      {
         tag: 'p',
         cls: 'screen__game-enemy',
         content: `Противник: ${data['game-status'].enemy.login}`,
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
         content: `Противник: ${data['game-status'].enemy.login}`,
      },
      {
         tag: 'p',
         cls: 'screen__game-header',
         content: 'Ваш ход!',
      },
      {
         tag: 'button',
         cls: ['screen__game-move', 'move'],
         content: 'Камень',
         attrs: {
            'data-move': 'rock',
         },
      },
      {
         tag: 'button',
         cls: ['screen__game-move', 'move'],
         content: 'Ножнитсы',
         attrs: {
            'data-move': 'scissors',
         },
      },
      {
         tag: 'button',
         cls: ['screen__game-move', 'move'],
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
      content: 'Ожидаем подключения соперника...',
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
            tag: 'h1',
            cls: 'screen__player',
            content: 'Вы: ' + window.app.player.userName,
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
