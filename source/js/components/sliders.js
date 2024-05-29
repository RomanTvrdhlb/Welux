import Swiper from "swiper";
import vars from "../_vars";
import {
  Navigation,
  Controller,
  Pagination,
  Scrollbar,
  Thumbs,
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
      speed: 1300,
      observer: true,
      observeParents: true,
      watchSlidesVisibility: true,
      watchSlidesProgress: true,
    }
  );

  var galleryBg = new Swiper(mainSwiper, {
    modules: [Thumbs, Pagination, Scrollbar],
    spaceBetween: 10,
    slidesPerView: 1,
    speed: 800,
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


  subSlider.on('click', (swiper, event) => {
    const clickedSlide = swiper.clickedSlide;
    const clickedIndex = swiper.clickedIndex;
    const visibleSlidesIndexes = swiper.visibleSlidesIndexes;

    if (clickedSlide) {
      if (clickedIndex === visibleSlidesIndexes[0]) {
        galleryBg.slidePrev();
      } else if (clickedIndex === visibleSlidesIndexes[visibleSlidesIndexes.length - 1]) {
        galleryBg.slideNext();
      }
    }
  });
}
