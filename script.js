function toggleMenu() {
  const menu = document.querySelector(".mobile-nav-links");
  const icon = document.querySelector(".hamburger-icon");
  menu.classList.toggle("open");
  icon.classList.toggle("open");
}

function scrollToNextSection() {
  const sections = document.querySelectorAll(".section");

  // Find the current section
  let currentSectionIndex = -1;
  sections.forEach((section, index) => {
    const rect = section.getBoundingClientRect();

    if (
      rect.top <= window.innerHeight / 2 &&
      rect.bottom >= window.innerHeight / 2
    ) {
      currentSectionIndex = index;
    }
  });

  // Scroll to the next section
  if (currentSectionIndex !== -1 && currentSectionIndex < sections.length - 1) {
    sections[currentSectionIndex + 1].scrollIntoView({ behavior: "smooth" });
  }
}

function toggleTheme() {
  const body = document.body;
  let themeIcon = null;
  if (window.innerWidth <= 1200) {
    themeIcon = document.getElementById("theme-btn-image-mobile");
  } else {
    themeIcon = document.getElementById("theme-btn-image-desktop");
  }

  body.classList.toggle("dark-mode");

  if (body.classList.contains("dark-mode")) {
    themeIcon.src = "data/light_mode_64dp.png";
    themeIcon.alt = "Switch to Light Mode";
    themeIcon.title = "Switch to Light Mode";
  } else {
    themeIcon.src = "data/dark_mode_64dp.png";
    themeIcon.alt = "Switch to Dark Mode";
    themeIcon.title = "Switch to Dark Mode";
  }
}

// Apply system preference for dark mode on page load
document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;
  let themeIcon = null;
  if (window.innerWidth <= 1200) {
    themeIcon = document.getElementById("theme-btn-image-mobile");
  } else {
    themeIcon = document.getElementById("theme-btn-image-desktop");
  }

  if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
    body.classList.add("dark-mode");
    themeIcon.src = "data/light_mode_64dp.png";
    themeIcon.alt = "Switch to Light Mode";
    themeIcon.title = "Switch to Light Mode";
  } else {
    themeIcon.src = "data/dark_mode_64dp.png";
    themeIcon.alt = "Switch to Dark Mode";
    themeIcon.title = "Switch to Dark Mode";
  }
});

// Fade in animation
document.addEventListener("DOMContentLoaded", function () {
  const faders = document.querySelectorAll(".fade-in");

  const appearOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -100px 0px",
  };

  const appearOnScroll = new IntersectionObserver(function (
    entries,
    appearOnScroll
  ) {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) {
        return;
      } else {
        entry.target.classList.add("fade-in-visible");
        appearOnScroll.unobserve(entry.target);
      }
    });
  },
  appearOptions);

  faders.forEach((fader) => {
    appearOnScroll.observe(fader);
  });
});

// Hybrid scroll
const stickySections = [...document.querySelectorAll('.scroll_container')]

window.addEventListener('scroll', (e) => {
  for(let i = 0; i < stickySections.length; i++){
    transform(stickySections[i])
  }
})

function transform(section) {
  if (window.innerWidth > 1200) {
    const offsetTop = section.parentElement.offsetTop;
    const scrollSection = section.querySelector('.horizontal_scroll');

    let percentage = ((window.scrollY - offsetTop) / window.innerHeight) * 100;
    percentage = percentage < 0 ? 0 : percentage > 300 ? 300 : percentage;

    scrollSection.style.transform = `translate3d(${-(percentage)}vw, 0, 0)`;
  }
}

// Set height of the horizontal scroll container

/*
// JavaScript
function matchHeightToWidth() {
  // Get the reference element's width
  const referenceElement = document.getElementById('reference-element');
  const referenceWidth = referenceElement.offsetWidth;

  // Set the target element's height
  const targetElement = document.getElementById('target-element');
  targetElement.style.height = referenceWidth + 'px';
}

// Call the function on window load and resize
window.addEventListener('load', matchHeightToWidth);
window.addEventListener('resize', matchHeightToWidth);
*/

// remove hybrid scroll on mobile
function removeContentOnMobile() {
  if (window.innerWidth <= 1200) {
    const scroll_containers = document.querySelectorAll('.scroll_container');
    const sticky_wraps = document.querySelectorAll('.sticky_wrap');
    const horizontal_scrolls = document.querySelectorAll('.horizontal_scroll');
    
    scroll_containers.forEach(container => {
      while (container.firstChild) {
        container.parentNode.insertBefore(container.firstChild, container);
      }
      container.parentNode.removeChild(container);
    });

    sticky_wraps.forEach(wrap => {
      while (wrap.firstChild) {
        wrap.parentNode.insertBefore(wrap.firstChild, wrap);
      }
      wrap.parentNode.removeChild(wrap);
    });

    horizontal_scrolls.forEach(scroll => {
      while (scroll.firstChild) {
        scroll.parentNode.insertBefore(scroll.firstChild, scroll);
      }
      scroll.parentNode.removeChild(scroll);
    });
  }
}

window.addEventListener('load', removeContentOnMobile);
window.addEventListener('resize', removeContentOnMobile);