
function calc() {

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

export default calc;