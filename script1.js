'use strict';

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnOpenModal = document.querySelectorAll('.btn--show-modal');
const btnCloseModal = document.querySelector('.btn--close-modal');

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnOpenModal.forEach(btn => btn.addEventListener('click', openModal));
btnCloseModal.addEventListener('click', closeModal);
document.addEventListener('keydown', function (e) {
  //console.log(e.key);
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

btnScrollTo.addEventListener('click', function () {
  // const s1coords = section1.getBoundingClientRect();
  // console.log(s1coords);

  // console.log(window.pageXOffset, window.pageYOffset);

  // window.scrollTo({
  //   top : s1coords.top + window.pageYOffset,
  //   left : s1coords.left + window.pageXOffset,
  //   behavior : 'smooth'
  // });
  // const id = '#section--1'
  // document.querySelector(id).scrollIntoView({behavior : 'smooth'})
  section1.scrollIntoView({ behavior: 'smooth' });
});

document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();
  if (e.target.classList.contains('nav__link')) {
    //console.log(e.target.getAttribute('href'));
    const id = e.target.getAttribute('href');
    //console.log(document.querySelector(id));
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});
const tabs = document.querySelectorAll('.operations__tab');
const tabContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');
//console.log(tabContainer);
tabContainer.addEventListener('click', function (e) {
  //console.log(e.target);
  const clicked = e.target.closest('.operations__tab');
  console.log(clicked);
  //console.log(e.target === clicked);
  if (!clicked) return;
  tabs.forEach(t => t.classList.remove('operations__tab--active'));
  tabsContent.forEach(c => c.classList.remove('operations__content--active'));

  const num = clicked.dataset.tab;
  //console.log(num);

  clicked.classList.add('operations__tab--active');
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});

const nav = document.querySelector('.nav__links');
nav.addEventListener('mouseover', function (e) {
  e.preventDefault();
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    //console.log(e.target);
    const tar = link.closest('.nav__links').querySelectorAll('.nav__link');
    //console.log(tar);
    const logo = document.querySelector('.nav__logo');
    tar.forEach(ch => {
      if (link !== ch) ch.style.opacity = 0.5;
      //console.log(ch);
    });
    logo.style.opacity = 0.5;
  }
});

nav.addEventListener('mouseout', function (e) {
  e.preventDefault();
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    //console.log(e.target);
    const tar = link.closest('.nav').querySelectorAll('.nav__link');
    //console.log(tar);
    const logo = document.querySelector('.nav__logo');
    tar.forEach(ch => {
      if (link !== ch) ch.style.opacity = 1;
      //console.log(ch);
    });
    logo.style.opacity = 1;
  }
});

const header = document.querySelector('.header');
const navs = document.querySelector('.nav');

const revealHead = function (entries) {
  //console.log(entries);
  entries.forEach(entry => {
    //console.log(entry.isIntersecting);
    if (!entry.isIntersecting) navs.classList.add('sticky');
    else navs.classList.remove('sticky');
  });
  //navs.classList.add('sticky');
};

const options = {
  root: null,
  threshold: 0,
};
const headerObserver = new IntersectionObserver(revealHead, options);
headerObserver.observe(header);

const allSecctions = document.querySelectorAll('.section');
const secReveal = function (entries, observer) {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    //console.log(entry.target);
    else entry.target.classList.remove('section--hidden');
    observer.unobserve(entry.target);
  });
};

const options1 = {
  root: null,
  threshold: 0.2,
};
const secReader = new IntersectionObserver(secReveal, options1);
allSecctions.forEach(sec => {
  secReader.observe(sec);
  sec.classList.add('section--hidden');
});
const allImages = document.querySelectorAll('.features__img');
const imgReveal = function (entries) {
  entries.forEach(entry => {
    //console.log(entry.target);
    entry.target.classList.remove('lazy-img');
  });
};

const imgReader = new IntersectionObserver(imgReveal, {
  root: null,
  threshold: 0.15,
});
allImages.forEach(img => imgReader.observe(img));

const slider = document.querySelector('.slider');
const slides = document.querySelectorAll('.slide');
const btnLeft = document.querySelector('.slider__btn--left');
const btnRight = document.querySelector('.slider__btn--right');
// slider.style.transform = 'scale(0.4) translateX(-800px)';
// slider.style.overflow = 'visible';
const dotContainer = document.querySelector('.dots');

let curSlide = 0;
const maxSlide = slides.length;

slides.forEach((_, i) => {
  dotContainer.insertAdjacentHTML(
    'beforeend',
    `<button class="dots__dot" data-slide="${i}"></button>`
  );
});

const activateDot = function (slide) {
  document
    .querySelectorAll('.dots__dot')
    .forEach(s => s.classList.remove('dots__dot--active'));
  document
    .querySelector(`.dots__dot[data--slide="${slide}"]`)
    .classList.add('dots__dot--active');
};

//slider.insertAdjacentHTML('beforeend', `<button class="dots__dot" data-slide='1'></button>`)

const goToSlide = function (slide) {
  slides.forEach((s, i) => {
    s.style.transform = `translateX(${100 * (i - slide)}%)`;
  });
};
const nextSlide = function () {
  if (curSlide === maxSlide - 1) curSlide = 0;
  else curSlide++;

  goToSlide(curSlide);
  activateDot(curSlide);
};

// const movRight = function(){
//   if(curSlide === maxSlide-1) curSlide = 0;
//   else curSlide++;

//   movSlide(curSlide);
// }
const prevSlide = function () {
  if (curSlide === 0) {
    curSlide = maxSlide - 1;
  } else curSlide--;

  goToSlide(curSlide);
  activateDot(curSlide);
};
// const movLeft = function(){
//   if(curSlide === 0) {
//     curSlide === maxSlide-1;
//   }else curSlide--;

//   movSlide(curSlide)
// }
btnRight.addEventListener('click', nextSlide);
btnLeft.addEventListener('click', prevSlide);
window.addEventListener('keydown', function (e) {
  console.log(e.key);
  if (e.key === 'ArrowRight') nextSlide();
  if (e.key === 'ArrowLeft') prevSlide();
});

dotContainer.addEventListener('click', function (e) {
  if (e.target.classList.contains('dots__dot')) {
    console.log(e.target.dataset);
    const { slide } = e.target.dataset;
    console.log(slide);
    goToSlide(slide);
    activateDot(slide);
  }
});
const nums =[100, 101, 102, 110, 120];
// for (let i of nums){
//   const res = String(i).split('');
//   const num1 = res.filter(j => j > 0);
//   console.log(num1.join(' '))
// }
const num1 = nums.map(n => {
  n[0]
});
console.log(num1);

