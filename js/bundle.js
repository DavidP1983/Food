/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/calc.js":
/*!****************************!*\
  !*** ./js/modules/calc.js ***!
  \****************************/
/***/ ((module) => {


function calc() {
    // Calc

    const resultParent = document.querySelector('.calculating__result');
    let sex, height, weight, age, ratio;

    function calcTotal() {
        if (localStorage.getItem('sex')) {
            sex = localStorage.getItem('sex');
            setActiveClass('#gender div', `#${sex}`);
        } else {
            sex = 'female';
        }

        if (localStorage.getItem('ratio')) {
            ratio = localStorage.getItem('ratio');
            const id = localStorage.getItem('id');
            setActiveClass('.calculating__choose_big div', `#${id}`);
        } else {
            ratio = 1.375;
        }

        const result = document.querySelector('.calculating__result span');
        if (!sex || !height || !weight || !age || !ratio) {
            result.textContent = '____';
            return;
        }
        if (sex === 'female') {
            result.textContent = Math.ceil((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
        } else {
            result.textContent = Math.ceil((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);
        }
    }

    calcTotal();


    function setActiveClass(selector, attribut) {
        document.querySelectorAll(selector).forEach(item => item.classList.remove('calculating__choose-item_active'));
        document.querySelector(attribut).classList.add('calculating__choose-item_active');

    }



    function staticData(parent, activeClass) {
        const element = document.querySelectorAll(`${parent} div`);

        document.querySelector(parent).addEventListener('click', (e) => {
            if (e.target && e.target.classList.contains('calculating__choose-item')) {
                if (e.target.hasAttribute('data-ratio')) {
                    ratio = +e.target.getAttribute('data-ratio');
                    localStorage.setItem('ratio', ratio);
                    localStorage.setItem('id', e.target.getAttribute('id'));
                } else {
                    sex = e.target.getAttribute('id');
                    localStorage.setItem('sex', sex);

                }

                element.forEach(item => item.classList.remove(activeClass));
                e.target.classList.add(activeClass);
            }
            calcTotal();

        });
    }

    staticData('.calculating__choose_big', 'calculating__choose-item_active');
    staticData('#gender', 'calculating__choose-item_active');


    function dynamicData(parent) {
        document.querySelector(parent).addEventListener('input', (e) => {
            const target = e.target.getAttribute('id');
            if (e.target.value.match(/\D/g)) {
                e.target.style.cssText = 'border: 1px solid red; transition: .3s all';
                messageError(target);
                return;
            } else {
                e.target.style.border = '';
                resultParent.innerHTML = '<span>____</span> ккал';
            }

            switch (target) {
                case 'height':
                    height = +e.target.value;
                    break;
                case 'weight':
                    weight = +e.target.value;
                    break;
                case 'age':
                    age = +e.target.value;
                    break;
                default:
                    throw new Error('wrong value');
            }
            calcTotal();
        });
    }

    dynamicData('.calculating__choose_medium');

    function messageError(message) {
        resultParent.innerHTML = '';
        const elem = document.createElement('span');
        elem.textContent = `${message} must be digits`;
        elem.classList.add('fade');
        elem.style.cssText = 'font-size: 20px; color: red;';
        resultParent.append(elem);
    }


}

module.exports = calc;

/***/ }),

/***/ "./js/modules/cards.js":
/*!*****************************!*\
  !*** ./js/modules/cards.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");



function cards() {

    class Cards {
        constructor(parent, src, alt, subtitle, descr, price, ...classes) {
            this.parent = document.querySelector(parent);
            this.src = src;
            this.alt = alt;
            this.subtitle = subtitle;
            this.descr = descr;
            this.price = price;
            this.classes = classes;
            this.currency = 2.65;
            this.exchangeToLary();
        }

        exchangeToLary() {
            this.price = (this.currency * this.price).toFixed(2);
        }
        showCards() {
            const element = document.createElement('div');
            if (this.classes.length === 0) {
                this.clazz = 'menu__item';
                element.classList.add(this.clazz);
            } else {
                this.classes.forEach(item => element.classList.add(item));
            }
            element.innerHTML = `
    
                    <img src=${this.src} alt=${this.alt}>
                    <h3 class="menu__item-subtitle">${this.subtitle}</h3>
                    <div class="menu__item-descr">${this.descr}</div>
                    <div class="menu__item-divider"></div>
                    <div class="menu__item-price">
                        <div class="menu__item-cost">Цена:</div>
                        <div class="menu__item-total"><span>${this.price}</span> gel/день</div>
                    </div>`;

            this.parent.append(element);
        }
    }


    (0,_services_services__WEBPACK_IMPORTED_MODULE_0__.getRequestCards)("http://localhost:3000/menu")
        .then(data => {
            data.forEach(({ img, altimg, title, descr, price }) => {
                new Cards('.menu .container',
                    img,
                    altimg,
                    title,
                    descr,
                    price,
                    'menu__item').showCards();
            });
        });

}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (cards);

/***/ }),

/***/ "./js/modules/forms.js":
/*!*****************************!*\
  !*** ./js/modules/forms.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modal */ "./js/modules/modal.js");
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");




function forms(formSelector, selectorModal) {

    const {openModal, closeModal} = (0,_modal__WEBPACK_IMPORTED_MODULE_0__.modalWindow)(selectorModal);

    const form = document.querySelectorAll(formSelector);
    form.forEach(forms => {
        sendData(forms);
    });


    function sendData(form) {

        const message = {
            loading: 'spinner/spinner.svg',
            success: 'Thank you, data have been reseved',
            failure: 'Samething went wrong'
        };


        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const statusMessage = document.createElement('img');
            statusMessage.src = message.loading;
            statusMessage.style.cssText = 'display: block; margin: 0 auto';
            form.insertAdjacentElement('afterend', statusMessage);


            const formData = new FormData(form);

            const json = JSON.stringify(Object.fromEntries(formData));


            (0,_services_services__WEBPACK_IMPORTED_MODULE_1__.postRequest)("http://localhost:3000/requests", json)
                .then((json) => {
                    console.log(json);
                    showThanksModal(message.success);
                    statusMessage.remove();
                }).catch(() => {
                    showThanksModal(message.failure);
                }).finally(() => {
                    form.reset();
                });

        });

    }


    function showThanksModal(message) {
        const prevModalDialog = document.querySelector('.modal__dialog');
        prevModalDialog.classList.add('hide');
        openModal();

        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog');
        thanksModal.innerHTML = `
            <div class="modal__content">
                <div data-close class="modal__close">&times;</div>
                <div class="modal__title">${message}</div>
            </div>
            `;
        document.querySelector('.modal').append(thanksModal);
        setTimeout(() => {
            thanksModal.remove();
            prevModalDialog.classList.add('show');
            prevModalDialog.classList.remove('hide');
            closeModal();
        }, 3000);
    }

}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (forms);

/***/ }),

/***/ "./js/modules/modal.js":
/*!*****************************!*\
  !*** ./js/modules/modal.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   modalWindow: () => (/* binding */ modalWindow)
/* harmony export */ });
function modalWindow(selectorModal) {
    const modal = document.querySelector(selectorModal);
    
        function openModal(openModalAuto) {
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden';
            clearTimeout(openModalAuto);
        }
    
        function closeModal() {
            modal.style.display = 'none';
            document.body.style.overflow = '';
        }
    
        return {openModal, closeModal};
    }


function modal(selectorClose, selectorModal) {

    const modalBtn = document.querySelectorAll(selectorClose),
        modal = document.querySelector(selectorModal);

    const {openModal, closeModal} = modalWindow(selectorModal);


    modalBtn.forEach(btn => {
        btn.addEventListener('click', (e) => {
            if (e.target === btn) {
                openModal(openModalAuto);
            }
        });
    });


    modal.addEventListener('click', (event) => {
        if (event.target === modal || event.target.getAttribute('data-close') === '') {
            closeModal();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.code === 'Escape' && window.getComputedStyle(modal).display === 'block') {
            closeModal();
        }
    });

    const openModalAuto = setTimeout(openModal, 3000);

    function showModalOnScroll() {
        const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
        if (window.scrollY >= scrollableHeight - 1) {
            openModal(openModalAuto);
            window.removeEventListener('scroll', showModalOnScroll);

        }
    }

    window.addEventListener('scroll', showModalOnScroll);

}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (modal);

/***/ }),

/***/ "./js/modules/slider.js":
/*!******************************!*\
  !*** ./js/modules/slider.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });

function slider({container, wrapper, inner, slides, currentSlide, totalSlides, prev, next} = {}) {
    // Slider

    const prevBtn = document.querySelector(prev),
        nextBtn = document.querySelector(next),
        sliderWrapper = document.querySelector(wrapper),
        sliderInner = sliderWrapper.querySelector(inner),
        slide = sliderWrapper.querySelectorAll(slides),
        current = document.getElementById(currentSlide),
        total = document.getElementById(totalSlides);
    let index = 1,
        offset = 0;

    const width = window.getComputedStyle(sliderWrapper).width;
    slide.forEach(item => item.style.width = width);
    sliderInner.style.cssText = `width: ${100 * slide.length}%; display: flex; transition: 0.5s all`;
    sliderWrapper.style.overflow = 'hidden';

    //Creat dots
    const parentSlider = document.querySelector(container),
        parentDots = document.createElement('ul');
    parentDots.classList.add('carousel-indicators');
    for (let i = 0; i < slide.length; i++) {
        parentDots.innerHTML += `<li class ='dot' data-attribut = ${i + 1}></li>`;
    }
    parentSlider.style.position = 'relative';
    parentSlider.append(parentDots);

    const dots = document.querySelectorAll('.dot');


    if (slide.length < 10) {
        total.textContent = `0${slide.length}`;
        current.textContent = `0${index}`;
    } else {
        total.textContent = slide.length;
        current.textContent = index;
    }


    function getZeroSlider(num) {
        return num < 10 ? `0${num}` : num;
    }

    showDotsOpacity();
    function showDotsOpacity(n = 1) {
        dots.forEach(item => item.style.opacity = '0.5');
        dots[n - 1].style.opacity = '1';
    }

    dots.forEach((item, i) => {
        item.addEventListener('click', (e) => {
            const target = +e.target.getAttribute('data-attribut');
            if (target === i + 1) {
                offset = parseInt(width) * i;
                index = target;
            }
            sliderInner.style.transform = `translateX(-${offset}px)`;
            current.textContent = getZeroSlider(index);
            showDotsOpacity(index);

        });
    });


    const autoSlider = setInterval(nextSlide, 2000);

    function nextSlide() {
        if (offset == parseInt(width) * (slide.length - 1)) {
            offset = 0;
            index = 1;
        } else {
            offset += parseInt(width);
            index++;
        }
        sliderInner.style.transform = `translateX(-${offset}px)`;
        current.textContent = getZeroSlider(index);
        showDotsOpacity(index);

    }

    nextBtn.addEventListener('click', () => {
        nextSlide();
        clearInterval(autoSlider);
    });

    prevBtn.addEventListener('click', () => {
        if (offset == 0) {
            offset += parseInt(width) * (slide.length - 1);
            index = slide.length;
        } else {
            offset -= parseInt(width);
            index -= 1;
        }
        sliderInner.style.transform = `translateX(-${offset}px)`;
        current.textContent = getZeroSlider(index);
        showDotsOpacity(index);

    });

}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (slider);

/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });

function tabs(tabContentSelector, tabsParentSelector, tabsItemSelector, activeClass) {

        const tabsContent = document.querySelectorAll(tabContentSelector),
        tabsParent = document.querySelector(tabsParentSelector),
        tabsItem = document.querySelectorAll(tabsItemSelector);

    // tabsParent.addEventListener('click', (e) => {
    //     if (e.target && e.target.classList.contains('tabheader__item')) {
    //         document.querySelectorAll('.tabheader__item').forEach((item, i) => {
    //             item.setAttribute('index', i);
    //             item.classList.remove('tabheader__item_active');
    //             tabsContent[i].classList.remove('tabcontent_visible');
    //         });
    //         e.target.classList.add('tabheader__item_active');
    //         let index = e.target.getAttribute('index');
    //         tabsContent[index].classList.add('tabcontent_visible', 'fade');

    //     }

    // });

    function hideTabContent() {
        tabsContent.forEach(item => {
            item.classList.add('hide');
            item.classList.remove('show', 'fade');
        });

        tabsItem.forEach(item => {
            item.classList.remove(activeClass);
        });
    }

    function showTabContent(i = 0) {
        tabsContent[i].classList.add('show', 'fade');
        tabsContent[i].classList.remove('hide');
        tabsItem[i].classList.add(activeClass);
    }

    hideTabContent();
    showTabContent();

    tabsParent.addEventListener('click', (e) => {
        const target = e.target;
        if (target && target.classList.contains(tabsItemSelector.slice(1))) {
            tabsItem.forEach((item, i) => {
                if (target == item) {
                    hideTabContent();
                    showTabContent(i);
                }
            });
        }
    });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (tabs);

/***/ }),

/***/ "./js/modules/timer.js":
/*!*****************************!*\
  !*** ./js/modules/timer.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });

function timer(parent, deadLine) {

        function getTimeRemaining(endtime) {
            let days, hours, munites, seconds;
    
            const total = Date.parse(endtime) - Date.parse(new Date()); // total ms
    
            if (total <= 0) {
                days = 0;
                hours = 0;
                munites = 0;
                seconds = 0;
            } else {
                days = Math.floor(total / (86400000));
                hours = Math.floor((total / (1000 * 60 * 60) % 24));
                munites = Math.floor((total / 1000 / 60) % 60);
                seconds = Math.floor((total / 1000) % 60);
    
            }
    
            return {
                total,
                days,
                hours,
                munites,
                seconds
            };
        }
    
        function getZero(num) {
            return num >= 0 && num < 10 ? `0${num}` : num;
        }
    
        function setClock(parent, endtime) {
            const timer = document.querySelector(parent),
                day = timer.querySelector('#days'),
                hour = timer.querySelector('#hours'),
                munite = timer.querySelector('#minutes'),
                second = timer.querySelector('#seconds');
    
            const startClock = setInterval(start, 1000);
    
            start();
    
            function start() {
                const { total, days, hours, munites, seconds } = getTimeRemaining(endtime);
                day.innerHTML = getZero(days);
                hour.innerHTML = getZero(hours);
                munite.innerHTML = getZero(munites);
                second.innerHTML = getZero(seconds);
    
                if (total <= 0) {
                    clearInterval(startClock);
                }
            }
        }
    
        setClock(parent, deadLine);    
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (timer);

/***/ }),

/***/ "./js/services/services.js":
/*!*********************************!*\
  !*** ./js/services/services.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getRequestCards: () => (/* binding */ getRequestCards),
/* harmony export */   postRequest: () => (/* binding */ postRequest)
/* harmony export */ });

const postRequest = async (url, data) => {
    const res = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: data

    });
    return await res.json();
};


const getRequestCards = async (url) => {
    const res = await fetch(url);

    if (!res.ok) {
        throw new Error(`Could not fetch ${url}, status: ${res.status}`);
    }
    return await res.json();
};

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_tabs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/tabs */ "./js/modules/tabs.js");
/* harmony import */ var _modules_timer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/timer */ "./js/modules/timer.js");
/* harmony import */ var _modules_modal__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/modal */ "./js/modules/modal.js");
/* harmony import */ var _modules_cards__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/cards */ "./js/modules/cards.js");
/* harmony import */ var _modules_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/forms */ "./js/modules/forms.js");
/* harmony import */ var _modules_slider__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/slider */ "./js/modules/slider.js");
/* harmony import */ var _modules_calc__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/calc */ "./js/modules/calc.js");
/* harmony import */ var _modules_calc__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_modules_calc__WEBPACK_IMPORTED_MODULE_6__);











document.addEventListener('DOMContentLoaded', () => {

    (0,_modules_tabs__WEBPACK_IMPORTED_MODULE_0__["default"])('.tabcontent', '.tabheader__items', '.tabheader__item', 'tabheader__item_active');
    (0,_modules_timer__WEBPACK_IMPORTED_MODULE_1__["default"])('.timer', '2023-10-31');
    (0,_modules_modal__WEBPACK_IMPORTED_MODULE_2__["default"])('[data-modal]', '.modal');
    (0,_modules_cards__WEBPACK_IMPORTED_MODULE_3__["default"])();
    (0,_modules_forms__WEBPACK_IMPORTED_MODULE_4__["default"])('form', '.modal');
    (0,_modules_slider__WEBPACK_IMPORTED_MODULE_5__["default"])({
        container: '.offer__slider',
        wrapper: '.offer__slider-wrapper',
        inner: '.offset__slider-inner',
        slides: '.offer__slide',
        currentSlide: 'current',
        totalSlides: 'total',
        prev: '.offer__slider-prev',
        next: '.offer__slider-next'


    });
    _modules_calc__WEBPACK_IMPORTED_MODULE_6___default()();
});
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map