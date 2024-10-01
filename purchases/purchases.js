const purchases = JSON.parse(sessionStorage.getItem("purchases")) || [];
const purchaseList = document.getElementById("tableBody");

document.getElementById("lblCashier").innerText = JSON.parse(
  sessionStorage.getItem("Cashier")
);

netTotalSales = 0;
totalSalesDiscounts = 0;
grandTotalSales = 0;
totalItemsSold = 0;

for (let i = 0; i < purchases.length; i++) {
  purchaseList.innerHTML += `
    <tr>
    <td>${i+1}</td>
    <td>${purchases[i].Date}</td>
    <td>${purchases[i].Time}</td>
    <td>${purchases[i].Cashier}</td>
    <td>${purchases[i].NumberOfItems}</td>
    <td>${purchases[i].Total}</td>
    <td>${purchases[i].TotalDiscounts}</td>
    <td>${purchases[i].GrandTotal}</td>
</tr>`;

netTotalSales += purchases[i].Total;
totalSalesDiscounts += purchases[i].TotalDiscounts;
grandTotalSales += purchases[i].GrandTotal;
totalItemsSold += purchases[i].NumberOfItems;
}

document.getElementById("netTotalSales").innerText = netTotalSales;
document.getElementById("totalSalesDiscounts").innerText = totalSalesDiscounts;
document.getElementById("grandTotalSaled").innerText = grandTotalSales;
document.getElementById("totalItemsSold").innerText = totalItemsSold;

const tableBody = document.getElementById("tableBody");

tableBody.addEventListener("click", function (event) {
  const targetRow = event.target.closest("tr");
  if (targetRow) {
    setModelData(targetRow.cells[0].textContent - 1);

    var modal = new bootstrap.Modal(document.getElementById("cartModel"));
    modal.show();
  }
});

function setModelData(id) {
  orderCode = `
    <div class="mt-4">
        <ul id="order-items" class="list-group list-group-flush">
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
        </ul>
    </div>
    `;
  purchases[id].Cart.forEach((item) => {
    const originalPrice = item[0].price * item[1];
    const discount =
      item[0].discount > 0 ? (item[0].price * item[0].discount) / 100 : 0;
    const price = originalPrice - discount;

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
  console.log(orderCode);

  document.getElementById("modelData").innerHTML = orderCode;
}
