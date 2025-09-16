document.addEventListener("DOMContentLoaded", () => {
  const navLinks = document.querySelectorAll(".navigation ul li");
  const navDot = document.querySelector(".nav-dot");
  const navigation = document.querySelector(".navigation");
  const pageGlow = document.querySelector(".page-glow");

  // Check if all required elements exist
  if (!navLinks.length || !navDot || !navigation || !pageGlow) {
    console.error("Navigation elements not found for hover effect.");
    return;
  }

  // Function to move and show the dot
  const handleMouseEnter = (event) => {
    const link = event.currentTarget;

    // Calculate the horizontal center of the hovered list item
    const linkCenter = link.offsetLeft + link.offsetWidth / 2;

    // Move the dot to the calculated position and make it visible
    navDot.style.left = `${linkCenter}px`;
    navDot.style.opacity = "1";

    // Show the page glow effect
    pageGlow.classList.add("visible");
  };

  // Function to hide the dot
  const handleMouseLeave = () => {
    navDot.style.opacity = "0";

    // Hide the page glow effect
    pageGlow.classList.remove("visible");
  };

  // Add event listeners to each navigation link
  navLinks.forEach((link) => {
    link.addEventListener("mouseenter", handleMouseEnter);
  });

  // Add a single mouseleave event to the whole navigation area
  navigation.addEventListener("mouseleave", handleMouseLeave);
});
