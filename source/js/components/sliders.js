import Swiper from "swiper";
import vars from "../_vars";
import {
  Navigation,
  Controller,
  Pagination,
  Scrollbar,
  Thumbs,
  EffectFade
} from "swiper/modules";

const { parentSliders } = vars;

if (parentSliders) {
  const mainSwiper = parentSliders.querySelector(".bg-slider");
  const subSwiper = parentSliders.querySelector(".sub-slider");
  const pagination = parentSliders.querySelector(".custom-pagination");
  const bar = parentSliders.querySelector(".custom-bar");

  function formatNumber(num) {
    return num < 10 ? "0" + num : num;
  }

  function updSwiperNumericPagination() {
    const swiperEl = this.el;
    const counterEl = parentSliders.querySelector(".swiper-counter");
    const currentSlideIndex = this.realIndex + 1;
    const totalSlides = swiperEl.slidesQuantity;

    if (counterEl) {
      const formattedCurrentSlideIndex = formatNumber(currentSlideIndex);
      const formattedTotalSlides = formatNumber(totalSlides);
      counterEl.innerHTML =
        '<span class="count">' +
        formattedCurrentSlideIndex +
        '</span><span class="total">' +
        formattedTotalSlides +
        "</span>";
    }

    bar.dataset.currentSlide = formatNumber(currentSlideIndex);
    bar.dataset.totalSlides = formatNumber(totalSlides);
  }

  var subSlider = new Swiper(
    subSwiper.querySelector(".sub-slider__container"),
    {
      modules: [Thumbs],
      spaceBetween: 20,
      slidesPerView: 3,
      freeMode: true,
      speed: 1000,
      observer: true,
      observeParents: true,
      watchSlidesVisibility: true,
      watchSlidesProgress: true,

      breakpoints:{
        320:{
          slidesPerView: 1.35,
        },
        480:{
          slidesPerView: 1.9,
        },
        768:{
          slidesPerView: 3,
        },
      },
    }
  );

  var galleryBg = new Swiper(mainSwiper, {
    modules: [Thumbs, Pagination, Scrollbar, EffectFade],
    effect: "fade",
    fadeEffect: {
      crossFade: true,
    },
    spaceBetween: 10,
    slidesPerView: 1,
    speed: 1500,
    observer: true,
    observeParents: true,

    thumbs: {
      swiper: subSlider,
    },

    pagination: {
      clickable: true,
      el: pagination && pagination,
    },

    scrollbar: {
      el: bar && bar,
      dragSize: 'auto',
    },

    on: {
      init: function () {
        this.el.slidesQuantity = this.slides.length;
        updSwiperNumericPagination.call(this);
      },
      slideChange: updSwiperNumericPagination,
    },
  });

  let activeSlide = null;

  subSlider.on('click', (swiper, event) => {
    const clickedSlide = swiper.clickedSlide;
  
    if (!activeSlide) {
      activeSlide = swiper.slides.find(slide => slide.classList.contains('swiper-slide-thumb-active'));
  
      if (!activeSlide) {
        console.error('Active slide not found');
        return;
      }
    }
  
    const clickedIndex = swiper.slides.indexOf(clickedSlide);
    const activeIndex = swiper.slides.indexOf(activeSlide);
  
    if (clickedSlide === activeSlide) {
      // Ничего не делаем, так как кликнутый слайд уже активен
      return;
    }
  
    if (clickedIndex > activeIndex) {
      // Прокручиваем вперед
      subSlider.slideNext();
    } else if (clickedIndex < activeIndex) {
      // Прокручиваем назад
      subSlider.slidePrev();
    }
  
    // Перезаписываем активный слайд
    activeSlide = clickedSlide;
  });
  
}
