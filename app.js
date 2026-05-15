firebase.initializeApp({
  apiKey: "AIzaSyD2y_gXSvYFe4OIXkns2Euwcgk73DV83fw",
  authDomain: "junior-beats-store.firebaseapp.com",
  projectId: "junior-beats-store"
});

const db = firebase.firestore();
const store = document.getElementById("store");

/* =========================
   LOAD BEATS
========================= */
function loadBeats() {
  db.collection("beats").onSnapshot(snapshot => {
    store.innerHTML = "";

    snapshot.forEach(doc => {
      const b = doc.data();

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

        <button onclick="openCheckout(
          '${b.title}',
          ${b.price},
          ${b.tempo || 0},
          '${b.wavFile}'
        )">
          Buy Now
        </button>
      `;

      store.appendChild(card);
    });
  });
}

/* =========================
   CHECKOUT SYSTEM
========================= */
function openCheckout(title, price, tempo, wavFile) {

  const email = prompt("Enter your email:");

  if (!email) {
    alert("Email required to continue.");
    return;
  }

  // Save purchase to Firebase (pending)
  db.collection("purchases").add({
    beatTitle: title,
    email: email,
    amount: price,
    file: wavFile,
    status: "pending",
    createdAt: Date.now()
  });

  // PayPal link (auto price)
  const payLink =
    "https://www.paypal.com/paypalme/jayanreid07/" + price;

  // Return to success page with data
  const successURL =
    window.location.origin +
    "/success.html?file=" +
    encodeURIComponent(wavFile) +
    "&email=" +
    encodeURIComponent(email);

  // Redirect to PayPal
  window.location.href =
    payLink + "?return=" + encodeURIComponent(successURL);
}

/* =========================
   INIT
========================= */
window.onload = loadBeats;
