let products;
let cart = [];

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
    0,
    products.burgers
  );
}

function selectedSubs() {
  setActiveColor("subBtn");
  document.getElementById("product_grid").innerHTML = getCardCode(
    1,
    products.submarines
  );
}

function selectedFries() {
  setActiveColor("friesBtn");
  document.getElementById("product_grid").innerHTML = getCardCode(
    2,
    products.fries
  );
}

function selectedPasta() {
  setActiveColor("pastaBtn");
  document.getElementById("product_grid").innerHTML = getCardCode(
    3,
    products.pasta
  );
}

function selectedChicken() {
  setActiveColor("chickenBtn");
  document.getElementById("product_grid").innerHTML = getCardCode(
    4,
    products.chicken
  );
}

function selectedBeverages() {
  setActiveColor("beveragesBtn");
  document.getElementById("product_grid").innerHTML = getCardCode(
    5,
    products.beverages
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

function getCardCode(id, productType) {
  let code = "";
  productType.forEach((item, index) => {
    code += `<div class="col-lg-4 col-md-4 col-sm-6 col-12 my-2 p-3 p-sm-3 p-md-4 p-lg-5">    
            <div class="card bgd-black btn-shadow h-100">
            <button class="btn btn-success card-hover rounded-circle btn-custom position-absolute fs-4 d-flex align-items-center justify-content-center"
            style="left: 95%; bottom: 85%;" onClick="addToCart('${id}', '${index}')"><i class="bi bi-plus" id="addToCartIcon_${index}"></i></button>
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
  if (cartShowing) {
    hideCart();
    return;
  }
  cartShowing = true;
  document.getElementById("cart").style.display = "block";
}

function hideCart() {
  if (!cartShowing) {
    showCart();
    return;
  }
  cartShowing = false;
  document.getElementById("cart").style.display = "none";
}

function addToCart(id, index) {
  const categories = [
    products.burgers,
    products.submarines,
    products.fries,
    products.pasta,
    products.chicken,
    products.beverages,
  ];

  if (
    document
      .getElementById(`addToCartIcon_${index}`)
      .classList.contains("bi-check")
  ) {
    return;
  }

  cart.push([categories[id][index], 1, index]);
  updateCart();
  addToCartIcon(index, "add");
}

function addToCartIcon(index, option) {
  switch (option) {
    case "add":
      document
        .getElementById(`addToCartIcon_${index}`)
        .classList.remove("bi-plus");
      document
        .getElementById(`addToCartIcon_${index}`)
        .classList.add("bi-check");
      break;
    case "remove":
      document
        .getElementById(`addToCartIcon_${index}`)
        .classList.remove("bi-check");
      document
        .getElementById(`addToCartIcon_${index}`)
        .classList.add("bi-plus");
      break;
  }
}

function removeFromCart(index, cartIndex) {
  addToCartIcon(index, "remove");
  cart.splice(cartIndex, 1);
  updateCart();
}

function updateCart() {
  let cartCode = "";
  let cartValue = 0.0;
  let cartDiscounts = 0.0;

  cart.forEach((item, index) => {
    cartCode += `<li class="my-2">
  <div class="bgd-black p-3 text-white rounded-3">
    <h6>${item[0].title}</h6>
    <div class="d-flex gap-3">
      <p class="text-yellow fs-4">Rs. ${
        item[0].discount == 0
          ? item[0].price
          : item[0].price - item[0].price * (item[0].discount / 100)
      }</p>
      <p>${item[0].discount == 0 ? "" : item[0].discount + "% Off"}</p>
    </div>

    <p>No. ${item[1]}</p>

    <div class="d-flex justify-content-between">
      <div>
        <button class="btn btn-warning" onClick="changeQuantity('${
          item[2]
        }', '${index}', 'subtract')"><i class="bi bi-dash-circle"></i></button>
        <button class="btn btn-warning" onClick="changeQuantity('${
          item[2]
        }', '${index}', 'add')"><i class="bi bi-plus-circle"></i></button>
      </div>
      <div>
        <button class="btn btn-danger" onClick="removeFromCart('${
          item[2]
        }', '${index}')">Remove</button>
      </div>
    </div>
  </div>
</li>`;

    cartValue += Number(
      item[0].discount == 0
        ? item[0].price
        : item[0].price - item[0].price * (item[0].discount / 100)
    );
    cartDiscounts += Number(
      item[0].discount == 0 ? 0 : item[0].price * (item[0].discount / 100)
    );
  });

  document.getElementById("cart-total").innerText = "Rs." + cartValue;
  document.getElementById("cart-discounts").innerText =
    "Rs." + cartDiscounts + " saved";
  document.getElementById("cart-list").innerHTML = cartCode;
}

function changeQuantity(id, cartIndex, operation) {
  
}
