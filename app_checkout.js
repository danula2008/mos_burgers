let cart = JSON.parse(sessionStorage.getItem("cart"));
let orderCode = `
<li class="list-group-item d-flex justify-content-between align-items-center bg-light">
  <div class="col-1 text-start fw-bold">
    <span class="item-code">ID</span>
  </div>
  <div class="col-4 text-start fw-bold">
    <span class="item-title">Item Title</span>
  </div>
  <div class="col-2 text-start fw-bold">
    <span class="item-price">Unit Price</span>
  </div>
  <div class="col-1 text-start fw-bold">
    <span class="item-quantity">Qty</span>
  </div>
  <div class="col-1 text-end fw-bold">
    <span class="item-total">Total</span>
  </div>
</li>
`;

let cartTotal = 0;
let totalDiscounts = 0;
cart.forEach((item) => {
  const originalPrice = item[0].price * item[1];
  const discount = item[0].discount > 0 ? (item[0].price * item[0].discount) / 100 : 0;
  const price = originalPrice - discount;

  cartTotal += price;
  totalDiscounts += discount;

  orderCode += `
<li class="list-group-item d-flex justify-content-between align-items-center">
  <div class="col-1 text-start">
    <span class="item-code">${item[0].item_code}</span>
  </div>
  <div class="col-4 text-start">
    <span class="item-title">${item[0].title}</span>
  </div>
  <div class="col-2 text-start">
    <span class="item-price">Rs${item[0].price}</span>
    <span class="discount">${
      item[0].discount > 0 ? `(-${item[0].discount}%)` : ""
    }</span>
  </div>
  <div class="col-1 text-start">
    <span class="item-quantity">x ${item[1]}</span>
  </div>
  <div class="col-1 text-end fw-bold">
    <span class="item-total">Rs. ${price}</span>
  </div>
</li>
    `;
});

document.getElementById("order-items").innerHTML = orderCode;

document.getElementById("num-items").innerHTML = cart.length;
document.getElementById("sub-total").innerHTML = `Rs. ${cartTotal + totalDiscounts}`;
document.getElementById("tot-discounts").innerHTML = `Rs. ${totalDiscounts}`;
document.getElementById("grand-total").innerHTML = `Rs. ${cartTotal}`;