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

function selectNone() {
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
    const addedToCart = getProductCartIndex(item.item_code) != -1;
    code += `
<div class="col-lg-4 col-md-4 col-sm-6 col-12 my-2 p-3 p-sm-3 p-md-4 p-lg-5">
    <div class="card bgd-black btn-shadow h-100 pe-2">
        <button
            class="btn btn-success card-hover rounded-circle btn-custom position-absolute fs-4 d-flex align-items-center justify-content-center ${
              addedToCart ? "px-3" : ""
            }"
            style="left: 95%; bottom: 85%;" onClick="addToCart('${id}', '${index}')" id="addToCartBtn_${index}">${
      addedToCart ? "1" : '<i class="bi bi-plus"></i>'
    }</button>
        <img src="img/${
          item.img
        }.svg" class="position-absolute end-50" style="width: 60%; bottom: -20%;" alt="product">
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

            <div class="bgd-yellow d-inline-block rounded my-2 ${
              addedToCart ? "" : "d-none"
            }" id="numActionBtns_${index}">
                <button
                  onClick={addQuantity('${item.item_code}')}
                    class="btn btn-success card-hover btn-custom fs-6 align-items-center justify-content-center bgd-black rounded-end-0 border-2 border-end-0"><i class="bi bi-plus"></i></button>
                <div style="display: inline-block;" class="px-2" id="itemQuantity_${index}"> 1 </div>
                <button
                onClick={subtractQuantity('${item.item_code}')}
                    class="btn btn-success card-hover btn-custom fs-6 align-items-center justify-content-center bgd-black rounded-start-0 border-2 border-start-0"><i class="bi bi-dash"></i></button>
            </div>

        </div>
    </div>
</div>
`;
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

  if (getProductCartIndex(categories[id][index].item_code) !== -1) {
    cart.forEach((items, cartIndex) => {
      if (items[0] == categories[id][index]) {
        removeFromCart(index, cartIndex);
      }
    });
    return;
  }

  document.getElementById(`numActionBtns_${index}`).classList.remove("d-none");
  cart.push([categories[id][index], 1, index]);
  updateCart();
  addToCartIcon(index, "add");
}

function addToCartIcon(index, option) {
  switch (option) {
    case "add":
      document.getElementById(`addToCartBtn_${index}`).innerHTML =
        cart[cart.length - 1][1];
      document.getElementById(`addToCartBtn_${index}`).classList.add("px-3");
      break;
    case "remove":
      document.getElementById(`addToCartBtn_${index}`).innerHTML =
        "<i class='bi bi-plus'></i>";
      document.getElementById(`addToCartBtn_${index}`).classList.remove("px-3");
      break;
  }
}

function removeFromCart(index, cartIndex) {
  addToCartIcon(index, "remove");
  cart.splice(cartIndex, 1);
  document.getElementById(`numActionBtns_${index}`).classList.add("d-none");
  updateCart();
}

function updateCart() {
  let cartCode = "";
  let cartValue = 0.0;
  let cartDiscounts = 0.0;

  cart.forEach((item, index) => {
    cartCode += `
    <li class="my-2">
  <div class="bgd-black p-3 text-white rounded-3">
    <h6>${item[0].title}</h6>
    <div class="d-flex gap-3">
      <p class="text-yellow fs-4">Rs. ${
        (item[0].discount == 0
          ? item[0].price
          : item[0].price - item[0].price * (item[0].discount / 100)) * item[1]
      }</p>
      <p>${item[0].discount == 0 ? "" : item[0].discount + "% Off"}</p>
    </div>

    <p>No. ${item[1]}</p>

    <div class="d-flex justify-content-between">
      <div>
        <button class="btn btn-warning" onClick="changeQuantity('${index}', 'subtract')"><i class="bi bi-dash-circle"></i></button>
        <button class="btn btn-warning" onClick="changeQuantity('${index}', 'add')"><i class="bi bi-plus-circle"></i></button>
      </div>
      <div>
        <button class="btn btn-danger" onClick="removeFromCart('${
          item[2]
        }', '${index}')">Remove</button>
      </div>
    </div>
  </div>
</li>`;

    cartValue +=
      Number(
        item[0].discount == 0
          ? item[0].price
          : item[0].price - item[0].price * (item[0].discount / 100)
      ) * item[1];
    cartDiscounts +=
      Number(
        item[0].discount == 0 ? 0 : item[0].price * (item[0].discount / 100)
      ) * item[1];
  });

  document.getElementById("cart-total").innerText = "Rs." + cartValue;
  document.getElementById("cart-discounts").innerText =
    "Rs." + cartDiscounts + " saved";
  document.getElementById("cart-list").innerHTML = cartCode;
}

function changeQuantity(cartIndex, operation) {
  switch (operation) {
    case "add":
      cart[cartIndex][1]++;
      break;
    case "subtract":
      if (cart[cartIndex][1] > 1) {
        cart[cartIndex][1]--;
      }
      break;
  }
  document.getElementById(`addToCartBtn_${cart[cartIndex][2]}`).innerHTML =
    cart[cartIndex][1];
  document.getElementById(`itemQuantity_${cart[cartIndex][2]}`).innerText =
    cart[cartIndex][1];
  updateCart();
}

const searchBar = document.getElementById("searchBar");
const productGrid = document.getElementById("product_grid");
const searchBtn = document.getElementById("searchBtn");

searchBar.addEventListener("input", function () {
  if (searchBar.value === "") {
    clearSearchBar();
    return;
  }

  selectNone();
  searchBtn.classList.remove("d-none");
  searchBar.classList.remove("rounded-2");

  const categories = [
    products.burgers,
    products.submarines,
    products.fries,
    products.pasta,
    products.chicken,
    products.beverages,
  ];

  const lowerCaseTxt = searchBar.value.toLowerCase();
  let template = "";
  categories.forEach((category, id) => {
    const filteredProducts = category.filter((burger) => {
      return (
        burger.title.toLowerCase().includes(lowerCaseTxt) ||
        burger.item_code.toLowerCase().includes(lowerCaseTxt)
      );
    });

    productGrid.innerHTML = "";
    filteredProducts.forEach((item, index) => {
      const addedToCart = getProductCartIndex(item.item_code) != -1;
      template += `
<div class="col-lg-4 col-md-4 col-sm-6 col-12 my-2 p-3 p-sm-3 p-md-4 p-lg-5">
    <div class="card bgd-black btn-shadow h-100 pe-2">
        <button
            class="btn btn-success card-hover rounded-circle btn-custom position-absolute fs-4 d-flex align-items-center justify-content-center ${
              addedToCart ? "px-3" : ""
            }"
            style="left: 95%; bottom: 85%;" onClick="addToCart('${id}', '${index}')" id="addToCartBtn_${index}">${
        addedToCart ? "1" : '<i class="bi bi-plus"></i>'
      }</button>
        <img src="img/${
          item.img
        }.svg" class="position-absolute end-50" style="width: 60%; bottom: -20%;" alt="product">
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

            <div class="bgd-yellow d-inline-block rounded my-2 ${
              addedToCart ? "" : "d-none"
            }" id="numActionBtns_${index}">
                <button
                  onClick={addQuantity('${item.item_code}')}
                    class="btn btn-success card-hover btn-custom fs-6 align-items-center justify-content-center bgd-black rounded-end-0 border-2 border-end-0"><i class="bi bi-plus"></i></button>
                <div style="display: inline-block;" class="px-2" id="itemQuantity_${index}"> 1 </div>
                <button
                onClick={subtractQuantity('${item.item_code}')}
                    class="btn btn-success card-hover btn-custom fs-6 align-items-center justify-content-center bgd-black rounded-start-0 border-2 border-start-0"><i class="bi bi-dash"></i></button>
            </div>

        </div>
    </div>
</div>`;
    });
  });
  productGrid.innerHTML = template;
});

function clearSearchBar() {
  searchBar.value = "";
  document.getElementById("searchBtn").classList.add("d-none");
  searchBar.classList.add("rounded-2");
  selectedBurgers();
}

function subtractQuantity(item_code) {
  changeQuantity(getProductCartIndex(item_code), "subtract");
}

function addQuantity(item_code) {
  changeQuantity(getProductCartIndex(item_code), "add");
}

function getProductCartIndex(item_code) {
  for (let i = 0; i < cart.length; i++) {
    if (cart[i][0].item_code === item_code) {
      return i;
    }
  }
  return -1;
}

function checkout(){
  sessionStorage.setItem('cart', JSON.stringify(cart));
  window.location.href = "checkout.html";
}