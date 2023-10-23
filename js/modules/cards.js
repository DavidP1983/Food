import {getRequestCards} from '../services/services';


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

}

export default cards;