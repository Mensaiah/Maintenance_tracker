const sidebar = document.querySelector(".sm-sidebar");
const selected = document.querySelector("#selected");
const menu = document.querySelector(".menu");
const menuBtn = document.querySelector(".menu-btn");
const container = document.querySelector(".container");

let show = false;

menuBtn.addEventListener("click", () => {
  if (!show) {
    sidebar.classList.add("show");
    if (selected) {
      selected.classList.add("show");
    }

    menu.classList.add("show");

    show = true;
  }
});

container.addEventListener("click", () => {
  if (show) {
    sidebar.classList.remove("show");
    if (selected) {
      selected.classList.remove("show");
    }
    menu.classList.remove("show");

    show = false;
  }
});
