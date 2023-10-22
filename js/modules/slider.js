
function slider() {
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


    const autoSlider = setInterval(next, 2000);

    function next() {
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
        next();
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

module.exports = slider;