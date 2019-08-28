/**
 * Custom progress bar for Owl Carousel
 * @author K. Grigoryan
 *
 * @todo: Add custom selectors support
 * @todo: Add jQuery function like solution
 * @todo: Add 'loop' prop warning
 */
class carouselProgressBar {
  /**
   * @param {HTMLElement} carouselEl - carousel DOM element
   */
  constructor(carousel) {
    // vars
    this.carousel = carousel;
    this.progressBarElClassName = 'owl-carousel-progressbar';

    // progress bar elements
    this.progressBarEl;
    this.progressBarElScroller;

    // checkers
    this.isValidElement;
    this.isjQueryLoaded;

    // initialize progress bars instances
    this.initialize();
  }

  /**
   * Check if provided carousel element is valid DOM element (node).
   */
  checkCarouselElIsValidNode() {
    const isValidElement =
      this.carousel instanceof Element || this.carousel instanceof HTMLDocument;

    if (!isValidElement) {
      console.error(
        'Provided carousel is not a valid DOM element. Please provide valid DOM element (not an jQuery instance).'
      );
    }

    this.isValidElement = isValidElement;
  }

  /**
   * Check if jQuery is available.
   */
  checkjQuery() {
    const isjQueryLoaded = window.jQuery;

    if (!isjQueryLoaded) {
      console.error(
        'jQuery is not loaded. Please attach jQuery or call OwlCarousel ProgressBar script after it.'
      );
    }

    this.isjQueryLoaded = window.jQuery;
  }

  /**
   * Create progress bar and scroller DOM elements.
   */
  createAndAppendProgressBarEl() {
    this.progressBarEl = document.createElement('div');
    this.progressBarElScroller = document.createElement('span');

    this.progressBarEl.className = this.progressBarElClassName;
    this.progressBarEl.appendChild(this.progressBarElScroller);

    this.styleProgressBarsElements();

    this.carousel.parentNode.insertBefore(
      this.progressBarEl,
      this.carousel.nextSibling
    );
  }

  /**
   * Add nescessary CSS to progress bar and scroller DOM elements.
   */
  styleProgressBarsElements() {
    // progress bar element
    this.progressBarEl.style.position = 'relative';
    this.progressBarEl.style.height = '2px';
    this.progressBarEl.style.backgroundColor = '#f0f0f0';
    this.progressBarEl.style.borderRadius = '5px';
    this.progressBarEl.style.marginTop = '10px';
    this.progressBarEl.style.marginBottom = '10px';

    // scroller element
    this.progressBarElScroller.style.position = 'absolute';
    this.progressBarElScroller.style.top = 0;
    this.progressBarElScroller.style.right = 0;
    this.progressBarElScroller.style.left = 0;
    this.progressBarElScroller.style.height = '2px';
    this.progressBarElScroller.style.maxWidth = '100%';
    this.progressBarElScroller.style.borderRadius = '5px';
    this.progressBarElScroller.style.backgroundColor = '#313131';
    this.progressBarElScroller.style.transition =
      'margin-left 0.25s ease-in-out';
  }

  /**
   * Listen for carousel initialization, change and resize events and apply progress bar calculations.
   */
  reactToCarouselChanges() {
    const carouseljQueryInstance = $(this.carousel);

    carouseljQueryInstance.on(
      'initialized.owl.carousel resized.owl.carousel translate.owl.carousel',
      owlData => this.handleProgressBarChange(owlData)
    );
  }

  /**
   * Create progress bar and add carousel event listeners.
   */
  createProgressBarAndListenForChanges() {
    if (!this.isValidElement || !this.isjQueryLoaded) return;

    this.createAndAppendProgressBarEl();
    this.reactToCarouselChanges();
  }

  /**
   * Simulate carousel's progress by styling scroller element width and left margin.
   *
   * @param {Object} carouselData - carousel's current state information
   */
  handleProgressBarChange(carouselData) {
    this.progressBarElScroller.style.width = `${(100 /
      carouselData.item.count) *
      carouselData.page.size}%`;

    this.progressBarElScroller.style.marginLeft = `${(carouselData.item.index /
      carouselData.item.count) *
      100}%`;
  }

  /**
   * Initialize all processes.
   */
  initialize() {
    this.checkCarouselElIsValidNode();
    this.checkjQuery();
    this.createProgressBarAndListenForChanges();
  }
}

/**
 * Create progress bars for one or multiple carousels
 */
(function() {
  const carouselWithProgressBar = document.querySelectorAll(
    '[data-owl-progressbar]'
  );

  if (!carouselWithProgressBar.length) return;

  carouselWithProgressBar.forEach(
    carousel => new carouselProgressBar(carousel)
  );
})();
