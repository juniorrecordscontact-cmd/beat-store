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
let cart = [];

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

        const card = document.createElement("div");
        card.className = "beat-card";

        card.innerHTML = `
          <img src="${b.image}" />

          <h3>${b.title}</h3>

          <audio controls onplay="setPlayer('${b.title}', this)">
            <source src="${b.previewFile}" />
          </audio>

          <p>🎵 ${b.tempo || "N/A"} BPM</p>
          <p>💰 $${b.price}</p>

          <!-- ADD TO CART BUTTON (FIXED & CLEAR) -->
          <button onclick="addToCart('${b.title}', ${b.price}, '${b.wavFile}')">
            Add To Cart 🛒
          </button>
        `;

        store.appendChild(card);
      });

    });
}

/* =========================
   AUDIO PLAYER
========================= */
function setPlayer(title, audio) {

  document.getElementById("nowPlaying")
    .innerText = "Now Playing: " + title;

  if (currentAudio && currentAudio !== audio) {
    currentAudio.pause();
  }

  currentAudio = audio;
}

/* =========================
   ADD TO CART
========================= */
function addToCart(title, price, wavFile) {

  cart.push({
    title,
    price,
    wavFile
  });

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

        <button class="removeBtn" onclick="removeItem(${index})">
          Remove
        </button>

      </div>
    `;
  });

  cartTotal.innerText = "Total: $" + total;
}

/* =========================
   REMOVE ITEM
========================= */
function removeItem(index) {
  cart.splice(index, 1);
  renderCart();
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
window.onload = loadBeats;
