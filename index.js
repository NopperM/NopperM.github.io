let scrollingDown = true;  // Direction of the scroll
let isPaused = false;  // Whether we are in the paused state
let pauseTime = 3000;  // Pause for 3 seconds at top/bottom
let lastScrollTime = Date.now();  // Track the pause duration
let isUserScrolling = false;  // Flag to detect manual scroll

// Detect if the user is manually scrolling the page
window.addEventListener('scroll', function() {
  isUserScrolling = true;  // User started scrolling
  clearTimeout(scrollTimeout);  // Stop auto-scrolling if user is scrolling
  scrollTimeout = setTimeout(() => {
    isUserScrolling = false;  // After a delay, stop detecting user scroll
  }, 100);
});

function scrollPage() {
  if (isUserScrolling) return;  // Don't auto-scroll if user is scrolling

  if (!isPaused) {
    if (scrollingDown) {
      window.scrollBy(0, 2);  // Scroll down by 2px
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        scrollingDown = false;  // Change direction when bottom is reached
        isPaused = true;  // Pause for a while at the bottom
        lastScrollTime = Date.now();  // Reset the timestamp for the pause
      }
    } else {
      window.scrollBy(0, -2);  // Scroll up by 2px
      if (window.scrollY <= 0) {
        scrollingDown = true;  // Change direction when top is reached
        isPaused = true;  // Pause for a while at the top
        lastScrollTime = Date.now();  // Reset the timestamp for the pause
      }
    }
  } else {
    // Pause logic: Wait for 3 seconds before resuming auto-scroll
    if (Date.now() - lastScrollTime >= pauseTime) {
      isPaused = false;  // Resume scrolling after the pause
    }
  }

  requestAnimationFrame(scrollPage);  // Continue scrolling by requesting next frame
}

// Start the auto-scrolling
let scrollTimeout;
requestAnimationFrame(scrollPage);
