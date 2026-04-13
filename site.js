(() => {
  const map = {
    "index.html": "home",
    "schedule.html": "schedule",
    "program-outcomes.html": "outcomes",
    showcase: "showcase",
    "showcase.html": "showcase",
    faq: "faq",
    "faq.html": "faq",
  };

  const pathname = window.location.pathname || "";
  const last = pathname.split("/").filter(Boolean).pop() || "index.html";
  const key = pathname.includes("/projects/") ? "showcase" : map[last] || (last === "index.html" ? "home" : "home");

  const active = document.querySelector(`[data-nav="${key}"]`);
  if (active) active.classList.add("active");

  const siteHeader = document.querySelector(".site-header");
  if (siteHeader) {
    const updateHeaderState = () => {
      if (window.scrollY > 20) {
        siteHeader.classList.add("scrolled");
      } else {
        siteHeader.classList.remove("scrolled");
      }
    };

    updateHeaderState();
    window.addEventListener("scroll", updateHeaderState, { passive: true });
  }

  const navToggle = document.getElementById("nav-toggle");
  const primaryNav = document.getElementById("primary-nav");
  if (navToggle && primaryNav && siteHeader) {
    const closeNav = () => {
      siteHeader.classList.remove("is-nav-open");
      navToggle.setAttribute("aria-expanded", "false");
      navToggle.setAttribute("aria-label", "Open menu");
      document.body.classList.remove("nav-open");
    };

    const openNav = () => {
      siteHeader.classList.add("is-nav-open");
      navToggle.setAttribute("aria-expanded", "true");
      navToggle.setAttribute("aria-label", "Close menu");
      document.body.classList.add("nav-open");
    };

    navToggle.addEventListener("click", () => {
      if (siteHeader.classList.contains("is-nav-open")) closeNav();
      else openNav();
    });

    primaryNav.querySelectorAll("a").forEach((a) => {
      a.addEventListener("click", closeNav);
    });

    window.addEventListener("keydown", (event) => {
      if (event.key === "Escape") closeNav();
    });

    window.addEventListener(
      "resize",
      () => {
        if (window.innerWidth > 768) closeNav();
      },
      { passive: true }
    );
  }

  const revealItems = document.querySelectorAll(".reveal-on-scroll");
  if (revealItems.length > 0) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.18,
        rootMargin: "0px 0px -10% 0px",
      }
    );

    revealItems.forEach((item) => observer.observe(item));
  }

  const heroRevealItems = document.querySelectorAll("[data-hero-reveal]");
  if (heroRevealItems.length > 0) {
    window.requestAnimationFrame(() => {
      heroRevealItems.forEach((item) => item.classList.add("is-visible"));
    });
  }

  const posterTriggers = document.querySelectorAll("[data-poster-open]");
  if (posterTriggers.length > 0) {
    const closePoster = (modal) => {
      modal.hidden = true;
      document.body.classList.remove("modal-open");
    };

    posterTriggers.forEach((trigger) => {
      trigger.addEventListener("click", () => {
        const modalId = trigger.getAttribute("data-poster-open");
        if (!modalId) return;
        const modal = document.getElementById(modalId);
        if (!modal) return;
        modal.hidden = false;
        document.body.classList.add("modal-open");
      });
    });

    document.querySelectorAll("[data-poster-close]").forEach((button) => {
      button.addEventListener("click", () => {
        const modal = button.closest(".poster-modal");
        if (modal) closePoster(modal);
      });
    });

    document.querySelectorAll(".poster-modal").forEach((modal) => {
      modal.addEventListener("click", (event) => {
        if (event.target === modal) closePoster(modal);
      });
    });

    window.addEventListener("keydown", (event) => {
      if (event.key !== "Escape") return;
      document.querySelectorAll(".poster-modal").forEach((modal) => {
        if (!modal.hidden) closePoster(modal);
      });
    });
  }
})();

