import Swiper from "swiper";
import vars from "../_vars";
import { Pagination, Scrollbar, Thumbs, EffectFade } from "swiper/modules";

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

  function findActiveSlide(slides) {
    return slides.find(slide => slide.classList.contains('swiper-slide-thumb-active'));
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
    spaceBetween: 10,
    slidesPerView: 1,
    speed: 1500,
    observer: true,
    observeParents: true,

    fadeEffect: {
      crossFade: true,
    },

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

  function handleResize() {
    if (window.innerWidth > 768) {
      let activeSlide = findActiveSlide(subSlider.slides);
      subSlider.on('click', (swiper, event) => {
        const clickedSlide = swiper.clickedSlide;
      
        if (!activeSlide) {
          activeSlide = findActiveSlide(swiper.slides);
      
          if (!activeSlide) {
            return;
          }
        }
        const activeIndex = swiper.slides.indexOf(activeSlide);
        const clickedIndex = swiper.slides.indexOf(clickedSlide);
        
        if (clickedSlide === activeSlide) {
          return;
        }
      
        if (clickedIndex > activeIndex) {
          subSlider.slideNext();
        } else if (clickedIndex < activeIndex) {
          subSlider.slidePrev();
        }
      
        activeSlide = clickedSlide;
      });
    } else {
      subSlider.off('click');
    }
  }

    handleResize();
    window.addEventListener('resize', handleResize);
}
