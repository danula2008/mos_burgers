const cities = [
  "Colombo",
  "Kandy",
  "Gampaha",
  "Negombo",
  "Kelaniya",
  "Dehiwala-Mount Lavinia",
  "Piliyandala",
  "Moratuwa",
  "Wattala",
  "Maharagama",
  "Kaduwela",
  "Hanwella",
  "Panadura",
  "Nugegoda",
  "Ja-Ela",
  "Ragama",
  "Kotikawatta",
  "Attidiya",
  "Bambalapitiya",
  "Wellawaya",
];

passwordIcon(
  document.getElementById("show-password-icon"),
  document.getElementById("pwd")
);
passwordIcon(
  document.getElementById("show-password-icon-confirm"),
  document.getElementById("pwdConfirm")
);

function passwordIcon(showPasswordIcon, passwordInput) {
  showPasswordIcon.addEventListener("click", () => {
    console.log("Button PRessed");
    if (passwordInput.type === "password") {
      passwordInput.type = "text";
      showPasswordIcon.classList.remove("bi-eye-fill");
      showPasswordIcon.classList.add("bi-eye-slash-fill");
    } else {
      passwordInput.type = "password";
      showPasswordIcon.classList.remove("bi-eye-slash-fill");
      showPasswordIcon.classList.add("bi-eye-fill");
    }
  });
}

let cityHtml = "";
cities.forEach((city) => {
  cityHtml += `<option value="${city}">${city}</option>`;
});

document.getElementById("city").innerHTML = cityHtml;
