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

  // --- NAVIGATION DOT LOGIC ---
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

  // --- PROJECT CARD SCROLL ANIMATION ---
  const projectCards = document.querySelectorAll(".project-card");

  projectCards.forEach((card) => {
    gsap.fromTo(
      card,
      { autoAlpha: 0, y: 70, scale: 0.9 },
      {
        autoAlpha: 1,
        y: 0,
        scale: 1,
        duration: 0.7,
        ease: "power2.out",
        scrollTrigger: {
          trigger: card,
          start: "top 90%",
          end: "top 60%",
          scrub: 1,
        },
      },
    );
  });

  // --- COLUMN PARALLAX EFFECT ---
  const columns = document.querySelectorAll(".projects-column");
  columns.forEach((column, index) => {
    const yPercent = index % 2 === 0 ? -15 : 5;
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

  // --- PROJECT GRID FOCUS EFFECT ---
  const projectsGrid = document.querySelector(".projects-grid");

  if (projectsGrid) {
    projectsGrid.addEventListener("mouseenter", () => {
      projectsGrid.classList.add("is-hovered");
    });
    projectsGrid.addEventListener("mouseleave", () => {
      projectsGrid.classList.remove("is-hovered");
    });
  }

  // --- CUSTOM 'VIEW' CURSOR LOGIC ---
  const cursor = document.querySelector(".view-cursor");
  const hoverTriggerElements = document.querySelectorAll(
    ".project-link, .about-me-button",
  );

  const xTo = gsap.quickTo(cursor, "x", { duration: 0.6, ease: "power3" });
  const yTo = gsap.quickTo(cursor, "y", { duration: 0.6, ease: "power3" });

  window.addEventListener("mousemove", (e) => {
    xTo(e.clientX);
    yTo(e.clientY);
  });

  hoverTriggerElements.forEach((el) => {
    el.addEventListener("mouseenter", () => {
      gsap.to(cursor, {
        scale: 1,
        opacity: 1,
        duration: 0.4,
        ease: "power3.out",
      });
    });
    el.addEventListener("mouseleave", () => {
      gsap.to(cursor, {
        scale: 0,
        opacity: 0,
        duration: 0.4,
        ease: "power3.in",
      });
    });
  });

  // --- FLUID FOOTER ANIMATIONS ---
  const ctaButton = document.querySelector(".cta-button");
  const footerSection = document.querySelector(".footer-section");

  // Magnetic Button Effect for Footer CTA
  if (footerSection && ctaButton) {
    const strength = 100;
    footerSection.addEventListener("mousemove", (e) => {
      const rect = ctaButton.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      gsap.to(ctaButton, {
        x: (x / rect.width) * strength,
        y: (y / rect.height) * strength,
        duration: 1.2,
        ease: "power3.out",
      });
    });
    footerSection.addEventListener("mouseleave", () => {
      gsap.to(ctaButton, {
        x: 0,
        y: 0,
        duration: 1.2,
        ease: "elastic.out(1, 0.3)",
      });
    });
  }

  // Live Local Time
  const timeElement = document.querySelector("#local-time span:last-child");

  function updateTime() {
    if (timeElement) {
      const now = new Date();
      const timeString = now.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      });
      timeElement.textContent = timeString;
    }
  }
  setInterval(updateTime, 1000);
  updateTime(); // Initial call

  // --- REVISED AND OPTIMIZED PAGE TRANSITION LOGIC ---
  const aboutButton = document.querySelector(".about-me-button");
  const backButton = document.querySelector(".back-button");
  const transitionWipe = document.querySelector(".transition-wipe");
  const homePage = document.querySelector("#home-page");
  const aboutPage = document.querySelector(".about-page");
  const aboutText = document.querySelector(".about-main-text h2");

  // Variables to store the state before transitioning
  let savedScrollPosition = 0;
  let buttonRect = null;

  if (aboutButton && backButton && transitionWipe && homePage && aboutPage) {
    // --- Go to the About Page ---
    aboutButton.addEventListener("click", (e) => {
      e.preventDefault();

      // Save the button's position and current scroll position
      savedScrollPosition = window.scrollY;
      buttonRect = aboutButton.getBoundingClientRect();

      const timeline = gsap.timeline();
      timeline
        .set(transitionWipe, {
          transformOrigin: `${buttonRect.left + buttonRect.width / 2}px ${buttonRect.top + buttonRect.height / 2}px`,
        })
        .to(transitionWipe, {
          scale: 30,
          duration: 0.8, // Faster animation
          ease: "power3.inOut",
        })
        .set(homePage, { display: "none" }, ">-0.4") // Overlap animations more
        .set(aboutPage, { display: "block" }, "<")
        .from(aboutText, {
          y: 40,
          opacity: 0,
          duration: 0.6,
          ease: "power2.out",
        })
        .to(transitionWipe, {
          scale: 0,
          duration: 0.7, // Faster animation
          ease: "power3.out",
        });
    });

    // --- Go back to the Home Page ---
    backButton.addEventListener("click", (e) => {
      e.preventDefault();

      const timeline = gsap.timeline();
      timeline
        .set(transitionWipe, {
          // Use the SAVED button position for the return animation
          transformOrigin: `${buttonRect.left + buttonRect.width / 2}px ${buttonRect.top + buttonRect.height / 2}px`,
        })
        .to(transitionWipe, {
          scale: 30,
          duration: 0.8, // Faster animation
          ease: "power3.inOut",
        })
        .set(aboutPage, { display: "none" }, ">-0.4") // Overlap animations more
        .set(homePage, { display: "block" }, "<")
        .call(() => {
          // Instantly scroll back to the saved position
          lenis.scrollTo(savedScrollPosition, { immediate: true });
        })
        .to(transitionWipe, {
          scale: 0,
          duration: 0.7, // Faster animation
          ease: "power3.out",
        });
    });
  }
});
