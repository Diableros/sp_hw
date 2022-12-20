'use strict';
function renderStartScreen() {
   window.app.mainNode.appendChild(templateEngine(startScreenTemplate()));
   window.app.renderBlock('createBtn', document.querySelector('.screen'));
}

function renderCreateButton(container) {
   container.appendChild(templateEngine(createBtnTemplate()));

   container.closest('.form').addEventListener('submit', (event) => {
      event.preventDefault();

      const newUserLogin = container.querySelector('.screen__input').value;

      window.app.req.createNewPlayer(newUserLogin, (data) => {
         if (!data.status === 'ok') throw Error("New user wasn't create");

         console.log(`User ${newUserLogin} successfully created`);
         window.app.player.userName = newUserLogin;
         window.app.player.token = data.token;

         localStorage.setItem('rspUserName', newUserLogin);
         localStorage.setItem('rspToken', data.token);

         window.app.renderScreen('lobbyScreen');
      });
   });
}

function startScreenTemplate() {
   return {
      tag: 'form',
      cls: ['screen', 'form'],
      content: [
         {
            tag: 'h1',
            cls: 'screen__header',
            content: 'Новый пользователь',
         },
         {
            tag: 'input',
            cls: 'screen__input',
            attrs: {
               type: 'text',
               placeholder: 'Логин',
               pattern: '^[A-Za-z0-9]{4,10}$',
               title: 'Имя пользователя должно состоять из 4-10 латинских символов/цифр',
               required: '',
            },
         },
      ],
   };
}

function createBtnTemplate() {
   return {
      tag: 'button',
      cls: 'screen__button',
      content: 'Создать',
   };
}
