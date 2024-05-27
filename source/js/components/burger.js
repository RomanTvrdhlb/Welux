import { disableScroll } from '../functions/disable-scroll';
import { enableScroll } from '../functions/enable-scroll';
import vars from '../_vars';

import {toggleClassInArray, toggleCustomClass, removeCustomClass, removeClassInArray, fadeIn, fadeOut, addCustomClass} from '../functions/customFunctions';
const {overlay, burger, mobileMenu, call, areasMenu, areasBtn, headerBtn, headerMenu} = vars;

const mobileMenuHandler = function(overlay, mobileMenu, burger) {
  burger.forEach((btn) => {
    btn.addEventListener('click', function(e){
      e.preventDefault();
      toggleCustomClass(mobileMenu);
      toggleClassInArray(burger);
      toggleCustomClass(overlay);
      btn.classList.contains('active') ? disableScroll() : enableScroll()

    })
  })
}

const hideMenuHandler = function(overlay, mobileMenu, burger) {
    removeCustomClass(mobileMenu);
    removeClassInArray(burger);
    removeCustomClass(overlay);
    enableScroll()
}

if (overlay) {
  mobileMenuHandler(overlay,mobileMenu,burger);
  overlay.addEventListener('click', function(e){
    e.target.classList.contains('overlay') ?
    hideMenuHandler(overlay,mobileMenu,burger) : null
  });
}

const asideMenu = document.querySelector('.dashboard-aside');
const asideBtn = document.querySelector('.dashboard__btn');
const asideClose = document.querySelector('.dashboard-aside__close');

if(asideMenu && asideClose){
  const links = document.querySelectorAll('.aside-nav__button');

  links.forEach(function(link){
    link.addEventListener('click', function(e){
      e.preventDefault();
      removeCustomClass(asideMenu, 'active');
    })
  })
  
  asideBtn.addEventListener('click', function(e){
    e.preventDefault();
    addCustomClass(asideMenu, 'active');
  })

  asideClose.addEventListener('click', function(e){
    e.preventDefault();
    removeCustomClass(asideMenu, 'active');
  })
}