// progress bar CSS styles
import './index.css';

/**
 * Custom progress bar for Owl Carousel
 * @author K. Grigoryan
 */
function carouselProgressBar() {
  const carouselWithProgressBar = $('[data-owl-progressbar]');
  const progressBarElClassName = 'owl-carousel-progressbar';

  if (!carouselWithProgressBar.length) return;

  // Create progress bars for one or multiple carousels
  $.each(carouselWithProgressBar, function() {
    const carouselEl = $(this);

    // Create progress bar and scroller DOM elements.
    const progressBarEl = document.createElement('div');
    const progressBarElScroller = document.createElement('span');

    progressBarEl.className = progressBarElClassName;
    progressBarEl.appendChild(progressBarElScroller);

    carouselEl.after(progressBarEl);

    // 2. Listen for carousel initialization, change and resize events and apply progress bar calculations.
    $(carouselEl).on('initialized.owl.carousel', owlData =>
      handleProgressBarChange(progressBarElScroller, owlData)
    );
    $(carouselEl).on('resized.owl.carousel', owlData =>
      handleProgressBarChange(progressBarElScroller, owlData)
    );
    $(carouselEl).on('translate.owl.carousel', owlData =>
      handleProgressBarChange(progressBarElScroller, owlData)
    );
  });
}

/**
 * Simulate carousel's progress by styling scroller element width and left margin
 *
 * @param {HTMLElement} progressBarElScroller - scroller DOM element
 * @param {Object} carouselData - carousel's current state information
 */
function handleProgressBarChange(progressBarElScroller, carouselData) {
  progressBarElScroller.style.width = `${(100 / carouselData.item.count) *
    carouselData.page.size}%`;
  progressBarElScroller.style.marginLeft = `${(carouselData.item.index /
    carouselData.item.count) *
    100}%`;
}

carouselProgressBar();
