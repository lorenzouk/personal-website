const images = [
  'img/backgrounds/background1.jpeg',
  'img/backgrounds/background2.jpeg',
  'img/backgrounds/background3.jpeg',
  'img/backgrounds/background4.jpg',
  'img/backgrounds/background5.jpg',
  'img/backgrounds/background6.JPG',
  'img/backgrounds/background7.JPG',
  'img/backgrounds/background8.JPG',
  'img/backgrounds/background9.JPG',
  'img/backgrounds/background10.JPG',
  'img/backgrounds/background11.JPG'
];

// Preload images
let index = 0;
const bg1 = document.getElementById('bg1');
const bg2 = document.getElementById('bg2');

bg1.style.backgroundImage = `url('${images[0]}')`;
bg1.classList.add('visible');

// Change background every 5 seconds
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

// Work section carousel
const workTrack = document.getElementById('work-track');
const workPrev = document.querySelector('.work-nav-left');
const workNext = document.querySelector('.work-nav-right');

// Calculate how much to scroll based on card width and gap
const getWorkScrollAmount = () => {
  if (!workTrack) {
    return 0;
  }
  const card = workTrack.querySelector('.content-box');
  if (!card) {
    return 0;
  }
  const styles = window.getComputedStyle(workTrack);
  const gap = parseFloat(styles.columnGap || styles.gap || '0');
  const cardWidth = card.getBoundingClientRect().width;
  const cardsPerPage = window.matchMedia('(max-width: 768px)').matches ? 1 : 3;
  return (cardWidth + gap) * cardsPerPage;
};

// Scroll the work track 
const scrollWork = (direction) => {
  if (!workTrack) {
    return;
  }
  workTrack.scrollBy({
    left: direction * getWorkScrollAmount(),
    behavior: 'smooth'
  });
};

if (workPrev && workNext) {
  workPrev.addEventListener('click', () => scrollWork(-1));
  workNext.addEventListener('click', () => scrollWork(1));
}

// Scroll-triggered animations
const observerOptions = {
  threshold: 0.15,
  rootMargin: '0px 0px -50px 0px'
};

const animateOnScroll = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate-in');
      animateOnScroll.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe About section
const aboutSection = document.querySelector('.about');
if (aboutSection) {
  const aboutHeading = aboutSection.querySelector('h3');
  const aboutParagraphs = aboutSection.querySelectorAll('p');
  const aboutButtons = aboutSection.querySelectorAll('.button-wrapper');
  
  if (aboutHeading) animateOnScroll.observe(aboutHeading);
  aboutParagraphs.forEach(p => animateOnScroll.observe(p));
  aboutButtons.forEach(btn => animateOnScroll.observe(btn));
}

// Observe Experience section
const experienceSection = document.querySelector('.experience');
if (experienceSection) {
  const expHeadings = experienceSection.querySelectorAll('h1, h3');
  const expBoxes = experienceSection.querySelectorAll('.box');
  
  expHeadings.forEach(h => animateOnScroll.observe(h));
  expBoxes.forEach(box => animateOnScroll.observe(box));
}

// Observe Work section
const workSection = document.querySelector('.work');
if (workSection) {
  const workText = workSection.querySelector('.work-text');
  const workBoxes = workSection.querySelectorAll('.content-box');
  
  if (workText) animateOnScroll.observe(workText);
  workBoxes.forEach(box => animateOnScroll.observe(box));
}

// Observe Contact section
const contactSection = document.querySelector('.contact');
if (contactSection) {
  const contactHeading = contactSection.querySelector('h3');
  const contactParagraph = contactSection.querySelector('p');
  
  if (contactHeading) animateOnScroll.observe(contactHeading);
  if (contactParagraph) animateOnScroll.observe(contactParagraph);
}

// Observe Socials section
const socialsSection = document.querySelector('.socials');
if (socialsSection) {
  const socialLinks = socialsSection.querySelectorAll('a');
  socialLinks.forEach(link => {
    link.classList.add('animate-in');
  });
}

// Play showcase media on hover
document.querySelectorAll('.content-box').forEach(box => {
  const video = box.querySelector('.showcase-section video');
  const image = box.querySelector('.showcase-section img[data-animated-src]');

  if (video) {
    let thumbnailTime = null;

    const initThumbnail = () => {
      const pauseTime = video.dataset.pauseTime;
      thumbnailTime = pauseTime !== undefined ? parseFloat(pauseTime) : Math.random() * video.duration;
      video.currentTime = thumbnailTime;
      video.pause();
    };

    if (video.readyState >= 1) {
      initThumbnail();
    } else {
      video.addEventListener('loadedmetadata', initThumbnail, { once: true });
    }

    box.addEventListener('mouseenter', () => {
      video.play();
    });

    box.addEventListener('mouseleave', () => {
      video.pause();
      video.currentTime = thumbnailTime;
    });
  }

  if (image) {
    const animatedSrc = image.dataset.animatedSrc;
    const staticSrc = image.dataset.staticSrc || image.getAttribute('src');

    box.addEventListener('mouseenter', () => {
      if (animatedSrc) {
        image.src = animatedSrc;
      }
    });

    box.addEventListener('mouseleave', () => {
      if (staticSrc) {
        image.src = staticSrc;
      }
    });
  }

});
