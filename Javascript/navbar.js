const navigationToggle = document.querySelector(".nav-toggle");
const primaryNavigation = document.getElementById("primary-navigation");

if (navigationToggle && primaryNavigation) {
  navigationToggle.addEventListener("click", () => {
    const isExpanded = navigationToggle.getAttribute("aria-expanded") === "true";
    navigationToggle.setAttribute("aria-expanded", String(!isExpanded));
    primaryNavigation.classList.toggle("is-open", !isExpanded);
  });

  primaryNavigation.addEventListener("click", (event) => {
    if (event.target instanceof HTMLAnchorElement) {
      navigationToggle.setAttribute("aria-expanded", "false");
      primaryNavigation.classList.remove("is-open");
    }
  });
}
