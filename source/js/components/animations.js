import { gsap } from "gsap";
import vars from '../_vars';
import { CSSRulePlugin } from "gsap/CSSRulePlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(CSSRulePlugin);
gsap.registerPlugin(SplitText);
gsap.registerPlugin(ScrollTrigger);

const { header, footer } = vars;
const firstSection = document.querySelector('[data-gallery]');
const aboutSection = document.querySelector('[data-about]');
const infoSection = document.querySelector('[data-info]');
const socialSection = document.querySelector('[data-social]');
const contactsSection = document.querySelector('[data-contacts]');
const companySection = document.querySelector('[data-company]');
const teamSection = document.querySelector('[data-team]');

if (header) {
  const logo = document.querySelector(".header__inner .logo");
  const nav = document.querySelector(".main-nav");
  const btns = document.querySelector(".header__btns");

  gsap.timeline({ delay: .5 })
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
        barTotal = CSSRulePlugin.getRule(".custom-bar::after"),
        barDrag = bar.querySelector('.swiper-scrollbar-drag');

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
  .to(barDrag,{
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

if(aboutSection){
  //-----main-top
  const logo = aboutSection.querySelector('.main-top__logo'),
        title = aboutSection.querySelector('.title'),
        mainTop = aboutSection.querySelector('.main-top');
       
  const titleSplit = new SplitText(title, {
          type: "lines, chars",
          linesClass: "line",
        });

  //-----cards
  const cards = aboutSection.querySelector('.about-card'), /////---not use
        cardBefore = CSSRulePlugin.getRule(".about-card__title::before"),
        cardAfter = CSSRulePlugin.getRule(".about-card__title::after"),
        cardTitles = aboutSection.querySelectorAll('.about-card__title'),
        cardTexts = aboutSection.querySelectorAll('.about-card p'),
        cardImages = Array.from(aboutSection.querySelectorAll('.about-card__image')),
        cardCounts = Array.from(aboutSection.querySelectorAll('.about-card__count'));

  const cardTextsSplit = Array.from(cardTexts).map((cardText) => {
          return new SplitText(cardText, {
            type: "lines, words",
            linesClass: "line",
        });
  });

  const cardTitlesSplit = Array.from(cardTitles).map((cardTitle) => {
    return new SplitText(cardTitle, { type: "chars" });
  });      

  const  timeLine = gsap.timeline({
          scrollTrigger: {
          trigger: aboutSection,
          start: "top 60%",
          toggleActions: "play none none none",
          onEnter: () => {
            setTimeout(() => {
              mainTop.classList.add('animate');
            }, 900);
          },
          },
  });

  //----animation-main-top
        timeLine.from(titleSplit.lines, {
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
        .from(logo, {
          opacity: 0,
          duration: 0.5,
          ease: 'none'
        }, '-=0.4')

  //----animation-card     

  cardTextsSplit.forEach((textSplit) => {
    textSplit.lines.forEach((line, index) => {
      const lineWords = line.querySelectorAll('.line > div');
      timeLine.from(
        lineWords,
        {
          y: 100,
          opacity: 0,
          duration: 1,
          stagger: 0.1,
        },
        index * 0.3
      );
    });
  });

  timeLine.from(cardBefore, {
    cssRule: {
      opacity: 0,
      y: 50,
    },
    duration: 1,
    stagger: 0.2,
  }, .1);
  
  timeLine.from(cardAfter, {
    cssRule: {
      opacity: 0,
      y: 50,
    },
    duration: 1,
    stagger: 0.2,
  }, .2);
  
  cardTitlesSplit.forEach((textSplit, index) => {
    timeLine.from(textSplit.chars, {
      y: 100,
      opacity: 0,
      duration: .8,
      stagger: 0.1,
    }, index * 0.3);
  });

  cardImages.forEach((item, index) => {
    timeLine.from(item, {
        y: 100,
        opacity: 0,
        duration: .6,
        delay: 0.3 * index,
      }, .9)
  });

  cardCounts.forEach((item, index) => {
    timeLine.from(item, {
        y: -50,
        opacity: 0,
        duration: .6,
        delay: 0.4 * index,
      }, 1)
  });
}

if(infoSection){
  //-----main-top
  const logo = infoSection.querySelector('.main-top__logo'),
        title = infoSection.querySelector('.title'),
        mainTop = infoSection.querySelector('.main-top'),
        sliderItems = Array.from(infoSection.querySelectorAll('.swiper-slide'));
       
  const titleSplit = new SplitText(title, {
          type: "lines, chars",
          linesClass: "line",
        });

  const  timeLine = gsap.timeline({
          scrollTrigger: {
          trigger: infoSection,
          start: "top 60%",
          toggleActions: "play none none none",
          onEnter: () => {
            setTimeout(() => {
              mainTop.classList.add('animate');
            }, 800);
          },
          },
  });

  //----animation-main-top
        timeLine.from(titleSplit.lines, {
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
        .from(logo, {
          opacity: 0,
          duration: 0.5,
          ease: 'none'
        }, '-=0.4')
       
        sliderItems.forEach((item, index) => {
          timeLine.to(item, {
              translateY: 0,
              opacity: 1,
              duration: .7,
              ease: 'none',
              delay: 0.3 * index,
            }, .3)
        });
 
}

if(socialSection){
  //-----main-top
  const logo = socialSection.querySelector('.main-top__logo'),
        title = socialSection.querySelector('.title'),
        mainTop = socialSection.querySelector('.main-top'),
        socialItems = Array.from(socialSection.querySelectorAll('.social__link')),
        socialImage = socialSection.querySelector('.default-section__user'),
        text = socialSection.querySelector('.default-section__info .text'),
        infoText = socialSection.querySelector('.default-section__info p:not([class])'),
        cube = CSSRulePlugin.getRule(".default-section--about::before");
        
        
        const textSplit = new SplitText(text, {
          type: "lines, words",
          linesClass: "line",
        });

        const infoSplit = new SplitText(infoText, {
          type: "lines, words",
          linesClass: "line",
        });
       
        const titleSplit = new SplitText(title, {
                type: "lines, chars",
                linesClass: "line",
              });

        const timeLine = gsap.timeline({
                scrollTrigger: {
                trigger: socialSection,
                start: "top 60%",
                toggleActions: "play none none none",
                onEnter: () => {
                  setTimeout(() => {
                    mainTop.classList.add('animate');
                  }, 800);
                },
                },
        });

  //----animation-main-top
        timeLine.from(titleSplit.lines, {
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
        .from(logo, {
          opacity: 0,
          duration: 0.5,
          ease: 'none'
        }, '-=0.4')
       
        socialItems.forEach((item, index) => {
          timeLine.from(item, {
            opacity: 0,
            duration: .3,
            ease: 'none',
            delay: 0.3 * index,
          }, .5)
        });

        timeLine.from(socialImage, {
          opacity: 0,
          y:100,
          duration: .9
        }, .4);

        textSplit.lines.forEach((line, index) => {
            const lineWords = line.querySelectorAll('.line > div');
            timeLine.from(
              lineWords,
              {
                y: 100,
                opacity: 0,
                duration: .8,
                stagger: 0.1,
              },
              index * 0.3
            );
        }, 1.4);
       
        infoSplit.lines.forEach((line, index) => {
          const lineWords = line.querySelectorAll('.line > div');
          timeLine.from(
            lineWords,
            {
              y: 100,
              opacity: 0,
              duration: .8,
              stagger: 0.1,
            },
            0.5, index * 0.3
          );
      },);
}

if(contactsSection){
  const title = contactsSection.querySelector('.title'),
  text = contactsSection.querySelector('.first-section__wrapper p'),
  contactTitles = Array.from(contactsSection.querySelectorAll(".contacts__title")),
  contactLinks = Array.from(contactsSection.querySelectorAll(".contacts__link"));

  const titleSplit = new SplitText(title, {
    type: "lines, chars",
    linesClass: "line",
  });

  const textSplit = new SplitText(text, {
    type: "lines, words",
    linesClass: "line",
  });

  let tl = gsap.timeline();

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
  .from(textSplit.lines, {
    opacity:0,
    y:100,
    duration:0.5
  }, '-=1.8')
  .from(textSplit.words, {
    opacity: 0,
    y: 100,
    duration: 0.5,
    stagger: 0.02,
  }, '-=0.5')
    
  contactTitles.forEach((item, index) => {
    const split = new SplitText(item, {
      type: "lines, chars",
      linesClass: "line",
    });

    gsap.timeline({delay: 0.5}).from(split.chars, {
      opacity: 0,
      y: 100,
      duration: 0.2,
      stagger: 0.02,
      delay: 0.3 * index,
    })
  });

  contactLinks.forEach((item, index) => {
    const split = new SplitText(item, {
      type: "lines, chars",
      linesClass: "line",
    });
  
    const tl = gsap.timeline({ delay: 0.9 });

    tl.from(split.lines, {
      opacity: 0,
      y: 50,
      duration: 0.5,
      stagger: 0.1,
      delay: 0.3 * index,
    });
  
    tl.from(split.chars, {
      opacity: 0,
      y: 100,
      duration: 0.2,
      stagger: 0.01,
      delay: 0.3 * index,
    }, 0);
  });
}

if(companySection){
  const title = companySection.querySelector('.title'),
        texts = Array.from(companySection.querySelectorAll(".first-section__content .text")),
        slider = companySection.querySelector('.main-slider');
  
  const titleSplit = new SplitText(title, {
    type: "lines, chars",
    linesClass: "line",
  });

  let tl = gsap.timeline();

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
    
  texts.forEach((item, index) => {
    const split = new SplitText(item, {
      type: "lines, chars",
      linesClass: "line",
    });

    gsap.timeline({delay: 0.3}).from(split.chars, {
      opacity: 0,
      y: 100,
      duration: 0.2,
      stagger: 0.01,
      delay: .5 * index,
    })
  });

  const timeLine = gsap.timeline({
      scrollTrigger: {
      trigger: slider,
      start: 'top 95%',
      toggleActions: "play none none none",
      },
  });

  timeLine.from(slider, {
      translateY: 100,
      opacity: 0,
      duration: .7,
      ease: 'none',
  })
}

if(teamSection){
  //-----main-top
  const title = teamSection.querySelector('.title'),
        mainTop = teamSection.querySelector('.main-top');
       
  const titleSplit = new SplitText(title, {
          type: "lines, chars",
          linesClass: "line",
        });

  //-----cards
  const cardTitles = teamSection.querySelectorAll('.team-card .subtitle'),
        cardTexts = teamSection.querySelectorAll('.team-card__info'),
        cardImages = Array.from(teamSection.querySelectorAll('.team-card__image picture'));


  const cardTextsSplit = Array.from(cardTexts).map((cardText) => {
          return new SplitText(cardText, {
            type: "lines, words",
            linesClass: "line",
        });
  });

  const cardTitlesSplit = Array.from(cardTitles).map((cardTitle) => {
    return new SplitText(cardTitle, {
      type: "lines, words",
      linesClass: "line",
    });
  });

  const  timeLine = gsap.timeline({
          scrollTrigger: {
          trigger: teamSection,
          start: "top 60%",
          toggleActions: "play none none none",
          },
  });

  //----animation-main-top
        timeLine.from(titleSplit.lines, {
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

  //----animation-card     
    cardImages.forEach((item, index) => {
    timeLine.from(item, {
        y: 100,
        opacity: 0,
        duration: .6,
        delay: 0.3 * index,
      }, .3)
  });

  cardTextsSplit.forEach((textSplit, index) => {
    timeLine.from(textSplit.words, {
    y: 100,
          opacity: 0,
          duration: 1,
          stagger: 0.1,
    }, 0.4, index * 0.3)
  })
  
  cardTitlesSplit.forEach((textSplit, index) => {
    timeLine.from(textSplit.words, {
    y: 100,
          opacity: 0,
          duration: 1,
          stagger: 0.1,
    }, index * 0.3)
  })
}

if (footer) {
 
  const footerLogo = footer.querySelector(".footer-logo"),
        footerText = footer.querySelector(".footer__copyright"),
        footerTitle = footer.querySelector(".title"),
        footerLinks = Array.from(footer.querySelectorAll('.main-nav__item')),
        footerSocials = Array.from(footer.querySelectorAll(".footer__social li"));
        

  const titleSplit = new SplitText(footerTitle, {
        type: "lines, chars",
        linesClass: "line",
    });
  
    let tl;

    if (firstSection) {
      tl = gsap.timeline({
        scrollTrigger: {
          trigger: footer,
          start: "top 80%",
          toggleActions: "play none none none",
          onEnter: () => {
            setTimeout(() => {
              footerTitle.classList.add('animate');
            }, 400);
          },
        },
      });
    } else {
      tl = gsap.timeline();
      setTimeout(() => {
        footerTitle.classList.add('animate');
      }, 400);
    }
    
    tl.from(footerLogo, {
      opacity: 0,
      y: 50,
      duration: 1,
    })
    .from(titleSplit.chars, {
      opacity: 0,
      y: 100,
      duration: 0.5,
      stagger: 0.05,
    }, 0)

    .from(footerText,{
      opacity:0,
      x: 50,
      duration: .8,
    }, .8)

    footerLinks.forEach((item, index) => {
      tl.from(item, {
        y: 50,
        opacity: 0,
        duration: .8,
        ease: 'none',
        delay: 0.3 * index,
      }, 0.1)
    });

    footerSocials.forEach((item, index) => {
      tl.from(item, {
        opacity: 0,
        duration: .8,
        ease: 'none',
        delay: 0.3 * index,
      }, 0.2)
    });
}