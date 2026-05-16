firebase.initializeApp({
  apiKey: "AIzaSyD2y_gXSvYFe4OIXkns2Euwcgk73DV83fw",
  authDomain: "junior-beats-store.firebaseapp.com",
  projectId: "junior-beats-store"
});

const db = firebase.firestore();

const store = document.getElementById("store");
const cartItems = document.getElementById("cartItems");
const cartTotal = document.getElementById("cartTotal");

let currentAudio = null;
let cart = JSON.parse(localStorage.getItem("cart")) || [];

function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

/* =========================
   LOAD SLOGAN (🔥 NEW)
========================= */
function loadSlogan() {
  db.collection("settings").doc("site").onSnapshot(doc => {
    const data = doc.data();
    document.getElementById("slogan").innerText =
      data?.slogan || "By Jayan Reid";
  });
}

/* =========================
   LOAD BEATS
========================= */
function loadBeats() {

  db.collection("beats")
    .orderBy("createdAt", "desc")
    .onSnapshot(snapshot => {

      store.innerHTML = "";

      snapshot.forEach(doc => {

        const b = doc.data();
        const id = doc.id;

        const inCart = cart.some(item => item.id === id);

        const btnText = inCart
          ? "Remove ❌"
          : "Add 🛒";

        const card = document.createElement("div");
        card.className = "beat-card";

        card.innerHTML = `
          <img src="${b.image}" />

          <h3>${b.title}</h3>

          <audio controls>
            <source src="${b.previewFile}" />
          </audio>

          <p>🎵 ${b.tempo || "N/A"} BPM</p>
          <p>💰 $${b.price}</p>

          <button onclick="toggleCart('${id}', '${b.title}', ${b.price}, '${b.wavFile}')">
            ${btnText}
          </button>
        `;

        store.appendChild(card);
      });

    });
}

/* =========================
   TOGGLE CART
========================= */
function toggleCart(id, title, price, wavFile) {

  const index = cart.findIndex(item => item.id === id);

  if (index > -1) {
    cart.splice(index, 1);
  } else {
    cart.push({ id, title, price, wavFile });
  }

  saveCart();
  renderCart();
}

/* =========================
   CART RENDER
========================= */
function renderCart() {

  cartItems.innerHTML = "";

  let total = 0;

  cart.forEach((item, index) => {

    total += item.price;

    cartItems.innerHTML += `
      <div class="cartItem">

        <div>
          <b>${item.title}</b> — $${item.price}
        </div>

        <button onclick="toggleCart('${item.id}', '${item.title}', ${item.price}, '${item.wavFile}')">
          Remove
        </button>

      </div>
    `;
  });

  cartTotal.innerText = "Total: $" + total;
}

/* =========================
   CHECKOUT
========================= */
function checkoutCart() {

  if (cart.length === 0) {
    alert("Cart is empty.");
    return;
  }

  const email = prompt("Enter your email:");
  if (!email) return;

  let total = 0;

  cart.forEach(item => {

    total += item.price;

    db.collection("purchases").add({
      beatTitle: item.title,
      email: email,
      amount: item.price,
      file: item.wavFile,
      status: "pending",
      createdAt: Date.now()
    });

  });

  const payLink =
    "https://www.paypal.com/paypalme/jayanreid07/" + total;

  window.location.href = payLink;
}

/* =========================
   INIT
========================= */
window.onload = function () {
  loadBeats();
  renderCart();
  loadSlogan();
};
