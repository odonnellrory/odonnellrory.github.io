const navToggle = document.querySelector(".nav-toggle");
const siteNav = document.querySelector("#site-nav");

if (navToggle && siteNav) {
  const closeMenu = () => {
    navToggle.setAttribute("aria-expanded", "false");
    navToggle.setAttribute("aria-label", "Open menu");
    siteNav.dataset.open = "false";
  };

  navToggle.addEventListener("click", () => {
    const isOpen = navToggle.getAttribute("aria-expanded") === "true";
    navToggle.setAttribute("aria-expanded", String(!isOpen));
    navToggle.setAttribute("aria-label", isOpen ? "Open menu" : "Close menu");
    siteNav.dataset.open = String(!isOpen);
  });

  siteNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      if (window.matchMedia("(max-width: 47.99rem)").matches) {
        closeMenu();
      }
    });
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeMenu();
      navToggle.focus();
    }
  });

  const desktopMedia = window.matchMedia("(min-width: 48rem)");
  const syncNavState = (event) => {
    if (event.matches) {
      siteNav.dataset.open = "true";
      navToggle.setAttribute("aria-expanded", "true");
    } else {
      closeMenu();
    }
  };

  syncNavState(desktopMedia);
  desktopMedia.addEventListener("change", syncNavState);
}
