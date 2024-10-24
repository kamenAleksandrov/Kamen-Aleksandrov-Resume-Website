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
document.addEventListener("DOMContentLoaded", function() {
  const faders = document.querySelectorAll('.fade-in');

  const appearOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -100px 0px"
  };

  const appearOnScroll = new IntersectionObserver(function(entries, appearOnScroll) {
      entries.forEach(entry => {
          if (!entry.isIntersecting) {
              return;
          } else {
              entry.target.classList.add('fade-in-visible');
              appearOnScroll.unobserve(entry.target);
          }
      });
  }, appearOptions);

  faders.forEach(fader => {
      appearOnScroll.observe(fader);
  });
});
