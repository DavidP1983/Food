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

});