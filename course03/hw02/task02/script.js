const img = document.getElementById('img');
const buttonBlock = document.getElementById('btn_blck');
const button = document.getElementById('btn');

button.onclick = () => {
   buttonBlock.classList.add('hidden');
   img.setAttribute(
      'src',
      'https://abrakadabra.fun/uploads/posts/2022-03/1647337814_1-abrakadabra-fun-p-zheleznii-chelovek-na-prozrachnom-fone-1.png'
   );
   img.classList.remove('hidden');
};
