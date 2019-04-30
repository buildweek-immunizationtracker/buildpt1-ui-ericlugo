/* <== MENU VARIABLES & LISTENERS ==> */
const menuOpen = document.querySelector('.open');
const menuClose = document.querySelector('.close');
const siteNav = document.querySelector('.site-nav');
// if open icon is clicked, change menu width to 100%
menuOpen.addEventListener('click', (event) => {
  siteNav.style.width = '100%';
});
// if close icon is clicked, change menu width to 0
menuClose.addEventListener('click', (event) => {
  siteNav.style.width = '0';
});

//TODO: separate out the call-tag filtering into a new class
/* <== BUTTON TOGGLE CLASSES AND LISTENERS ==> */
class Tabs {
  constructor(primaryClassName, secondaryClassName, tertiaryClassName) {
    // get a list of elements using the provided class name
    this.tabs = document.querySelectorAll(`${primaryClassName}`);
    // store tags in order to toggle them as well
    this.tags = document.querySelectorAll(`${tertiaryClassName}`);
    // convert the list into an array of TabLink objects
    this.tabs = Array.from(this.tabs).map((tab) => (tab = new TabLink(tab, secondaryClassName, this.tags)));
    // loop through array and assign a value to remember initial active tab
    this.tabs.forEach((tab) => {
      if (tab.tabElement.classList.contains('active')) this.currentSelection = tab.tabData;
    });
    // loop through array and disable inactive tabs
    this.tabs.forEach((tab) => {
      if (this.currentSelection === tab.tabData) tab.selectTab();
      else tab.deselectTab();
    });
    // loop through tags and deactivate as needed
    this.tags.forEach((tag) => {
      if (this.currentSelection === tag.dataset.tab) tag.style.display = 'inherit';
      else tag.style.display = 'none';
    });
    // adding event listener to body to handle click events for this class
    document.body.addEventListener('click', (event) => this.select(event));
  }
  select(event) {
    //check if event contains the correct class name for our action
    if (event.target.classList.contains('tab-link')) {
      //check to ensure not clicking on the active item
      if (event.target.dataset.tab !== this.currentSelection) {
        // update active tab listing
        this.currentSelection = event.target.dataset.tab;
        // loop through array and act based on what was clicked
        this.tabs.forEach((tab) => {
          if (this.currentSelection === tab.tabData) tab.selectTab();
          else tab.deselectTab();
        });
      }
    }
  }
}
class TabLink {
  constructor(tabElement, className, tags) {
    // store provided element locally
    this.tabElement = tabElement;
    //store provided tags for switch
    this.tags = tags;
    // store data-tab value of element for easy access
    this.tabData = this.tabElement.dataset.tab;
    // gather all items based on provided classname that match data-tab values
    this.cards = document.querySelectorAll(`${className}[data-tab = '${this.tabData}']`);
    // loop through array and create new objects
    this.cards = Array.from(this.cards).map((card) => new TabCard(card));
  }

  selectTab() {
    // activate selected item
    this.tabElement.classList.add('active');
    // activate all objects belonging to the set
    this.cards.forEach((card) => card.selectCard());
    // cycle through tags and activate/deactivate as needed
    this.tags.forEach((tag) => {
      if (this.tabData === tag.dataset.tab) tag.style.display = 'inherit';
      else tag.style.display = 'none';
    });
  }

  deselectTab() {
    // deactivates object
    this.tabElement.classList.remove('active');
    // deactivate all objects belonging to the set
    this.cards.forEach((card) => card.deselectCard());
  }
}
class TabCard {
  constructor(cardElement) {
    // store provided element locally
    this.cardElement = cardElement;
  }
  selectCard() {
    // change display setting in active item
    this.cardElement.style.display = 'inherit';
  }
  deselectCard() {
    // hide inactive item
    this.cardElement.style.display = 'none';
  }
}
const tabs = new Tabs('.tab-link', '.tab-item', '.call-tag');

/* <== SLIDER VARIABLES AND LISTENERS ==> */
