import { gsap } from "gsap";
import vars from '../_vars';
import { CSSRulePlugin } from "gsap/CSSRulePlugin";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(CSSRulePlugin);
gsap.registerPlugin(SplitText);
// gsap.registerPlugin(ScrollTrigger);

const { header } = vars;
const firstSection = document.querySelector('[data-gallery]');

if (header) {
  const logo = document.querySelector(".header__inner .logo");
  const nav = document.querySelector(".main-nav");
  const btns = document.querySelector(".header__btns");

  gsap.timeline()
    .to(logo, {
      opacity: 1,
      duration: 2,
    })
    .to([nav, btns], {
      opacity: 1,
      duration: 3,
    }, "-=1.5");
}

if (firstSection) {
  const tl = gsap.timeline();

  const title = firstSection.querySelector(".title");
  const titleSplit = new SplitText(title, {
    type: "lines, chars",
    linesClass: "line",
  });

  const subtitle = firstSection.querySelector(".subtitle");
  const subtitleSplit = new SplitText(subtitle, {
    type: "lines, words",
    linesClass: "line",
  });

  const mainBtn = firstSection.querySelector('.first-section__inner .main-btn'),
        mainBtnText = mainBtn.querySelector('span');

  const aside = firstSection.querySelector('.first-section__aside'),
        asideText = firstSection.querySelector('.first-section__text'),
        asideLine = CSSRulePlugin.getRule(".first-section__aside::before"),
        socialItems = Array.from(aside.querySelectorAll('.social__item'));

  const bar = firstSection.querySelector('.custom-bar'),
        barBg = bar.querySelector('.custom-bar__bg'),
        barCurrent = CSSRulePlugin.getRule(".custom-bar::before"),
        barTotal = CSSRulePlugin.getRule(".custom-bar::after");

  const slider = firstSection.querySelector('.sub-slider'),
        sliderLine = CSSRulePlugin.getRule(".sub-slider::before"),
        sliderItems = Array.from(slider.querySelectorAll('.sub-slider__slide')),
        sliderCount = slider.querySelector('.count'),
        sliderTotal = slider.querySelector('.total'),
        bullets = Array.from(slider.querySelectorAll('.swiper-pagination-bullet'));

  tl.from(titleSplit.lines, {
    opacity: 0,
    y: 100,
    duration: 0.5,
  }, 0)
  .from(titleSplit.chars, {
    opacity: 0,
    y: 100,
    duration: 0.5,
    stagger: 0.05,
  }, 0)
  .from(subtitleSplit.words, {
    opacity: 0,
    y: 100,
    duration: 0.6,
    stagger: 0.05,
  }, 0.6)
  .to(mainBtn, {
    bottom: 0,
    duration: 0.3,
  }, '-=1.2')
  .to(mainBtnText, {
    opacity: 1,
    duration: 1,
  }, '-=0.8');

  socialItems.forEach((item, index) => {
    gsap.timeline({ delay: .7 })
      .from(item, {
        opacity: 0,
        duration: 1.4,
        ease: 'none',
        delay: 0.3 * index,
      })
      .to(asideLine, {
        cssRule: {
          height: 242,
        },
        duration: 1,
      }, '-=1.5')
      .to(asideText, {
        opacity: 1,
        duration: 2,
        ease: 'none',
      }, '-=0.7');
  });

  gsap.timeline({ delay: .7 })
  .to(barBg,{
    width: '100%',
    duration: 1,
  })
  .to(bar.querySelector('.swiper-scrollbar-drag'),{
    opacity: 1,
    duration: 1,
  }, '-=0.7')
  .from(barCurrent, {
    cssRule: {
      opacity: 0,
    },
    duration: 2,
  }, '-=0.9')
  .from(barTotal, {
    cssRule: {
      opacity: 0,
    },
    duration: 2,
  }, '-=1.5')

  sliderItems.forEach((item, index) => {
    gsap.timeline({ delay: .9 })
      .to(sliderLine, {
          cssRule: {
            height: 106,
          },
          duration: .6,
          ease: 'none',
      })
      .to(item, {
        translateY: 0,
        duration: .4,
        ease: 'none',
        delay: 0.3 * index,
      }, '-=0.5')
      .to(sliderCount,{
        opacity: 1,
        duration: 1.5,
        ease: 'none',
      }, '-=0.1')
      .to(sliderTotal,{
        opacity: 1,
        ease: 'none',
        duration: 1.5,
      }, '-=1')
  });
  bullets.forEach((item, index) => {
    gsap.to(item, {
      opacity: 1,
      duration: .3,
      ease: 'none',
      delay: 0.3 * index,
    }, 1.5)
  });
}

