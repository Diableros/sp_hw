import { templateEngine } from './templateEngine.js';

const requestURL = 'https://api.punkapi.com/v2/beers';
const xmlHttpRequest = new XMLHttpRequest();

xmlHttpRequest.open('GET', requestURL);
xmlHttpRequest.responseType = 'json';
xmlHttpRequest.onload = () => {
   const products = xmlHttpRequest.response;
   const productBox = document.querySelector('.main__product-box');

   productBox.appendChild(templateEngine(products.map(productEngineTemplate)));
};
xmlHttpRequest.send();

function productEngineTemplate(product) {
   return {
      tag: 'div',
      cls: ['main__card-outer', 'hover'],
      content: [
         {
            tag: 'div',
            cls: ['main__card-inner', 'prod'],
            content: [
               {
                  tag: 'div',
                  cls: 'prod__pic',
                  content: [
                     {
                        tag: 'img',
                        cls: 'prod__img',
                        attrs: {
                           alt: product.name,
                           src: product.image_url,
                        },
                     },
                     {
                        tag: 'div',
                        cls: 'prod__tag',
                        content: product.tagline,
                     },
                  ],
               },
               {
                  tag: 'div',
                  cls: 'prod__name',
                  content: product.name,
               },
               // {
               // tag: 'div',
               // cls: 'prod__prop-box',
               // content:
               // Object.keys(product.ingredients).map(ingredHead => {
               // return [{
               // tag: 'div',
               // content: [
               // {
               // tag: 'div',
               // content: ingredHead[0].toUpperCase() + ingredHead.slice(1),
               // },
               // typeof product.ingredients[ingredHead] === 'object' ? product.ingredients[ingredHead].map(obj => {
               // return {
               // tag: 'div',
               // content: obj.name + ': ' + obj.amount.value + ' ' + obj.amount.unit,
               // }
               // }) : product.ingredients[ingredHead]
               // ]
               // }]
               // })
               // },
               {
                  tag: 'div',
                  cls: 'prod__prop-box',
                  content: [
                     {
                        tag: 'div',
                        cls: 'prod__prop',
                        content: [
                           {
                              tag: 'div',
                              cls: 'prod__prop-name',
                              content: 'ABV',
                           },
                           {
                              tag: 'div',
                              cls: 'prod__prop-val',
                              content: product.abv + '%',
                           },
                        ],
                     },
                     {
                        tag: 'div',
                        cls: 'prod__prop',
                        content: [
                           {
                              tag: 'div',
                              cls: 'prod__prop-name',
                              content: 'IBU',
                           },
                           {
                              tag: 'div',
                              cls: 'prod__prop-val',
                              content: product.ibu || 'n/a',
                           },
                        ],
                     },
                     {
                        tag: 'div',
                        cls: 'prod__prop',
                        content: [
                           {
                              tag: 'div',
                              cls: 'prod__prop-name',
                              content: 'EBC',
                           },
                           {
                              tag: 'div',
                              cls: 'prod__prop-val',
                              content: product.ebc || 'n/a',
                           },
                        ],
                     },
                     {
                        tag: 'div',
                        cls: 'prod__prop',
                        content: [
                           {
                              tag: 'div',
                              cls: 'prod__prop-name',
                              content: 'SRM',
                           },
                           {
                              tag: 'div',
                              cls: 'prod__prop-val',
                              content: product.srm || 'n/a',
                           },
                        ],
                     },
                     {
                        tag: 'div',
                        cls: 'prod__prop',
                        content: [
                           {
                              tag: 'div',
                              cls: 'prod__prop-name',
                              content: 'ph',
                           },
                           {
                              tag: 'div',
                              cls: 'prod__prop-val',
                              content: product.ph || 'n/a',
                           },
                        ],
                     },
                  ],
               },
               {
                  tag: 'div',
                  cls: 'prod__descr',
                  content: [
                     product.description.slice(0, 110) + '... ',
                     {
                        tag: 'a',
                        cls: 'prod__descr-more-link',
                        attrs: {
                           href: '#',
                        },
                        content: 'read more...',
                     },
                  ],
               },
            ],
         },
      ],
   };
}
