  let idleTime = 0;

  // Increment idle time every second
  const idleInterval = setInterval(() => {
    idleTime++;
    if (idleTime > 5) { // If idle for more than 5 seconds
      autoScroll();
    }
  }, 1000);

  // Reset idle time on user activity
  const resetIdleTime = () => {
    idleTime = 0;
  };

  // Listen for user activity
  document.addEventListener("mousemove", resetIdleTime);
  document.addEventListener("keydown", resetIdleTime);
  document.addEventListener("scroll", resetIdleTime);

  // Auto-scroll function
  const autoScroll = () => {
    const scrollStep = 2; // Pixels to scroll per frame
    const scrollInterval = 10; // Milliseconds between frames
    const scrollAnimation = setInterval(() => {
      if (window.scrollY + window.innerHeight >= document.body.scrollHeight) {
        clearInterval(scrollAnimation); // Stop scrolling at the bottom
      } else {
        window.scrollBy(0, scrollStep);
      }
    }, scrollInterval);
  };
