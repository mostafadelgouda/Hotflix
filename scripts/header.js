const home = document.querySelector("#home");
const home_expand = document.querySelector("#home-expand");
const catalog = document.querySelector("#catalog");
const catalog_expand = document.querySelector("#catalog-expand");
const pages = document.querySelector("#pages");
const pages_expand = document.querySelector("#pages-expand");
home.addEventListener("click", () => {
  home_expand.classList.toggle("d-none");
  catalog_expand.classList.add("d-none");
  pages_expand.classList.add("d-none");
});
catalog.addEventListener("click", () => {
  home_expand.classList.add("d-none");
  catalog_expand.classList.toggle("d-none");
  pages_expand.classList.add("d-none");
});
pages.addEventListener("click", () => {
  home_expand.classList.add("d-none");
  catalog_expand.classList.add("d-none");
  pages_expand.classList.toggle("d-none");
});
