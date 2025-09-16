// --- SCROLL ANIMATION LOGIC ---
document.addEventListener("DOMContentLoaded", () => {
  const heroSection = document.querySelector(".hero-section");
  const contentSection = document.querySelector(".content-section");

  // Ensure sections exist before adding logic
  if (!heroSection || !contentSection) {
    console.error("Scroll sections not found.");
    return;
  }

  let isAnimating = false;
  let currentSection = 0; // 0 for hero, 1 for content
  const animationDuration = 1500; // 1.5 seconds

  const handleScroll = (event) => {
    if (isAnimating) {
      return;
    }

    // Scrolling down
    if (event.deltaY > 0 && currentSection === 0) {
      isAnimating = true;
      heroSection.classList.add("scrolled");
      contentSection.classList.add("visible");
      currentSection = 1;
      setTimeout(() => {
        isAnimating = false;
      }, animationDuration);
    }
    // Scrolling up
    else if (event.deltaY < 0 && currentSection === 1) {
      isAnimating = true;
      heroSection.classList.remove("scrolled");
      contentSection.classList.remove("visible");
      currentSection = 0;
      setTimeout(() => {
        isAnimating = false;
      }, animationDuration);
    }
  };

  window.addEventListener("wheel", handleScroll);
});
