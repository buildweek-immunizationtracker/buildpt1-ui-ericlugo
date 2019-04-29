// items to modify
const menuOpen = document.querySelector('.open');
const menuClose = document.querySelector('.close');
const siteNav = document.querySelector('.site-nav');

menuOpen.addEventListener('click', (event) => {
  siteNav.style.width = '100%';
});
menuClose.addEventListener('click', (event) => {
  siteNav.style.width = '0';
});
