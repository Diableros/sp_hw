const API_BASE_URL = 'https://jsonplaceholder.typicode.com';

const postbox = document.querySelector('.postbox');

// const modal = new MyModal();

document.addEventListener('DOMContentLoaded', () => {
   console.log(location.search);
   const urlParams = new URLSearchParams(location.search);

   console.log(Boolean(urlParams.get('id')));
   getData('GET', '/posts');
});

const getData = (method = 'GET', action = '') => {
   request({
      url: API_BASE_URL + action,
      method: method,
      onSuccess: (data) => renderPostbox(data),
      onError: (error) => {
         console.log(error);
      },
   });
};

function renderPostbox(data) {
   console.log(data);

   postbox.appendChild(templateEngine(data.map((post) => getPostObj(post))));
}

function getPostObj(post) {
   return {
      tag: 'div',
      cls: 'postbox__item',
      attrs: {
         'data-details': post.id,
      },
      content: [
         {
            tag: 'div',
            cls: 'postbox__user',
            content: 'User: ' + post.userId,
         },
         {
            tag: 'div',
            cls: 'postbox__item-title',
            content: 'Title: ' + post.title,
         },
      ],
   };
}
