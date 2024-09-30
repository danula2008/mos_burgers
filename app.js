let users;

fetch("data//users.json")
  .then((response) => response.json())
  .then((data) => {
    users = data.users;
  })
  .catch((error) => console.error("Error:", error));

document.getElementById("btnLogin").addEventListener("click", function (event) {
  event.preventDefault();
});

function login() {
  let username = document.getElementById("username").value;
  let password = document.getElementById("password").value;

  for (const element of users) {
    if (element.username == username && element.password == password) {
      sessionStorage.setItem('Cashier', JSON.stringify(element.name));
      window.location.href = "dashboard/dashboard.html";
      return;
    }
  }
  document.getElementById('errorText').innerText = "Invalid username or password.";
}

const passwordInput = document.getElementById('password');
const showPasswordIcon = document.getElementById('show-password-icon');

showPasswordIcon.addEventListener('click', () => {
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