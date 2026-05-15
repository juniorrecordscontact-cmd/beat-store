firebase.initializeApp({
  apiKey: "AIzaSyD2y_gXSvYFe4OIXkns2Euwcgk73DV83fw",
  authDomain: "junior-beats-store.firebaseapp.com",
  projectId: "junior-beats-store"
});

const db = firebase.firestore();
const store = document.getElementById("store");

/* =========================
   GLOBAL PLAYER
========================= */
let currentAudio = null;

/* =========================
   LOAD BEATS
========================= */
function loadBeats(){

  db.collection("beats")
  .orderBy("createdAt","desc")
  .onSnapshot(snapshot=>{

    store.innerHTML="";

    snapshot.forEach(doc=>{

      const b = doc.data();

      const card = document.createElement("div");
      card.className="beat-card";

      card.innerHTML=`

        <img src="${b.image}" />

        <h3>${b.title}</h3>

        <audio controls
          onplay="setPlayer('${b.title}', this)">
          <source src="${b.previewFile}" />
        </audio>

        <p>🎵 ${b.tempo || "N/A"} BPM</p>

        <p>💰 $${b.price}</p>

        <button onclick="openCheckout(
          '${b.title}',
          ${b.price},
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
   FLOATING PLAYER
========================= */
function setPlayer(title, audio){

  document.getElementById("nowPlaying")
  .innerText = "Now Playing: " + title;

  if(currentAudio && currentAudio !== audio){
    currentAudio.pause();
  }

  currentAudio = audio;
}

/* =========================
   CHECKOUT
========================= */
function openCheckout(title, price, wavFile){

  const email = prompt("Enter your email:");

  if(!email) return;

  db.collection("purchases").add({
    beatTitle:title,
    email:email,
    amount:price,
    file:wavFile,
    status:"pending",
    createdAt:Date.now()
  });

  const payLink =
    "https://www.paypal.com/paypalme/jayanreid07/" + price;

  const successURL =
    window.location.origin +
    "/success.html?email=" +
    encodeURIComponent(email) +
    "&file=" +
    encodeURIComponent(wavFile);

  window.location.href =
    payLink + "?return=" + encodeURIComponent(successURL);
}

/* =========================
   INIT
========================= */
window.onload = loadBeats;
