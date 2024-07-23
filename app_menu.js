let code = "";

burgers = [
    {
        "img": "topburger",
        "title": "Classic Cheeseburger",
        "description": "Beef patty with cheese,<br> lettuce, and pickles.",
        "price": "150",
    },
    {
        "img": "burger2",
        "title": "BBQ Bacon Burger",
        "description": "Beef patty with bacon,<br> BBQ sauce, and cheese.",
        "price": "200",
    },
    {
        "img": "burger3",
        "title": "Veggie Delight",
        "description": "Veggie patty with<br> veggies and mayo.",
        "price": "180",
    },
    {
        "img": "burger4",
        "title": "Spicy Chicken Burger",
        "description": "Chicken patty with<br> tomatoe and spicy sauce.",
        "price": "170",
    },
    {
        "img": "burger5",
        "title": "Mushroom Swiss Burger",
        "description": "Beef patty with <br> and Swiss cheese.",
        "price": "190",
    },
    {
        "img": "burger6",
        "title": "Double Patty Burger",
        "description": "Two beef patties with<br> cheese and sauce.",
        "price": "250",
    },
]


burgers.forEach((item) => {
  code += `<div class="col-lg-4 col-md-4 col-sm-6 col-12 my-2 p-3 p-sm-3 p-md-4 p-lg-5">  
  <div class="card bgd-black btn-shadow h-100">
        <img src="Assets/img/${item.img}.svg" class="position-absolute end-50"
        style="width: 60%; bottom: -20%;"
            alt="product">
        <div class="card-body text-end">
            <p class="font-kavoon text-white">${item.title}</p>
            <p id="product_discription" class="ms-5 card-text text-white">${item.description}</p>
            <h4 id="product_price" class="text-yellow ">Rs. ${item.price}</h4>
        </div>
    </div>
</div>`;
});

document.getElementById("product_grid").innerHTML = code;
