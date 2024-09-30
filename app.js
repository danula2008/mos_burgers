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

  users.forEach((element) => {
    if (element.username == username && element.password == password) {
      window.location.href = "dashboard/dashboard.html";
    }
  });
}
