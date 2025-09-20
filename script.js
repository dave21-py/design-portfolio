document.addEventListener("DOMContentLoaded", () => {
  // --- SMOOTH SCROLL SETUP (LENIS) ---
  const lenis = new Lenis();
  gsap.registerPlugin(ScrollTrigger);
  lenis.on("scroll", ScrollTrigger.update);
  gsap.ticker.add((time) => lenis.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);

  // --- NAVIGATION DOT LOGIC ---
  const navLinks = document.querySelectorAll(".navigation ul li");
  const navDot = document.querySelector(".nav-dot");
  const navigation = document.querySelector(".navigation");

  if (navLinks.length && navDot && navigation) {
    const handleMouseEnter = (event) => {
      const link = event.currentTarget;
      const linkCenter = link.offsetLeft + link.offsetWidth / 2;
      navDot.style.left = `${linkCenter}px`;
      navDot.style.opacity = "1";
    };
    const handleMouseLeave = () => (navDot.style.opacity = "0");
    navLinks.forEach((link) =>
      link.addEventListener("mouseenter", handleMouseEnter),
    );
    navigation.addEventListener("mouseleave", handleMouseLeave);
  }

  // --- PROJECT ANIMATIONS & CURSOR ---
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

  const columns = document.querySelectorAll(".projects-column");
  columns.forEach((column, index) => {
    const yPercent = index % 2 === 0 ? -15 : 5;
    gsap.to(column, {
      yPercent,
      ease: "none",
      scrollTrigger: {
        trigger: ".projects-grid",
        start: "top bottom",
        end: "bottom top",
        scrub: 0.8,
      },
    });
  });

  const projectsGrid = document.querySelector(".projects-grid");
  if (projectsGrid) {
    projectsGrid.addEventListener("mouseenter", () =>
      projectsGrid.classList.add("is-hovered"),
    );
    projectsGrid.addEventListener("mouseleave", () =>
      projectsGrid.classList.remove("is-hovered"),
    );
  }

  const cursor = document.querySelector(".view-cursor");
  const hoverTriggerElements = document.querySelectorAll(
    ".project-link, .about-me-button, .about-cta-button, .cta-button",
  );
  const xTo = gsap.quickTo(cursor, "x", { duration: 0.6, ease: "power3" });
  const yTo = gsap.quickTo(cursor, "y", { duration: 0.6, ease: "power3" });
  window.addEventListener("mousemove", (e) => {
    xTo(e.clientX);
    yTo(e.clientY);
  });
  hoverTriggerElements.forEach((el) => {
    el.addEventListener("mouseenter", () =>
      gsap.to(cursor, {
        scale: 1,
        opacity: 1,
        duration: 0.4,
        ease: "power3.out",
      }),
    );
    el.addEventListener("mouseleave", () =>
      gsap.to(cursor, {
        scale: 0,
        opacity: 0,
        duration: 0.4,
        ease: "power3.in",
      }),
    );
  });

  // --- LIVE LOCAL TIME ---
  const timeElement = document.querySelector("#local-time span:last-child");
  function updateTime() {
    if (timeElement) {
      const now = new Date();
      timeElement.textContent = now.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      });
    }
  }
  setInterval(updateTime, 1000);
  updateTime();

  // --- NEW & IMPROVED PAGE TRANSITION LOGIC ---
  const aboutButton = document.querySelector(".about-me-button");
  const backButton = document.querySelector(".back-button");
  const transitionWipe = document.querySelector(".transition-wipe");
  const homePage = document.querySelector("#home-page");
  const aboutPage = document.querySelector(".about-page");

  if (aboutButton && backButton && transitionWipe && homePage && aboutPage) {
    let savedScrollPosition = 0;
    let buttonRect = null;

    aboutButton.addEventListener("click", (e) => {
      e.preventDefault();
      savedScrollPosition = window.scrollY;
      buttonRect = aboutButton.getBoundingClientRect();

      const pageContentToAnimate = [
        ".about-header",
        ".about-hero-text h1",
        ".about-hero-globe",
        ".about-intro",
        ".about-services",
        ".about-footer",
      ];

      gsap.set(pageContentToAnimate, { opacity: 0, y: 30 });

      const tl = gsap.timeline({
        onStart: () => lenis.stop(), // Stop scroll during transition
      });

      tl.set(transitionWipe, {
        transformOrigin: `${buttonRect.left + buttonRect.width / 2}px ${buttonRect.top + buttonRect.height / 2}px`,
        backgroundColor: "#1a1a1a", // Start color black
      })
        .to(transitionWipe, {
          scale: 30,
          duration: 0.6,
          ease: "power3.inOut",
        })
        .to(
          transitionWipe,
          {
            backgroundColor: "#4f46e5", // Animate to blue
            duration: 0.4,
            ease: "none",
          },
          "-=0.5",
        )
        .set(homePage, { display: "none" })
        .set(aboutPage, { display: "block" })
        .to(transitionWipe, {
          // Simulate the black screen from the video before revealing content
          backgroundColor: "#000000",
          duration: 0.2,
        })
        .to(transitionWipe, {
          opacity: 0,
          duration: 0.5,
          ease: "power2.out",
          onComplete: () => {
            lenis.start(); // Re-enable scroll
            lenis.scrollTo(0, { immediate: true }); // Scroll to top of new page
          },
        })
        .to(
          pageContentToAnimate,
          {
            opacity: 1,
            y: 0,
            stagger: 0.1,
            duration: 0.8,
            ease: "power3.out",
          },
          "-=0.6",
        );
    });

    backButton.addEventListener("click", (e) => {
      e.preventDefault();
      const tl = gsap.timeline({
        onStart: () => lenis.stop(),
      });

      tl.set(transitionWipe, {
        transformOrigin: `50% 50%`, // Center of screen
        opacity: 1,
        scale: 0,
        backgroundColor: "#4f46e5",
      })
        .to(transitionWipe, {
          scale: 30,
          duration: 0.6,
          ease: "power3.inOut",
        })
        .set(aboutPage, { display: "none" })
        .set(homePage, { display: "block" })
        .call(() => {
          lenis.start();
          lenis.scrollTo(savedScrollPosition, { immediate: true });
        })
        .to(transitionWipe, {
          transformOrigin: `${buttonRect.left + buttonRect.width / 2}px ${buttonRect.top + buttonRect.height / 2}px`,
          scale: 0,
          duration: 0.7,
          ease: "power3.out",
        });
    });
  }
});
