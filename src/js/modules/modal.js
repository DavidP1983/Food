export function modalWindow(selectorModal) {
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

export default modal;