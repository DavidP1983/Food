"use strict";


document.addEventListener('DOMContentLoaded', () => {

    const tabsContent = document.querySelectorAll('.tabcontent'),
          tabsParent = document.querySelector('.tabheader__items');

    tabsParent.addEventListener('click', (e) => {
        if (e.target && e.target.classList.contains('tabheader__item')) {
            document.querySelectorAll('.tabheader__item').forEach((item, i) => {
                item.setAttribute('index', i);
                item.classList.remove('tabheader__item_active');
                tabsContent[i].classList.remove('tabcontent_visible');
            });
            e.target.classList.add('tabheader__item_active');
            let index = e.target.getAttribute('index');
            tabsContent[index].classList.add('tabcontent_visible', 'fade');

        }

    });
});