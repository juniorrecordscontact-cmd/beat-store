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
   CHECKOUT (FREE SYSTEM)
========================= */
function openCheckout(title, price, tempo, wavFile) {

  const email = prompt("Enter your email:");
  if (!email) return;

  // Save purchase as pending
  db.collection("purchases").add({
    beatTitle: title,
    email: email,
    amount: price,
    file: wavFile,
    status: "pending",
    createdAt: Date.now()
  });

  // PayPal link (automatic price)
  const payLink =
    "https://www.paypal.com/paypalme/jayanreid07/" + price;

  // Success page redirect (NO backend verification)
  const successURL =
    window.location.origin +
    "/success.html?email=" +
    encodeURIComponent(email) +
    "&file=" +
    encodeURIComponent(wavFile);

  // Redirect to PayPal
  window.location.href =
    payLink + "?return=" + encodeURIComponent(successURL);
}

/* =========================
   INIT
========================= */
window.onload = loadBeats;
