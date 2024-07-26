orders = [1, 2, 3, 4, 5, 6];

orderCode = "";
orders.forEach((element) => {
  orderCode += `<div class="col-12 col-md-6">
                    <div class="bgd-black p-3 m-3 rounded-3 text-white box-shadow">
                        <div class="container">
                            <div class="row">
                                <div class="col-12 col-sm-6">
                                    <h5 class="font-kavoon">Order ID: 100${element}</h5>
                                    <ul class="list-unstyled text-white">
                                        <li>Item 1: Product Name</li>
                                        <li>Item 2: Product Name</li>
                                        <li>Item 3: Product Name</li>
                                        <li>Item 4: Product Name</li>
                                    </ul>
                                </div>
                                <div class="col-12 col-sm-6">
                                    <div>
                                        <h6 class="mb-2">
                                            <span class="d-block">Address :</span>
                                            <span class="text-wrap text-break">177/14 Cyril Janz Road, Panadura</span>
                                        </h6>
                                        <div class="order-status">
                                            <h6>Status: <span>In Process</span></h6>
                                            <h6>Payment Method: <span>Cash on Delivery</span></h6>
                                            <h4 class="text-right"><span class="text-yellow">Rs. 125</span></h4>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>`;
});

document.getElementById("orderGrid").innerHTML = orderCode;
