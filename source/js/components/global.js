import {
  fadeIn,
  fadeOut,
  toggleCustomClass,
} from "../functions/customFunctions";

const dataHidden = document.querySelectorAll("[data-clip]");

if (dataHidden) {
  dataHidden.forEach(function (item) {
    const btn = item.querySelector("[data-clip-btn]");
    const box = item.querySelector("[data-clip-item]");

    const computedStyle = window.getComputedStyle(box);
    const originalHeight = parseInt(
      computedStyle.getPropertyValue("max-height")
    );

    btn.addEventListener("click", function (e) {
      e.preventDefault();
      const isOpen = box.getAttribute("data-clip-item") === "true";

      if (!isOpen) {
        box.style.maxHeight = box.scrollHeight + "px";
        toggleCustomClass(btn, "active");
        btn.innerHTML = 'hide';
        setTimeout(function () {
          box.style.overflow = "auto";
        }, 450);
      } else {
        box.style.maxHeight = originalHeight + "px";
        toggleCustomClass(btn, "active");
        btn.innerHTML = 'more';
        box.style.overflow = "hidden";
      }

      box.setAttribute("data-clip-item", !isOpen);
    });

    box.style.transition = "max-height 0.4s linear";
  });
}
