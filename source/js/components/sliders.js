import Swiper from "swiper";
import vars from "../_vars";
import {Navigation, Controller, Pagination, Scrollbar } from "swiper/modules";

const {parentSliders} = vars;

const mainSwiper = document.querySelector(".bg-slider");
const subSwiper = document.querySelector(".sub-slider");
const subPagination = subSwiper.querySelector(".sub-slider__pagination");
const subBar = subSwiper.querySelector(".sub-slider__bar");

function formatNumber(num) {
  return num < 10 ? '0' + num : num;
}

function updSwiperNumericPagination() {
  const swiperEl = this.el;
  const counterEl = subSwiper.querySelector(".swiper-counter");
  const currentSlideIndex = this.realIndex + 1;
  const totalSlides = swiperEl.slidesQuantity;

  if (counterEl) {
    const formattedCurrentSlideIndex = formatNumber(currentSlideIndex);
    const formattedTotalSlides = formatNumber(totalSlides);
    counterEl.innerHTML = '<span class="count">' + formattedCurrentSlideIndex + '</span><span class="total">' + formattedTotalSlides + "</span>";
  }

  // Обновление data-атрибутов на пользовательском элементе
  subBar.dataset.currentSlide = formatNumber(currentSlideIndex);
  subBar.dataset.totalSlides = formatNumber(totalSlides);
}

const subSlider = new Swiper(subSwiper.querySelector('.sub-slider__container'), {
  modules: [Navigation, Controller, Pagination, Scrollbar],
  slidesPerView: 3,
  spaceBetween: 20,
  speed: 1300,
  observer: true,
  observeParents: true,
  slideToClickedSlide: true,
  loop: true,
  loopedSlides: 3,
  allowTouchMove: false,

  scrollbar: {
    el: subBar && subBar,
    dragSize: 57, 
    draggable: true,
  },

  pagination: {
    el: subPagination && subPagination,
  },

  on: {
    init: function() {
      this.el.slidesQuantity = this.slides.length;
      updSwiperNumericPagination.call(this);
    },
    slideChange: updSwiperNumericPagination,
  },
});

const mainSlider = new Swiper(mainSwiper, {
  modules: [Controller],
  slidesPerView: 1,
  speed: 800,
  observer: true,
  observeParents: true,
  slideToClickedSlide: true,
  loop: true,
  loopedSlides: 3,
  allowTouchMove: false,
  breakpoints: {
    320: {
      spaceBetween: 10,
    },
    576: {
      spaceBetween: 20,
    },
  },
});

mainSlider.controller.control = subSlider;
subSlider.controller.control = mainSlider;

 
