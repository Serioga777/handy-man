const revealTargets = document.querySelectorAll("[data-reveal]");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.2 }
);

revealTargets.forEach((target, index) => {
  if (!target.style.getPropertyValue("--reveal-delay")) {
    target.style.setProperty("--reveal-delay", `${index * 60}ms`);
  }
  observer.observe(target);
});

const navToggle = document.querySelector("[data-nav-toggle]");
const mobileNav = document.querySelector("[data-mobile-nav]");
const navCloseTargets = document.querySelectorAll("[data-nav-close]");
const mobileNavPanel = mobileNav?.querySelector(".mobile-nav-panel");

if (navToggle && mobileNav && mobileNavPanel) {
  let lastActive = null;

  const getFocusable = () =>
    Array.from(
      mobileNavPanel.querySelectorAll(
        'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
      )
    ).filter((el) => el.offsetParent !== null);

  const onKeyDown = (event) => {
    if (event.key === "Escape") {
      event.preventDefault();
      closeNav();
      return;
    }

    if (event.key !== "Tab") return;

    const focusables = getFocusable();
    if (focusables.length === 0) return;

    const first = focusables[0];
    const last = focusables[focusables.length - 1];

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
      return;
    }

    if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  };

  const openNav = () => {
    lastActive = document.activeElement;
    document.documentElement.classList.add("nav-open");
    mobileNav.setAttribute("aria-hidden", "false");
    navToggle.setAttribute("aria-expanded", "true");
    document.addEventListener("keydown", onKeyDown);

    const focusables = getFocusable();
    focusables[0]?.focus();
  };

  const closeNav = () => {
    document.documentElement.classList.remove("nav-open");
    mobileNav.setAttribute("aria-hidden", "true");
    navToggle.setAttribute("aria-expanded", "false");
    document.removeEventListener("keydown", onKeyDown);
    lastActive?.focus?.();
  };

  navToggle.addEventListener("click", () => {
    if (document.documentElement.classList.contains("nav-open")) {
      closeNav();
      return;
    }
    openNav();
  });

  navCloseTargets.forEach((target) => target.addEventListener("click", closeNav));

  // Close after navigation for a snappy mobile experience.
  mobileNav.querySelectorAll("a[href]").forEach((link) =>
    link.addEventListener("click", () => {
      closeNav();
    })
  );
}
