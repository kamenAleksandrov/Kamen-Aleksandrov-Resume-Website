function toggleMenu() {
  const menu = document.querySelector(".menu-links");
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
