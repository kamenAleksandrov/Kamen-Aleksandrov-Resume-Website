// Purpose: This file contains the JavaScript code for the website.

// This function is used to toggle the mobile navigation menu when the
// hamburger icon is clicked.
function toggleMenu() {
  const menu = document.querySelector(".mobile-nav-links");
  const icon = document.querySelector(".hamburger-icon");
  menu.classList.toggle("open");
  icon.classList.toggle("open");
}

// This function is used to scroll to the next section when the down arrow is clicked.
// The original idea was to have only one arrow element that would scroll to the next
// section and it would move with the user as they scrolled.
// However, i couldn't get the arrow to move and be clickable at the same time.
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

// This function is used to toggle the theme of the website between light and dark mode.
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

// Apply system preference for dark/light mode on page load
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

window.addEventListener("scroll", (e) => {
  const stickySections = [...document.querySelectorAll(".scroll_container")];
  for (let i = 0; i < stickySections.length; i++) {
    transform(stickySections[i]);
  }
});

function transform(section) {
  if (window.innerWidth > 1200) {
    const offsetTop = section.parentElement.offsetTop;
    const scrollSection = section.querySelector(".horizontal_scroll");

    let percentage = ((window.scrollY - offsetTop) / window.innerHeight) * 100;
    percentage = percentage < 0 ? 0 : percentage > 300 ? 300 : percentage;

    scrollSection.style.transform = `translate3d(${-percentage}vw, 0, 0)`;
  }
}

// Set height of the horizontal scroll container
// Having trouble with this function
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

// Remove hybrid scroll on mobile
function removeHybridScrollOnMobile() {
  if (window.innerWidth <= 1200) {
    const scroll_containers = document.querySelectorAll(".scroll_container");
    const sticky_wraps = document.querySelectorAll(".sticky_wrap");
    const horizontal_scrolls = document.querySelectorAll(".horizontal_scroll");

    scroll_containers.forEach((container) => {
      while (container.firstChild) {
        container.parentNode.insertBefore(container.firstChild, container);
      }
      container.parentNode.removeChild(container);
    });

    sticky_wraps.forEach((wrap) => {
      while (wrap.firstChild) {
        wrap.parentNode.insertBefore(wrap.firstChild, wrap);
      }
      wrap.parentNode.removeChild(wrap);
    });

    horizontal_scrolls.forEach((scroll) => {
      while (scroll.firstChild) {
        scroll.parentNode.insertBefore(scroll.firstChild, scroll);
      }
      scroll.parentNode.removeChild(scroll);
    });
  }
}

window.addEventListener("load", removeHybridScrollOnMobile);
window.addEventListener("resize", removeHybridScrollOnMobile);

// Add hybrid scroll on desktop
function addHybridScrollOnDesktop() {
  // Check if the window width is greater than 1200px and if the scroll
  // container doesn't exist. It would add infinite scroll containers is not checked.
  if (
    window.innerWidth > 1200 &&
    document.querySelectorAll(".scroll_container").length <= 0
  ) {
    let hybridScrollClassNameArray = [
      "scroll_container",
      "sticky_wrap",
      "horizontal_scroll",
    ];

    const wrapped = document.getElementById("wrapped");

    hybridScrollClassNameArray.forEach((element) => {
      let newDiv = document.createElement("div");
      newDiv.className = element;
      wrapped.parentNode.insertBefore(newDiv, wrapped);
      newDiv.appendChild(wrapped);
    });
  }
}

window.addEventListener("resize", addHybridScrollOnDesktop);
