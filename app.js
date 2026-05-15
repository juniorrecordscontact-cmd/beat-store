firebase.initializeApp({
  apiKey: "AIzaSyD2y_gXSvYFe4OIXkns2Euwcgk73DV83fw",
  authDomain: "junior-beats-store.firebaseapp.com",
  projectId: "junior-beats-store"
});

const db = firebase.firestore();
const store = document.getElementById("store");

/* LOAD BEATS FROM FIRESTORE */
function loadBeats() {
  db.collection("beats").onSnapshot(snapshot => {
    store.innerHTML = "";

    snapshot.forEach(doc => {
      const b = doc.data();

      const card = document.createElement("div");
      card.className = "beat-card";

      card.innerHTML = `
        <img src="${b.image}">

        <h3>${b.title}</h3>

        <audio controls>
          <source src="${b.previewFile}">
        </audio>

        <p>🎵 ${b.tempo || "N/A"} BPM</p>
        <p>💰 $${b.price}</p>

        <button onclick="openCheckout(
          '${b.title}',
          ${b.price},
          ${b.tempo || 0},
          '${b.buyLink}'
        )">
          Buy Now
        </button>
      `;

      store.appendChild(card);
    });
  });
}

/* CHECKOUT POPUP */
function openCheckout(title, price, tempo, payLink) {

  const overlay = document.createElement("div");

  overlay.style = `
    position:fixed;
    top:0;left:0;
    width:100%;height:100%;
    background:rgba(0,0,0,0.85);
    display:flex;
    justify-content:center;
    align-items:center;
    z-index:9999;
  `;

  overlay.innerHTML = `
    <div style="
      background:#111;
      padding:25px;
      border-radius:12px;
      width:300px;
      text-align:center;
      color:white;
    ">
      <h2>${title}</h2>
      <p>Tempo: ${tempo} BPM</p>
      <p>Price: $${price}</p>

      <button id="confirmPay" style="
        margin-top:10px;
        padding:10px;
        width:100%;
        border:none;
        border-radius:8px;
        background:white;
        color:black;
        cursor:pointer;
      ">
        Confirm & Pay
      </button>

      <button onclick="this.closest('div').remove()" style="
        margin-top:10px;
        padding:10px;
        width:100%;
        border:none;
        border-radius:8px;
        background:#333;
        color:white;
        cursor:pointer;
      ">
        Cancel
      </button>
    </div>
  `;

  document.body.appendChild(overlay);

  document.getElementById("confirmPay").onclick = () => {
    window.location.href = payLink;
  };
}

/* INIT */
window.onload = loadBeats;
