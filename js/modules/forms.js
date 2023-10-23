import {modalWindow} from './modal';
import {postRequest} from '../services/services';


function forms(formSelector, selectorModal) {

    const {openModal, closeModal} = modalWindow(selectorModal);

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

}

export default forms;