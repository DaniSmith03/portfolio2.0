document.addEventListener('DOMContentLoaded', function () {
  const navLinks = document.querySelectorAll('.nav-link');
  const enterDiv = document.getElementById('enter');

  function updateActiveNavLink() {
    const currentHash = window.location.hash;
    navLinks.forEach((link) => {
      link.classList.remove('active');
    });
    if (currentHash === '') {
      // If at the top of the page, highlight the first menu item
      navLinks[0].classList.add('active');
    } else {
      const matchingLink = document.querySelector(
        `.nav-link[href="${currentHash}"]`
      );
      if (matchingLink) {
        matchingLink.classList.add('active');
      }
    }
  }

  function scrollToTarget(targetId) {
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: 'smooth',
      });
      history.pushState(null, null, targetId);
      updateActiveNavLink();
    }
  }

  // Initial call to set the active link on page load
  updateActiveNavLink();

  // Listen for hashchange events (e.g., when the user clicks on a link or uses the browser's back/forward buttons)
  window.addEventListener('hashchange', updateActiveNavLink);

  // Smooth scrolling for navigation links
  navLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href');
      scrollToTarget(targetId);
    });
  });

  // Smooth scrolling for .enter div
  enterDiv.addEventListener('click', () => {
    const targetId = enterDiv.getAttribute('href');
    scrollToTarget(targetId);
  });

  // Highlight the appropriate menu item when scrolling back to the top
  window.addEventListener('scroll', () => {
    if (window.scrollY === 0) {
      // At the top of the page, highlight the first menu item
      navLinks[0].classList.add('active');
    } else {
      // Remove the "active" class from all navigation links
      navLinks.forEach((link) => {
        link.classList.remove('active');
      });
    }
  });
});
