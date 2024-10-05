const date = new Date();
const year = date.getFullYear();
const month = String(date.getMonth() + 1).padStart(2, "0");
const day = String(date.getDate()).padStart(2, "0");
const hour = String(date.getHours()).padStart(2, "0");
const minute = String(date.getMinutes()).padStart(2, "0");
const second = String(date.getSeconds()).padStart(2, "0");

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

document.getElementById("paymentCard").addEventListener("click", function () {
  document.getElementById("payment_area").innerHTML = `
  <div class="card-payment-form mx-auto text-center" style="max-width: 400px;">
      <h3 class="mb-3 text-center">Card Payment Information</h3>
      <form id="payment-form-card">
          <div class="form-group">
              <label for="card-number" aria-label="Card Number">
                  <span>Card Number:</span>
                  <input type="text" id="card-number" name="card-number" placeholder="1234 5678 9012 3456"
                      required aria-required="true" class="form-control w-100 mx-auto">
              </label>
          </div>
          <div class="form-group mt-3">
              <label for="card-expiry" aria-label="Expiry Date">
                  <span>Expiry Date:</span>
                  <input type="month" id="card-expiry" name="card-expiry" required aria-required="true"
                      class="form-control w-100 mx-auto">
              </label>
          </div>
          <div class="form-group mt-3">
              <label for="card-cvv" aria-label="CVV">
                  <span>CVV:</span>
                  <input type="number" id="card-cvv" name="card-cvv" placeholder="123" required
                      aria-required="true" class="form-control w-100 mx-auto">
              </label>
          </div>
          <div class="form-group mt-3">
              <label for="card-holder-name" aria-label="Cardholder Name">
                  <span>Cardholder Name:</span>
                  <input type="text" id="card-holder-name" name="card-holder-name" required aria-required="true"
                      class="form-control w-100 mx-auto">
              </label>
          </div>
          <div class="text-center mt-4">
              <button class="w-25 py-2 me-3 rounded-3 px-3 text-white bgd-yellow border-0"
                  id="paymentCard" onClick="cardPaymentPayBtn()">Pay</button>
          </div>
      </form>
  </div>
  `;
  stopRefresh("paymentCard");
});

document.getElementById("paymentCash").addEventListener("click", function () {
  document.getElementById("payment_area").innerHTML = `
  <div class="card-payment-form mx-auto text-center" style="max-width: 400px;">
    <h3 class="mb-3 text-center">Cash Payment Information</h3>
    <form id="cash-payment-form">
      <div class="form-group">
        <label for="amount-paid" aria-label="Amount Paid">
          <span>Amount Paid: (Rs)</span>
          <input type="text" id="amount-paid" name="amount-paid" placeholder="Rs. " required aria-required="true" class="form-control w-100 mx-auto">
        </label>
      </div>
      <div class="form-group mt-3">
        <label for="bill-amount" aria-label="Bill Amount">
          <span>Bill Amount: (Rs)</span>
          <input type="text" id="bill-amount" name="bill-amount" value="${cartTotal}" readonly="true" class="form-control w-100 mx-auto">
        </label>
      </div>
      <div class="form-group mt-3">
        <label for="balance-amount" aria-label="Balance Amount">
          <span>Balance: (Rs)</span>
          <input type="text" id="balance-amount" name="balance-amount" required aria-required="true" class="form-control w-100 mx-auto" readonly="true">
        </label>
      </div>
      <div class="text-center mt-4">
        <button class="w-25 py-2 me-3 rounded-3 px-3 text-white bgd-yellow border-0" id="done-button" onClick="cashPaymentDoneBtn()">Done</button>
      </div>
    </form>
  </div>
  `;

  const amoutPaidTextBox = document.getElementById("amount-paid");
  const balanceTextBox = document.getElementById("balance-amount");

  amoutPaidTextBox.addEventListener("input", function (event) {
    balanceTextBox.value = amoutPaidTextBox.value - cartTotal;
  });

  stopRefresh("done-button");
});

function cardPaymentPayBtn() {
  const cardNumber = document.getElementById("card-number").value;
  const cardExpiry = document.getElementById("card-expiry").value;
  const cardCvv = document.getElementById("card-cvv").value;

  if (!validateCardNumber(cardNumber)) {
    alert("Invalid Card Number");
  } else if (validateExpirationDate(cardExpiry)) {
    alert("Invalid Card Expiry Date");
  } else if (!validateCVV(cardCvv)) {
    alert("Invalid Card CVV");
  } else {
    alert("Payment Successful");
    
    downloadPDF();
    window.location.href = "../dashboard/dashboard.html";

    let purchases = JSON.parse(sessionStorage.getItem('purchases')) || [];
    purchases.push({
      "Date": year + "-" + month + "-" + day,
      "Time": hour + ":" + minute + ":" + second,
      "Cashier": JSON.parse(sessionStorage.getItem("Cashier")),
      "NumberOfItems": cart.length,
      "Total": cartTotal,
      "TotalDiscounts": totalDiscounts,
      "GrandTotal": cartTotal + totalDiscounts,
      "Cart": cart
    });
    sessionStorage.setItem('purchases', JSON.stringify(purchases));
  }
}

function cashPaymentDoneBtn() {
  if (document.getElementById("balance-amount").value >= 0) {
    alert("Payment Successful");
    
    downloadPDF();
    window.location.href = "../dashboard/dashboard.html";

    let purchases = JSON.parse(sessionStorage.getItem('purchases')) || [];
    purchases.push({
      "Date": year + "-" + month + "-" + day,
      "Time": hour + ":" + minute + ":" + second,
      "Cashier": JSON.parse(sessionStorage.getItem("Cashier")),
      "NumberOfItems": cart.length,
      "Total": cartTotal,
      "TotalDiscounts": totalDiscounts,
      "GrandTotal": cartTotal + totalDiscounts,
      "Cart": cart
    });
    sessionStorage.setItem('purchases', JSON.stringify(purchases));
  }
}

function downloadPDF() {
  let billText = `                         MOS Burgers\n
Date: ${year}-${month}-${day}   Time: ${hour}:${minute}:${second}
----------------------------------------------------------------
  ID  |       Item Title       |Qty|  Unit Price  |    Total    
----------------------------------------------------------------\n`;

  cart.forEach((item) => {
    const unitPrice = parseFloat(item[0].price);
    const originalPrice = unitPrice * item[1];
    const discount =
      item[0].discount > 0 ? (unitPrice * item[0].discount) / 100 : 0;
    const price = originalPrice - discount;

    cartTotal += price;
    totalDiscounts += discount;
    itemName =
      item[0].title.toString().length > 22
        ? item[0].title.toString().substring(0, 19) + "..."
        : item[0].title.toString();

    billText += `${item[0].item_code.padEnd(5)} | ${itemName.padEnd(
      22
    )} | ${item[1].toString().padEnd(1)} | Rs. ${unitPrice
      .toFixed(2)
      .padStart(8)} | Rs. ${price.toFixed(2).padStart(8)}\n`;
  });

  billText += `----------------------------------------------------------------\n
   No of Items : ${cart.length}
   Sub Total   : Rs. ${(cartTotal + totalDiscounts).toFixed(2)}
   Discounts   : Rs. ${totalDiscounts.toFixed(2)}
   Grand Total : Rs. ${cartTotal.toFixed(2)}\n
   
                  THANK YOU FOR SHOPPING WITH US!`;

  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();
  doc.setFont("courier");
  doc.setFontSize(14);
  doc.text(billText, 10, 10);
  doc.save(`${year}-${month}-${day}_${hour}-${minute}-${second}.pdf`);
}

function validateCardNumber(cardNumber) {
  if (cardNumber.length < 13 || cardNumber.length > 19) {
    return false;
  }
  return true;
}

function validateExpirationDate(expirationDate) {
  const [month, year] = expirationDate.split("/");
  const expirationDateObject = new Date(`${year}-${month}-01`);
  return expirationDateObject >= new Date();
}

function validateCVV(cvv) {
  return cvv.length === 3 || cvv.length === 4;
}

function stopRefresh(idName) {
  const button = document.getElementById(idName);
  button.addEventListener("click", function (event) {
    event.preventDefault();
  });
}
