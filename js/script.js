"use strict";

const getTabs = require('./modules/tabs');
const getTimer = require('./modules/timer');
const getModal = require('./modules/modal');
const getCards = require('./modules/cards');
const getForms = require('./modules/forms');
const getSlider = require('./modules/slider');
const getCalc = require('./modules/calc');

document.addEventListener('DOMContentLoaded', () => {

    getTabs();
    getTimer();
    getModal();
    getCards();
    getForms();
    getSlider();
    getCalc();

});