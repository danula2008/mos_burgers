const passwordInput = document.getElementById('pwd');
const showPasswordIcon = document.getElementById('show-password-icon');

showPasswordIcon.addEventListener('click', () => {
    console.log("Button PRessed");
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        showPasswordIcon.classList.remove('bi-eye-fill');
        showPasswordIcon.classList.add('bi-eye-slash-fill');
    } else {
        passwordInput.type = 'password';
        showPasswordIcon.classList.remove('bi-eye-slash-fill');
        showPasswordIcon.classList.add('bi-eye-fill');
    }
});