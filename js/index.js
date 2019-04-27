// colors to use
let navBgColor = `#dddddd`;
let navTextColor = `#000000`;
let accentBtnBgColor = `#000000`;
let accentBtnTextColor = `#ffffff`;

// items to modify
const menuOpen = document.querySelector('.open');
const menuClose = document.querySelector('.close');
const siteNav = document.querySelector('.site-nav');
const navBarBranding = document.querySelector('.nav-bar .branding');
const navBranding = document.querySelector('.site-nav .nav-bar .branding');
const navLinks = document.querySelectorAll('.nav-links a');
const contactButton = document.querySelector('.contact li i');

menuOpen.addEventListener('click', (event) => {
  siteNav.style.width = '100%';
  navBarBranding.style.color = `${navBgColor}`;
  navBranding.style.color = `${navTextColor}`;
  navLinks.forEach((link) => (link.style.color = `${navTextColor}`));
  contactButton.style.backgroundColor = `${accentBtnBgColor}`;
  contactButton.style.color = `${accentBtnTextColor}`;
});
menuClose.addEventListener('click', (event) => {
  siteNav.style.width = '0';
  navBarBranding.style.color = `${navTextColor}`;
  navBranding.style.color = `${navBgColor}`;
  navLinks.forEach((link) => (link.style.color = `${navBgColor}`));
  contactButton.style.backgroundColor = `${navBgColor}`;
  contactButton.style.color = `${navBgColor}`;
});
