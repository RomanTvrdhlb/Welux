import {addCustomClass} from '../functions/customFunctions';
const preloader = document.querySelector('.preloader');

if(preloader){
    document.addEventListener("DOMContentLoaded", function () {
        setTimeout(function(){
            addCustomClass(preloader, 'loaded');
            window.preloaderLoaded = true;
        },1500)
    });
}