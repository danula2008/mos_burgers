let products;

fetch("data.json")
  .then((response) => response.json())
  .then((data) => {
    products = data;
    selectedBurgers();
  })
  .catch((error) => console.error("Error:", error));

function selectedBurgers() {
  setActiveColor("burgerBtn");
  document.getElementById("product_grid").innerHTML = getCardCode(
    products.burgers
  );
}

function selectedSubs() {
  setActiveColor("subBtn");
  document.getElementById("product_grid").innerHTML = getCardCode(
    products.submarines
  );
}

function selectedFries() {
  setActiveColor("friesBtn");
  document.getElementById("product_grid").innerHTML = getCardCode(
    products.fries
  );
}

function selectedPasta() {
  setActiveColor("pastaBtn");
  document.getElementById("product_grid").innerHTML = getCardCode(
    products.pasta
  );
}

function selectedBeverages() {
  setActiveColor("beveragesBtn");
  document.getElementById("product_grid").innerHTML = getCardCode(
    products.beverages
  );
}

function selectedChicken() {
  setActiveColor("chickenBtn");
  document.getElementById("product_grid").innerHTML = getCardCode(
    products.chicken
  );
}

function setActiveColor(active) {
  let btnNames = [
    "burgerBtn",
    "subBtn",
    "friesBtn",
    "pastaBtn",
    "chickenBtn",
    "beveragesBtn",
  ];

  btnNames.forEach((btn) => {
    document
      .getElementById(btn)
      .style.setProperty("background-color", "transparent", "important");
    document
      .getElementById(btn)
      .style.setProperty("color", "black", "important");
  });

  document
    .getElementById(active)
    .style.setProperty("background-color", "#eca400", "important");
  document
    .getElementById(active)
    .style.setProperty("color", "white", "important");
}

function getCardCode(productType) {
  code = "";
  productType.forEach((item) => {
    code += `<div class="col-lg-4 col-md-4 col-sm-6 col-12 my-2 p-3 p-sm-3 p-md-4 p-lg-5">    
            <div class="card bgd-black btn-shadow h-100">
            <button class="btn btn-success card-hover rounded-circle btn-custom position-absolute fs-4 px- py-1 d-flex align-items-center justify-content-center"
            style="left: 95%; bottom: 85%; padding-bottom: 6px !important; padding-right: 13px !important; padding-left: 13px !important;">+</button>
            <img src="Assets/img/${
                item.img
              }.svg" class="position-absolute end-50"
              style="width: 60%; bottom: -20%;"
                  alt="product">
              <div class="card-body text-end">
                  <p class="text-white">${item.item_code}</p>
                  <p class="font-kavoon text-white">${item.title}</p>

                  ${
                    item.discount == 0
                      ? ""
                      : `<p class="ms-5 text-white fs-6"> <s>Rs : ${item.price}</s> - ${item.discount}% Off</p>`
                  }

                  <h4 class="text-yellow ">Rs. ${
                    item.discount == 0
                      ? item.price
                      : item.price - item.price * (item.discount / 100)
                  }</h4>
              </div>
            </div>
          </div>`;
  });
  return code;
}

let cartShowing = false;

function showCart() {
  if (cartShowing){
    hideCart();
    return;
  }
  cartShowing = true;
  document.getElementById("cart").style.display = "block";
}

function hideCart() {
  if (!cartShowing){
    showCart();
    return;
  }
  cartShowing = false;
  document.getElementById("cart").style.display = "none";
}
