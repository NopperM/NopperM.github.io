document.getElementById('sidebar').addEventListener('scroll', function() {
    const sidebar = this;
    const scrollPercentage = (sidebar.scrollTop + sidebar.clientHeight) / sidebar.scrollHeight * 100;
    
    if (scrollPercentage >= 70) { // Trigger at 70% scroll
      setTimeout(function() {
        window.location.href = 'https://google.com/'; // Replace with your URL
      }, 1000); // Redirect after 1 second (adjust delay as needed)
    }
  });