'use strict';
function renderStartScreen() {
   mainNode.appendChild(templateEngine(startScreenTemplate()));

   renderBlock('createBtn', document.querySelector('.screen'));
}

function renderCreateButton(container) {
   container.appendChild(templateEngine(createBtnTemplate()));

   container.closest('.form').addEventListener('submit', (event) => {
      event.preventDefault();

      const newUserLogin = container.querySelector('.screen__input').value;

      creds.set({ login: newUserLogin });

      req('createNewPlayer', (data) => {
         if (DEBUG) console.log(data);
         if (!data.status === 'ok') throw Error("New user wasn't create");

         if (DEBUG) console.log(`User ${newUserLogin} successfully created`);
         creds.set({ token: data.token });
         renderScreen('lobbyScreen');
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
               pattern: '^[A-Za-z0-9]{3,10}$',
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
