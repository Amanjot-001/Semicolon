const textArea = document.querySelector('.text-area');
const edit = document.querySelector('.edit');
const submit = document.querySelector('.submit');

edit.addEventListener('click', () => {
    edit.style.color = 'yellow'
    textArea.setAttribute('contenteditable', 'true');
    textArea.focus();
    if(textArea.textContent === 'Max 80 chars long')
        textArea.textContent = '';
})

submit.addEventListener('click', () => {
    textArea.blur();
    textArea.removeAttribute('contenteditable', 'true');
    if (textArea.textContent === '')
        textArea.textContent = 'Max 80 chars long';

})

document.addEventListener('click', (e) => {
    if (e.target !== edit && e.target !== textArea) {
        textArea.blur();
        textArea.removeAttribute('contenteditable', 'true');
        if (textArea.textContent === '')
            textArea.textContent = 'Max 80 chars long';
        edit.style.color = 'var(--color-1)';
    }
})