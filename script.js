const images = [
  'img/background1.jpeg',
  'img/background2.jpeg',
  'img/background3.jpeg',
  'img/background4.jpg',
  'img/background5.jpg',
];

let index = 0;
const hero = document.getElementById('hero');

setInterval(() => {
  index = (index + 1) % images.length;
  hero.style.backgroundImage = `url('${images[index]}')`;
}, 5000);