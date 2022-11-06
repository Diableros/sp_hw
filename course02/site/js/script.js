const cursor = document.querySelector('.cursor-pointer');

const mouseMove = function (e) {
    let x = e.clientX;
    let y = e.clientY;
    cursor.style.left = x + 'px';
    cursor.style.top = y + 'px';
};

document.addEventListener('mousemove', mouseMove);

function curVis() {
    cursor.style.display = 'block';
}
function curNoVis() {
    cursor.style.display = 'none';
}   
