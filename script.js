const menuMobileOpen = document.getElementById("menu-mobile-open");
const menuMobileClose = document.getElementById("menu-mobile-close");
const menuMobile = document.getElementById("menu-mobile");

menuMobileOpen.addEventListener("click", () => {
  menuMobile.classList.toggle("menu-opened");
});

menuMobileClose.addEventListener("click", () => {
  menuMobile.classList.toggle("menu-opened");
});