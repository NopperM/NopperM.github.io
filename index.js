let scrollingDown = true;  // Direction of the scroll
let isPaused = false;  // Whether we are in the paused state
let pauseTime = 3000;  // Pause for 3 seconds at top/bottom
let lastScrollTime = Date.now();  // Track the pause duration
let isUserScrolling = false;  // Flag to detect manual scroll
let scrollTimeout;  // Define scrollTimeout

// Detect if the user is manually scrolling the page
window.addEventListener('scroll', function() {
  isUserScrolling = true;  // User started scrolling
  clearTimeout(scrollTimeout);  // Stop auto-scrolling if user is scrolling
  scrollTimeout = setTimeout(() => {
    isUserScrolling = false;  // After a delay, stop detecting user scroll
    requestAnimationFrame(scrollPage);  // Resume auto-scrolling
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
requestAnimationFrame(scrollPage);

document.getElementById('main-content').addEventListener('scroll', function() {
  const sidebar = this;
  // Check if scrolled to the bottom of the sidebar
  if (sidebar.scrollTop + sidebar.clientHeight >= sidebar.scrollHeight - 10) { // -10 for a small threshold
    setTimeout(function() {
      window.location.href = 'https://example.com/new-page.html'; // Replace with your URL
    }, 1000); // Redirect after 1 second (adjust as needed)
  }
});