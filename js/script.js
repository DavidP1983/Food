"use strict";


document.addEventListener('DOMContentLoaded', () => {

    // Tabs

    const tabsContent = document.querySelectorAll('.tabcontent'),
        tabsParent = document.querySelector('.tabheader__items'),
        tabsItem = document.querySelectorAll('.tabheader__item');

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
            item.classList.remove('tabheader__item_active');
        });
    }

    function showTabContent(i = 0) {
        tabsContent[i].classList.add('show', 'fade');
        tabsContent[i].classList.remove('hide');
        tabsItem[i].classList.add('tabheader__item_active');
    }

    hideTabContent();
    showTabContent();

    tabsParent.addEventListener('click', (e) => {
        const target = e.target;
        if (target && target.classList.contains('tabheader__item')) {
            tabsItem.forEach((item, i) => {
                if (target == item) {
                    hideTabContent();
                    showTabContent(i);
                }
            });
        }
    });


    //Timer

    const deadLine = '2023-10-08';

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

    setClock('.timer', deadLine);



    // Modal

    const modalBtn = document.querySelectorAll('[data-modal]'),
          modal = document.querySelector('.modal');




    function openModal() {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
        clearTimeout(openModalAuto);
    }

    modalBtn.forEach(btn => {
        btn.addEventListener('click', (e) => {
            if (e.target === btn) {
                openModal();
            }
        });
    });




    function closeModal() {
        modal.style.display = 'none';
        document.body.style.overflow = '';
    }


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
            openModal();
            window.removeEventListener('scroll', showModalOnScroll);

        }
    }

    window.addEventListener('scroll', showModalOnScroll);


    // Class Cards

    class Cards {
        constructor(parent ,src, alt, subtitle, descr, price, ...classes) {
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
            this.price = this.currency * this.price;
        }
        showCards() {
            const element = document.createElement('div');
            if(this.classes.length === 0) {
                this.clazz = 'menu__item';
                element.classList.add(this.clazz);
            }else {
               this.classes.forEach(item => element.classList.add(item)); 
            }
             element.innerHTML =`

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

    const getRequestCards = async (url) => {
        const res = await fetch(url);

        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`);
        }
        return await res.json();
    };


        getRequestCards("http://localhost:3000/menu")
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



    // Forms

    const form = document.querySelectorAll('form');
    form.forEach(forms => {
        sendData(forms);
    });

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


            postRequest("http://localhost:3000/requests", json)
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


    
    // Slider

    const prevBtn = document.querySelector('.offer__slider-prev'),
          nextBtn = document.querySelector('.offer__slider-next'),
          sliderWrapper = document.querySelector('.offer__slider-wrapper'),
          sliderInner = sliderWrapper.querySelector('.offset__slider-inner'),
          slide = sliderWrapper.querySelectorAll('.offer__slide'),
          current = document.getElementById('current'),
          total = document.getElementById('total');
    let index = 1,  
        offset = 0;

    const width = window.getComputedStyle(sliderWrapper).width;
    slide.forEach(item => item.style.width = width);
    sliderInner.style.cssText = `width: ${100 * slide.length}%; display: flex; transition: 0.5s all`;
    sliderWrapper.style.overflow = 'hidden';

    //Creat dots
    const parentSlider = document.querySelector('.offer__slider'),
        parentDots = document.createElement('ul');
        parentDots.classList.add('carousel-indicators');
        for (let i = 0; i < slide.length; i++) {
            parentDots.innerHTML += `<li class ='dot' data-attribut = ${i + 1}></li>`;
        }
    parentSlider.style.position = 'relative';
    parentSlider.append(parentDots);

    const dots = document.querySelectorAll('.dot');


    if(slide.length < 10) {
        total.textContent =  `0${slide.length}`;
        current.textContent = `0${index}`;
    }else{
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
           if(target === i + 1) {
            offset = parseInt(width) * i;
            index = target;
           }
           sliderInner.style.transform =  `translateX(-${offset}px)`;
           current.textContent =  getZeroSlider(index);
           showDotsOpacity(index);

        });
    });

    
    const autoSlider = setInterval(next, 2000);

    function next() {
        if(offset == parseInt(width) * (slide.length - 1)) {
            offset = 0;
            index = 1;
        }else {
            offset += parseInt(width);
            index++;
        } 
        sliderInner.style.transform = `translateX(-${offset}px)`;
        current.textContent =  getZeroSlider(index);
        showDotsOpacity(index);

    }

    nextBtn.addEventListener('click', () => {
        next();
        clearInterval(autoSlider);
    });

    prevBtn.addEventListener('click', () => {
        if(offset == 0) {
            offset += parseInt(width) * (slide.length - 1);
            index = slide.length;
        }else {
            offset -= parseInt(width);
            index -= 1;
        }
        sliderInner.style.transform = `translateX(-${offset}px)`;
        current.textContent =  getZeroSlider(index);
        showDotsOpacity(index);

    });
    

    // Calc

    const resultParent = document.querySelector('.calculating__result');
    let sex, height, weight, age, ratio;

    function calcTotal() {
        if(localStorage.getItem('sex')) {
            sex = localStorage.getItem('sex');
            setActiveClass('#gender div', `#${sex}`);
        }else {
            sex = 'female';
        }

        if(localStorage.getItem('ratio')) {
            ratio = localStorage.getItem('ratio');
            const id = localStorage.getItem('id');
            setActiveClass('.calculating__choose_big div', `#${id}`);
        }else {
            ratio = 1.375;
        }

        const result = document.querySelector('.calculating__result span');
        if(!sex || !height || !weight || !age || !ratio) {
            result.textContent = '____';
            return;
        }
        if (sex === 'female') {
            result.textContent = Math.ceil((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
        }else {
            result.textContent = Math.ceil((88.36 + (13.4  * weight) + (4.8 * height) - (5.7 * age)) * ratio);
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
            if(e.target && e.target.classList.contains('calculating__choose-item')) {
                if(e.target.hasAttribute('data-ratio')) {
                    ratio = +e.target.getAttribute('data-ratio');
                    localStorage.setItem('ratio', ratio);
                    localStorage.setItem('id', e.target.getAttribute('id'));
                }else {
                    sex = e.target.getAttribute('id');
                    localStorage.setItem('sex', sex);

                }

                element.forEach(item =>  item.classList.remove(activeClass));
                e.target.classList.add(activeClass);
            }
            calcTotal();

        });
    }

    staticData('.calculating__choose_big', 'calculating__choose-item_active');
    staticData('#gender','calculating__choose-item_active');


    function dynamicData(parent) {
        document.querySelector(parent).addEventListener('input', (e) => {
            const target = e.target.getAttribute('id');
            if(e.target.value.match(/\D/g)) {
                e.target.style.cssText = 'border: 1px solid red; transition: .3s all';
                messageError(target);
                return;
            }else {
                e.target.style.border = '';
                resultParent.innerHTML = '<span>____</span> ккал';
            }
            
            switch(target) {
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


});