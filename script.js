document.addEventListener("DOMContentLoaded", () => {
  // --- SMOOTH SCROLL SETUP (LENIS) ---
  const lenis = new Lenis();

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);

  // --- INTEGRATE GSAP SCROLLTRIGGER WITH LENIS ---
  gsap.registerPlugin(ScrollTrigger);

  lenis.on("scroll", ScrollTrigger.update);

  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });
  gsap.ticker.lagSmoothing(0);

  // --- NAVIGATION DOT LOGIC (UNCHANGED) ---
  const navLinks = document.querySelectorAll(".navigation ul li");
  const navDot = document.querySelector(".nav-dot");
  const navigation = document.querySelector(".navigation");
  const pageGlow = document.querySelector(".page-glow");

  if (navLinks.length && navDot && navigation && pageGlow) {
    const handleMouseEnter = (event) => {
      const link = event.currentTarget;
      const linkCenter = link.offsetLeft + link.offsetWidth / 2;
      navDot.style.left = `${linkCenter}px`;
      navDot.style.opacity = "1";
      pageGlow.classList.add("visible");
    };

    const handleMouseLeave = () => {
      navDot.style.opacity = "0";
      pageGlow.classList.remove("visible");
    };

    navLinks.forEach((link) => {
      link.addEventListener("mouseenter", handleMouseEnter);
    });
    navigation.addEventListener("mouseleave", handleMouseLeave);
  }

  // --- REVISED: PROJECT CARD SCROLL ANIMATION ---
  const projectCards = document.querySelectorAll(".project-card");

  // Animate each project card individually
  projectCards.forEach((card) => {
    gsap.fromTo(
      card,
      {
        // "from" state
        autoAlpha: 0, // Hides the element (opacity: 0, visibility: hidden)
        y: 70, // Starts 70px down
        scale: 0.9, // Starts slightly smaller
      },
      {
        // "to" state
        autoAlpha: 1,
        y: 0,
        scale: 1,
        duration: 0.7,
        ease: "power2.out",
        scrollTrigger: {
          trigger: card,
          start: "top 90%", // Begins animation when the card's top is 90% from the viewport's top
          end: "top 60%", // Finishes animation when it reaches 60%
          scrub: 1, // Smoothly links the animation to the scrollbar
        },
      },
    );
  });

  // Keep the parallax effect on the columns for a more dynamic feel
  const columns = document.querySelectorAll(".projects-column");
  columns.forEach((column, index) => {
    const yPercent = index % 2 === 0 ? -15 : 5; // Adjust values for desired parallax intensity

    gsap.to(column, {
      yPercent: yPercent,
      ease: "none",
      scrollTrigger: {
        trigger: ".projects-grid",
        start: "top bottom",
        end: "bottom top",
        scrub: 0.8,
      },
    });
  });
});
