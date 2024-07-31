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
  const discount =
    item[0].discount > 0 ? (item[0].price * item[0].discount) / 100 : 0;
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
    <span class="item-quantity">${item[1]}</span>
  </div>
  <div class="col-1 text-end fw-bold">
    <span class="item-total">Rs. ${price}</span>
  </div>
</li>
    `;
});

document.getElementById("order-items").innerHTML = orderCode;

document.getElementById("num-items").innerHTML = cart.length;
document.getElementById("sub-total").innerHTML = `Rs. ${
  cartTotal + totalDiscounts
}`;
document.getElementById("tot-discounts").innerHTML = `Rs. ${totalDiscounts}`;
document.getElementById("grand-total").innerHTML = `Rs. ${cartTotal}`;

document.getElementById('paymentCard').addEventListener('click', function() {
  document.getElementById('payment_area').innerHTML = `
  <div class="card-payment-form mx-auto" style="max-width: 400px;">
    <h3 class="mb-3 text-center">Card Payment Information</h3>
    <form id="payment-form-card">
      <div class="form-group">
        <label for="card-number" class="text-center">Card Number:</label>
        <input type="text" id="card-number" name="card-number" placeholder="1234 5678 9012 3456" required class="form-control w-50 mx-auto">
      </div>
      <div class="form-group mt-3">
        <label for="card-expiry" class="text-center">Expiry Date:</label>
        <input type="month" id="card-expiry" name="card-expiry" required class="form-control w-50 mx-auto">
      </div>
      <div class="form-group mt-3">
        <label for="card-cvv" class="text-center">CVV:</label>
        <input type="number" id="card-cvv" name="card-cvv" placeholder="123" required class="form-control w-50 mx-auto">
      </div>
      <div class="form-group mt-3">
        <label for="card-holder-name" class="text-center">Cardholder Name:</label>
        <input type="text" id="card-holder-name" name="card-holder-name" required class="form-control w-50 mx-auto">
      </div>
      <button class="btn btn-primary mx-auto d-block mt-3" id="pay-now-btn-card">Pay</button>
    </form>
  </div>
  `

  document.getElementById('payment-form-card').addEventListener('submit', function(event) {
    event.preventDefault();
  });

  document.getElementById('pay-now-btn-card').addEventListener('click', getBalanceCard);
});

document.getElementById('paymentCash').addEventListener('click', function() {
  document.getElementById('payment_area').innerHTML = `
  <div class="cash-payment-form mx-auto" style="max-width: 400px;">
    <h3 class="mb-3 text-center">Cash Payment Information</h3>
    <form id="payment-form-cash">
      <div class="form-group">
        <label for="amount-paid" class="text-center">Amount Paid (Rs):</label>
        <input type="number" id="amount-paid" name="amount-paid" required class="form-control w-25 mx-auto">
      </div>
      <div class="form-group">
        <label for="bill-amount" class="text-center">Bill Amount (Rs):</label>
        <p id="bill-amount" class="form-control-plaintext w-25 mx-auto">${cartTotal}</p>
      </div>
      <div class="form-group">
        <label for="balance" class="text-center">Balance (Rs):</label>
        <p id="balance" class="form-control-plaintext w-25 mx-auto"></p>
      </div>
      <button class="btn btn-primary mx-auto d-block mt-3" id="pay-now-btn-cash">Pay</button>
    </form>
  </div>
  `;

  document.getElementById('payment-form-cash').addEventListener('submit', function(event) {
    event.preventDefault();
  });

  document.getElementById('pay-now-btn-cash').addEventListener('click', getBalanceCash);
});

function getBalanceCash(){
  const paidVal = document.getElementById("amount-paid").value;
  document.getElementById("balance").innerText = paidVal - cartTotal;
  console.log("Payment Done")
}

function getBalanceCard(){
  console.log("Payment Done")
}