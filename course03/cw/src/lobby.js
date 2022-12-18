// экран лобби
function renderLobbyScreen() {
   window.app.player.token = localStorage.getItem('rspToken');
   console.log('Render lobby screen');

   window.app.mainNode.appendChild(templateEngine(lobbyScreenTemplate()));
   const screen = document.querySelector('.screen');

   window.app.renderBlock('playersOnline', screen);
   refreshPlayersList();
   window.app.renderBlock('startGameBtn', screen);
}

// блок списка игроков онлайн
function renderPlayersOnline(container) {
   container.appendChild(templateEngine(playersOnlineTemplate()));

   window.app.timers.push(
      setInterval(() => {
         refreshPlayersList();
      }, 10000)
   );
}

// обновить список игроков
function refreshPlayersList() {
   const playersList = document.querySelector('.screen__players-box');

   window.app.req.getPlayersList(window.app.player.token, (players) => {
      console.log(`Online ${players.length} players`);

      playersList.replaceChildren(
         templateEngine(playersOnlineListTemplate(players))
      );
   });
}

// кнопка старта новой игры (в лобби)
function renderStartGameBtn(container) {
   container.appendChild(templateEngine(startGameBtnTemplate()));

   container.closest('.form').addEventListener('submit', (event) => {
      event.preventDefault();

      console.log('Click button to enter the game');
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
      content: playersArray.map((elem) => ({
         tag: 'li',
         cls: elem.hasOwnProperty('you')
            ? 'screen__players-you'
            : 'screen__players-item',
         content: elem.login,
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
