const API_BASE_URL = 'https://jsonplaceholder.typicode.com';

const postbox = document.querySelector('.postbox');

const modal = new MyModal();

document.addEventListener('DOMContentLoaded', () => {
   postbox.addEventListener('click', clickHandler);
   const urlParams = new URLSearchParams(location.search);

   if (!urlParams.get('id')) {
      console.log('Show all posts');
      showAllPosts();
   } else {
      console.log('Show one post with id: ' + urlParams.get('id'));
      showOnePost(urlParams.get('id'));
   }
});

const clickHandler = (event) => {
   if (!Object.keys(event.target.dataset).length > 0) return;

   const action = Object.entries(event.target.dataset)[0];

   if (action[0] === 'id') {
      console.log('Show details item: ' + action[1]);
      showOnePost(action[1]);
   }

   if (action[0] === 'ctrl') {
      event.preventDefault();
      const itemId = event.target.closest('.post').dataset.id;

      switch (action[1]) {
         case 'edit':
            console.log('Edit item id: ' + itemId);
            showPostForm(itemId);
            break;

         case 'delete':
            modal.show(
               'confirm',
               'Warning!',
               `Do you really want to delete post with id: ${itemId}? You can't restore it!`,
               0,
               function () {
                  console.log(`Confirmed deleting post with id: ${itemId}`);

                  request({
                     url: API_BASE_URL + '/posts/' + itemId,
                     method: 'DELETE',
                     onSuccess: (data) => {
                        if (JSON.stringify(data) === '{}') {
                           modal.show(
                              'alert',
                              'Post was deleted.',
                              null,
                              2,
                              showAllPosts()
                           );
                        }
                     },
                     onError: (error) => {
                        console.log(error);
                     },
                  });
               }
            );
            break;

         case 'backward':
            console.log('Backward to all posts list');
            showAllPosts();
            break;

         case 'create':
            console.log('Create post');

            const form = event.target.closest('.form__empty');
            const title = form.querySelector('.form__new-title').value;
            const body = form.querySelector('.form__new-body').value;

            request({
               method: 'POST',
               url: API_BASE_URL + '/posts',
               body: {
                  title: title,
                  body: body,
                  userId: 1,
               },
               onSuccess: (data) => {
                  modal.show(
                     'alert',
                     'Post was created successfully!',
                     null,
                     2,
                     showAllPosts()
                  );
                  console.log(data);
               },
            });

            // showAllPosts();
            break;

         default:
            console.log('Unknown action');
            break;
      }
   }
};

const showAllPosts = () => {
   request({
      url: API_BASE_URL + '/posts',
      method: 'GET',
      onSuccess: (data) => {
         postbox.replaceChildren();
         postbox.appendChild(templateEngine(data.map(allPostsTemplate)));
         postbox.appendChild(templateEngine(showPostForm()));
         postbox.lastChild.addEventListener('submit', (event) => {
            event.preventDefault();
         });
      },
      onError: (error) => {
         console.log(error);
      },
   });
};

const showOnePost = (postId) => {
   request({
      url: API_BASE_URL + '/posts/?id=' + postId,
      method: 'GET',
      onSuccess: (data) => {
         postbox.replaceChildren();
         postbox.appendChild(templateEngine(data.map(onePostTemplate)));
      },
      onError: (error) => {
         console.log(error);
      },
   });
};

const showPostForm = (itemId) => {
   if (!itemId) {
      console.log('Show new item form');
      return emptyPostForm();
   } else {
      request({
         url: API_BASE_URL + '/posts/?id=' + itemId,
         method: 'GET',
         onSuccess: (data) => {
            postbox.replaceChildren();
            postbox.appendChild(templateEngine(editPostForm(data[0])));
            postbox
               .querySelector('.form__edit')
               .addEventListener('submit', (event) => {
                  event.preventDefault();
                  const form = event.target;
                  const title = form.querySelector('.form__new-title').value;
                  const body = form.querySelector('.form__new-body').value;

                  request({
                     method: 'PATCH',
                     url: API_BASE_URL + '/posts/' + data[0].id,
                     body: {
                        title: title,
                        body: body,
                     },
                     onSuccess: (resp) => {
                        if (resp)
                           modal.show(
                              'alert',
                              'Post successfully updated!',
                              null,
                              2,
                              showOnePost(data[0].id)
                           );
                     },
                  });
               });
         },
         onError: (error) => {
            console.log(error);
         },
      });
   }
};

function allPostsTemplate(post) {
   return {
      tag: 'div',
      cls: ['postbox__item', 'post'],
      attrs: {
         'data-id': post.id,
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
         {
            tag: 'div',
            cls: ['post__box-ctrl', 'ctrl'],
            content: [
               {
                  tag: 'i',
                  cls: ['ctrl__pencil', 'fa-solid', 'fa-pencil'],
                  attrs: {
                     'data-ctrl': 'edit',
                  },
               },
               {
                  tag: 'i',
                  cls: ['ctrl__cross', 'fa-solid', 'fa-xmark'],
                  attrs: {
                     'data-ctrl': 'delete',
                  },
               },
            ],
         },
      ],
   };
}

function onePostTemplate(post) {
   return {
      tag: 'div',
      cls: ['postbox__one-item', 'post'],
      attrs: {
         'data-id': post.id,
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
         {
            tag: 'div',
            cls: 'postbox__item-body',
            content: 'Post text: ' + post.body,
         },
         {
            tag: 'div',
            cls: ['post__box-ctrl', 'ctrl'],
            content: [
               {
                  tag: 'i',
                  cls: ['ctrl__pencil', 'fa-solid', 'fa-pencil'],
                  attrs: {
                     'data-ctrl': 'edit',
                  },
               },
               {
                  tag: 'i',
                  cls: ['ctrl__backward', 'fa-solid', 'fa-backward'],
                  attrs: {
                     'data-ctrl': 'backward',
                  },
               },
               {
                  tag: 'i',
                  cls: ['ctrl__cross', 'fa-solid', 'fa-xmark'],
                  attrs: {
                     'data-ctrl': 'delete',
                  },
               },
            ],
         },
      ],
   };
}

function emptyPostForm() {
   return {
      tag: 'form',
      cls: ['form__empty', 'post'],

      content: [
         {
            tag: 'p',
            content: 'Create new post',
         },
         {
            tag: 'input',
            cls: 'form__new-title',
            attrs: {
               placeholder: 'Title',
               name: 'title',
               required: '',
            },
         },
         {
            tag: 'textarea',
            cls: 'form__new-body',
            attrs: {
               placeholder: 'Enter the text',
               name: 'body',
               required: '',
            },
         },
         {
            tag: 'input',
            cls: 'form__new-userid',
            attrs: {
               type: 'hidden',
               value: '1',
               name: 'userid',
            },
         },
         {
            tag: 'button',
            content: 'Create post',
            cls: ['main__btn', '_hover'],
            attrs: {
               'data-ctrl': 'create',
            },
         },
      ],
   };
}

function editPostForm(postObj) {
   return {
      tag: 'form',
      cls: ['form__edit', 'post'],
      attrs: {
         'data-id': postObj.id,
      },
      content: [
         {
            tag: 'p',
            content: 'Update post',
         },
         {
            tag: 'input',
            cls: 'form__new-title',
            attrs: {
               name: 'title',
               required: '',
               value: postObj.title,
            },
         },
         {
            tag: 'textarea',
            cls: 'form__new-body',
            attrs: {
               name: 'body',
               required: '',
            },
            content: postObj.body,
         },
         {
            tag: 'button',
            content: 'Update post',
            cls: ['main__btn', '_hover'],
         },
         {
            tag: 'i',
            cls: ['ctrl__backward', 'fa-solid', 'fa-backward'],
            attrs: {
               'data-ctrl': 'backward',
            },
         },
      ],
   };
}
