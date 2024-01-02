"use strict";

require('es6-promise').polyfill();
import 'nodelist-foreach-polyfill';

import tabs from './modules/tabs';
import timer  from './modules/timer';
import modal  from './modules/modal';
import cards  from './modules/cards';
import forms  from './modules/forms';
import slider   from './modules/slider';
import calc from './modules/calc';


document.addEventListener('DOMContentLoaded', () => {

    tabs('.tabcontent', '.tabheader__items', '.tabheader__item', 'tabheader__item_active');
    timer('.timer', '2024-10-31');
    modal('[data-modal]', '.modal');
    cards();
    forms('form', '.modal');
    slider({
        container: '.offer__slider',
        wrapper: '.offer__slider-wrapper',
        inner: '.offset__slider-inner',
        slides: '.offer__slide',
        currentSlide: 'current',
        totalSlides: 'total',
        prev: '.offer__slider-prev',
        next: '.offer__slider-next'


    });
    calc();
});