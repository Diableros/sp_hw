const API_BASE_URL =
   'https://dictionary.yandex.net/api/v1/dicservice.json/lookup';
const API_KEY =
   'dict.1.1.20221204T161527Z.2dab389849d0ccd6.5612ad74ca3307892bb27b5d0fcadea5e6846fc3';

document.addEventListener('DOMContentLoaded', () => {
   const form = document.querySelector('.form');
   const input = form.querySelector('.form__input');
   const definition = form.querySelector('.form__text');

   form.addEventListener('submit', (event) => {
      event.preventDefault();

      request({
         method: 'POST',
         url: API_BASE_URL,
         requestType: 'urlencoded',
         body: {
            key: API_KEY,
            lang: 'ru-ru',
            text: input.value,
         },
         onSuccess: (data) => {
            const word =
               input.value.slice(0, 1).toUpperCase() + input.value.slice(1);

            definition.textContent = '';

            if (data.def.length > 0) {
               definition.textContent = `${word} - это ${data.def[0].tr
                  .map((def) => def.text)
                  .join(', ')}`;
            } else {
               definition.textContent = `Слово "${word}" в словаре не найдено`;
            }
         },
         onError: (error) => console.log(error),
      });
   });
});
