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

document.addEventListener('DOMContentLoaded', function () {
  const card = document.querySelector('.about-me-bio .card');
  const flipButton = document.getElementById('flip-button');
  const returnButton = document.getElementById('return-button');
  const image = document.querySelector('.about-me-image img');
  function flipCard() {
    card.classList.toggle('flipped');
    updateCardContent();
    updateQuote();
  }

  function updateCardContent() {
    if (card.classList.contains('flipped')) {
      image.src = './images/party_image.png';
      document
        .querySelector('.original-img')
        .classList.replace('original-img', 'alt');
    } else {
      image.src = './images/daniHeadshot.png';
      document.querySelector('.alt').classList.replace('alt', 'original-img');
    }
  }

  function updateQuote() {
    if (card.classList.contains('flipped')) {
      document.querySelector('.block-quote').innerHTML =
        "“ Be who you are and say what you feel, because those who mind don't matter, and those who matter don't mind. ”";
      document.querySelector('.author-quote').innerHTML = '-Dr. Seuss';
    } else {
      document.querySelector('.block-quote').innerHTML =
        '“ All Limitations Are Self Imposed. ”';
      document.querySelector('.author-quote').innerHTML =
        '-Oliver Wendell Holmes';
    }
  }

  flipButton.addEventListener('click', flipCard);
  returnButton.addEventListener('click', flipCard);
});

//function to raise the block quote with scroll
window.addEventListener('scroll', function () {
  // Get the position of the "about-me" section
  const aboutMeSection = document.querySelector('.about-me');
  const aboutMeSectionRect = aboutMeSection.getBoundingClientRect();

  // Check if the section is in the viewport
  if (
    aboutMeSectionRect.top < window.innerHeight &&
    aboutMeSectionRect.bottom > 0
  ) {
    // Apply the "raised" class to the block quote
    document.querySelector('.block-quote-container').classList.add('raised');
  } else {
    // Remove the "raised" class when the section is not in view
    document.querySelector('.block-quote-container').classList.remove('raised');
  }
});

//NavBar Responsive

const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('navToggle');
const fullNav = document.getElementById('fullNav');
const mobileNav = document.querySelector('.mobileNav');

// Function to toggle the navigation bar and hamburger menu
function toggleNav() {
  navbar.classList.toggle('active');
}

// Add a scroll event listener to toggle the navigation bar
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    fullNav.classList.replace('nav', 'fullNav');
    // fullNav.classList.add('inactive');
  } else {
    navbar.classList.replace('fullNav', 'nav');
  }
  if (window.scrollY == 0) {
    fullNav.classList.replace('fullNav', 'nav');
    // fullNav.classList.add('inactive');
  }
});

// Add a click event listener to the hamburger menu
navToggle.addEventListener('click', toggleNav);

// Add a click event listener to close the navigation when a link is clicked
fullNav.addEventListener('click', () => {
  if (navbar.classList.contains('active')) {
    toggleNav();
  }
});

navbar.addEventListener('click', () => {
  if (mobileNav.classList.contains('mobileNav')) {
    console.log('navbar click');
    mobileNav.classList.toggle('mobileNav');
    mobileNav.classList.toggle('m-active');
  } else {
    mobileNav.classList.toggle('m-active');
    mobileNav.classList.add('mobileNav');
  }
});

function closeWindow() {
  if (mobileNav.classList.contains('mobileNav')) {
    console.log('navbar click');
    mobileNav.classList.toggle('mobileNav');
    mobileNav.classList.toggle('m-active');
  } else {
    mobileNav.classList.toggle('m-active');
    mobileNav.classList.add('mobileNav');
  }
}
mobileNav.addEventListener('click', closeWindow);

// console.log(window.scrollY);

//contactForm
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (event) => {
  event.preventDefault();

  // Get form data

  emailjs.sendForm('service_8bkxw16', 'template_sp3r1nc', contactForm).then(
    function (response) {
      contactForm.reset();
      console.log('SUCCESS!', response.status, response.text);
    },
    function (error) {
      console.log('FAILED...', error);
    }
  );
});
