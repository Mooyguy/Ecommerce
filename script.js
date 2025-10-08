const products = [
  {id: 1, name: "Ring", price: 9900, img: "https://images.pexels.com/photos/10421147/pexels-photo-10421147.jpeg"},
  {id: 2, name: "Shoe", price: 120, img: "https://images.pexels.com/photos/1537671/pexels-photo-1537671.jpeg"},
  {id: 3, name: "Skate", price: 200, img: "https://images.pexels.com/photos/7575974/pexels-photo-7575974.jpeg"},
  {id: 4, name: "Watch", price: 250, img: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400"},
  {id: 5, name: "Camera", price: 2880, img: "https://images.pexels.com/photos/51383/photo-camera-subject-photographer-51383.jpeg"},
  {id: 1, name: "Ring", price: 9900, img: "https://images.pexels.com/photos/10421147/pexels-photo-10421147.jpeg"},
  {id: 2, name: "Shoe", price: 120, img: "https://images.pexels.com/photos/1537671/pexels-photo-1537671.jpeg"},
  {id: 3, name: "Skate", price: 200, img: "https://images.pexels.com/photos/7575974/pexels-photo-7575974.jpeg"},
  {id: 4, name: "Watch", price: 250, img: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400"},
  {id: 5, name: "Camera", price: 2880, img: "https://images.pexels.com/photos/51383/photo-camera-subject-photographer-51383.jpeg"},
];

let cart = [];

function signIn() {
  const user = document.getElementById("username").value;
  const pass = document.getElementById("password").value;

  const validUser = "admin";
  const validPass = "12345";

  if (user === validUser && pass === validPass) {
    showPage("productPage");
  } else {
    alert("Invalid username or password! Try again.");
  }
}

function enterStorefront() {
  showPage("productPage");
  document.getElementById("cartCount").textContent = cart.length;
}

function showPage(pageId) {
  document.querySelectorAll(".page").forEach(p => p.classList.remove("active"));
  document.getElementById(pageId).classList.add("active");
  if(pageId === "cartPage") updateCart();
  if(pageId === "checkoutPage") {
    document.getElementById("checkoutTotal").textContent = getTotal();
  }
}

function displayProducts() {
  const productList = document.getElementById("productList");
  productList.innerHTML = "";
  products.forEach(p => {
    productList.innerHTML += `
      <div class="product">
        <img src="${p.img}" alt="${p.name}">
        <h3>${p.name}</h3>
        <p>${p.price.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</p>
        <button onclick="addToCart(${p.id})">Add to Cart</button>
      </div>`;
  });
}

function addToCart(id) {
  const product = products.find(p => p.id === id);
  cart.push(product);
  document.getElementById("cartCount").textContent = cart.length;
}

function removeFromCart(index) {
  cart.splice(index, 1);
  updateCart();
}

function updateCart() {
  const cartItems = document.getElementById("cartItems");
  cartItems.innerHTML = "";
  cart.forEach((item, i) => {
    cartItems.innerHTML += `
      <div>
        ${item.name} - ${item.price.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
        <button class="remove" onclick="removeFromCart(${i})">Remove</button>
      </div>`;
  });
  document.getElementById("totalCost").textContent = getTotal();
  document.getElementById("cartCount").textContent = cart.length;
}

function getTotal() {
  return cart.reduce((sum, item) => sum + item.price, 0).toLocaleString('en-US', { style: 'currency', currency: 'USD' });
}

function confirmPurchase() {
  alert("Purchase Confirmed! Thank you.");
  cart = [];
  document.getElementById("cartCount").textContent = 0;
  showPage("productPage");
}

displayProducts();
