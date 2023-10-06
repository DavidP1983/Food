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


});