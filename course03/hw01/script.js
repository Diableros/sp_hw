const header = document.getElementById('header');
const input = document.getElementById('input');
const changeBtn = document.getElementById('change_btn');

const change = () =>
   input.value !== ''
      ? ([header.textContent, input.value] = [input.value, ''])
      : null;

const keyDown = (e) => (e.keyCode === 13 ? change() : null);

changeBtn.onclick = change;
