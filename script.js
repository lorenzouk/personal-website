const images = [
  'img/background1.jpeg',
  'img/background2.jpeg',
  'img/background3.jpeg',
  'img/background4.jpg',
  'img/background5.jpg',
  'img/background6.JPG',
  'img/background7.JPG',
  'img/background8.JPG',
  'img/background9.JPG',
  'img/background10.JPG',
  'img/background11.JPG'
];

let index = 0;
const bg1 = document.getElementById('bg1');
const bg2 = document.getElementById('bg2');

bg1.style.backgroundImage = `url('${images[0]}')`;
bg1.classList.add('visible');

setInterval(() => {
  index = (index + 1) % images.length;

  if (bg1.classList.contains('visible')) {
    bg2.style.backgroundImage = `url('${images[index]}')`;
    bg2.classList.add('visible');
    bg1.classList.remove('visible');
  } else {
    bg1.style.backgroundImage = `url('${images[index]}')`;
    bg1.classList.add('visible');
    bg2.classList.remove('visible');
  }
}, 5000);
