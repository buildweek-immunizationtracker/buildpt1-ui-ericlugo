/* <== NAVBAR VARIABLES & LISTENERS ==> */
function navbarSetup() {
  const joinOpen = document.querySelector('.action-buttons .join');
  const joinOpenCTA = document.querySelector('.home .header .scroll .join');
  const joinPopup = document.querySelector('.join-popup');
  const joinClose = document.querySelector('.join-close');
  // if join button is clicked add overlay and show popup box
  joinOpen.addEventListener('click', (event) => {
    joinPopup.classList.add('active');
    document.body.classList.add('overlay');
  });
  if (joinOpenCTA) {
    joinOpenCTA.addEventListener('click', (event) => {
      joinPopup.classList.add('active');
      document.body.classList.add('overlay');
    });
  }
  // if close button is clicked remove overlay and hide popup box
  joinClose.addEventListener('click', (event) => {
    joinPopup.classList.remove('active');
    document.body.classList.remove('overlay');
  });
}

/* <== MENU VARIABLES & LISTENERS ==> */
function menuSetup() {
  const menuOpen = document.querySelector('.open');
  const menuClose = document.querySelector('.close');
  const siteNav = document.querySelector('.site-nav');
  // if open icon is clicked, change menu width to 100%
  menuOpen.addEventListener('click', (event) => {
    siteNav.style.width = '100%';
    document.body.classList.add('overlay');
  });
  // if close icon is clicked, change menu width to 0
  menuClose.addEventListener('click', (event) => {
    siteNav.style.width = '0';
    document.body.classList.remove('overlay');
  });
}

/* <== BUTTON TOGGLE CLASSES & LISTENERS ==> */
class TabController {
  constructor(tabClassName, cardClassName) {
    // get a list of elements using the provided class name
    this.tabs = document.querySelectorAll(`.${tabClassName}`);
    // convert the list into an array of TabLink objects
    this.tabs = Array.from(this.tabs).map((tab) => (tab = new TabLink(tab, `.${cardClassName}`)));
    // loop through array and assign a value to remember initial active tab
    this.tabs.forEach((tab) => {
      if (tab.element.classList.contains('active')) this.currentSelection = tab.tabData;
    });
    // add listener to body for this class
    document.body.addEventListener('click', (event) => this.select(event, tabClassName));
  }
  select(event, className) {
    //check if event contains the correct class name for our action
    if (event.target.classList.contains(className)) {
      //check to ensure not clicking on the active item
      if (event.target.dataset.tab !== this.currentSelection) {
        // update stored value for active tab
        this.currentSelection = event.target.dataset.tab;
        // loop through array to select or deselect based on stored tab value
        this.tabs.forEach((tab) => {
          if (this.currentSelection === tab.tabData) tab.selectTab();
          else tab.deselectTab();
        });
      }
    }
  }
}
class TabLink {
  constructor(element, className) {
    // store provided element locally for use in the functions
    this.element = element;
    // store data-tab value of element for brevity and readability
    this.tabData = this.element.dataset.tab;
    // gather all matching items based on provided class name and data-tab values
    this.cards = document.querySelectorAll(`${className}[data-tab = '${this.tabData}']`);
    // loop through array and create new TabCard objects based on the previously stored ones
    this.cards = Array.from(this.cards).map((card) => new TabCard(card));
  }
  selectTab() {
    // activate selected item
    this.element.classList.add('active');
    // activate all objects belonging to the set
    this.cards.forEach((card) => card.selectCard());
  }
  deselectTab() {
    // deactivates selected object
    this.element.classList.remove('active');
    // deactivate all objects belonging to the set
    this.cards.forEach((card) => card.deselectCard());
  }
}
class TabCard {
  constructor(cardElement) {
    // store provided element locally to use in the functions
    this.cardElement = cardElement;
  }
  selectCard() {
    // add 'active' css class to show active item
    this.cardElement.classList.add('active');
  }
  deselectCard() {
    // remove 'active' css class to hide inactive item
    this.cardElement.classList.remove('active');
  }
}

/* <== SLIDER VARIABLES & LISTENERS ==> */
class CarouselController {
  constructor(carouselClassName, slideClassName, controlClassName) {
    // get a list of elements using the provided class name
    this.carousels = document.querySelectorAll(`.${carouselClassName}`);
    // convert the list into an array of Carousel objects
    this.carousels = Array.from(this.carousels).map((carousel) => (carousel = new Carousel(carousel, `.${slideClassName}`)));
    // create variable to store key/value pairs of what index matches a given item
    this.indexList = {};
    // go through the array and populate the object based on each item
    this.carousels.forEach((carousel, index) => {
      this.indexList[`${carousel.tabData}`] = index;
    });
    // add listener to body for this class
    document.body.addEventListener('click', (event) => this.select(event, controlClassName));
  }
  select(event, controlClassName) {
    // check if event contains the correct class name for our action
    if (event.target.classList.contains(controlClassName)) {
      // store the event tag value for brevity and readability
      this.eventKey = this.indexList[`${event.target.dataset.tab}`];
      // trigger functions based on which kind of target was clicked
      if (event.target.classList.contains('prev')) this.carousels[this.eventKey].prev();
      else if (event.target.classList.contains('next')) this.carousels[this.eventKey].next();
    }
  }
}
class Carousel {
  constructor(element, className) {
    // store provided element locally for use in the functions
    this.element = element;
    // store data-tab value of element for brevity and readability
    this.tabData = this.element.dataset.tab;
    // gather all matching items based on provided class name and data-tab values
    this.slides = document.querySelectorAll(`${className}[data-tab = '${this.tabData}']`);
    // loop through array and create new Slide objects based on the previously stored ones
    this.slides = Array.from(this.slides).map((slide) => new Slide(slide));
    // Loop through array and store a value based on which item is active.
    this.slides.forEach((slide, index) => {
      if (slide.element.classList.contains('active')) this.currentSlide = index + 1;
    });
  }
  next() {
    // deselect the currently stored slide
    this.slides[this.currentSlide - 1].deselect();
    // update the slide index up one
    this.currentSlide++;
    // if index is greater than array length go around
    if (this.currentSlide > this.slides.length) this.currentSlide = 1;
    // select currently stored slide
    this.slides[this.currentSlide - 1].select();
  }
  prev() {
    // deselect the currently stored slide
    this.slides[this.currentSlide - 1].deselect();
    // update the slide index down one
    this.currentSlide--;
    // if index is less than one go around
    if (this.currentSlide < 1) this.currentSlide = this.slides.length;
    // select currently stored slide
    this.slides[this.currentSlide - 1].select();
  }
}
class Slide {
  constructor(element) {
    // store provided element locally to use in the functions
    this.element = element;
  }
  select() {
    // add 'active' css class to show active item
    this.element.classList.add('active');
  }
  deselect() {
    // remove 'active' css class to hide inactive item
    this.element.classList.remove('active');
  }
}

/* <== FOOTER UPDATE ON LOAD ==> */
function footerSetup() {
  const currentDate = new Date();
  const options = { year: 'numeric' };
  const dateString = new Intl.DateTimeFormat('en-US', options).format(currentDate);
  const copyright = document.querySelector('.copyright');
  copyright.innerHTML = dateString;
}

/* <== OBJECT INIT & FUNCTION CALLS ==> */
const tabs = new TabController('tab-link', 'carousel');
const carouselController = new CarouselController('tab-link', 'slide', 'arrow');
navbarSetup();
menuSetup();
footerSetup();
