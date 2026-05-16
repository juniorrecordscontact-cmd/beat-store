
const db = firebase.firestore();

/* =========================
   LOAD SETTINGS (SAFE)
========================= */
db.collection("settings").doc("site").get().then(doc => {
  const s = doc.data();
  if (!s) return;

  if (s.logo) document.getElementById("logo").src = s.logo;
  if (s.storeName) document.getElementById("storeTitle").innerText = s.storeName;
  if (s.slogan) document.getElementById("slogan").innerText = s.slogan;
});


/* =========================
   LOAD BEATS (FIXED GENRES)
========================= */
db.collection("beats").onSnapshot(snapshot => {

  const store = document.getElementById("store");
  store.innerHTML = "";

  snapshot.forEach(doc => {

    const b = doc.data();

    // 🔥 SAFE GENRE HANDLING (FIX)
    let genres = [];

    if (Array.isArray(b.genres)) {
      genres = b.genres;
    } else if (typeof b.genres === "string") {
      genres = b.genres.split(",").map(g => g.trim());
    }

    store.innerHTML += `
      <div class="beat">

        <h3>${b.title || "No Title"}</h3>

        <p>By ${b.producer || "Unknown"}</p>

        <p>$${b.price || 0} • ${b.tempo || ""} BPM</p>

        <!-- 🔥 GENRES DISPLAY -->
        <div class="genreWrap">
          ${
            genres.length > 0
              ? genres.map(g => `<span class="genre">${g}</span>`).join("")
              : ""
          }
        </div>

        <!-- KEEP YOUR EXISTING CART FUNCTION -->
        <button onclick="addToCart('${doc.id}')">Add to Cart</button>

      </div>
    `;
  });
});


/* =========================
   CART FUNCTIONS (UNCHANGED)
   (assuming you already have them elsewhere)
========================= */

function checkoutCart(){
  // your existing checkout logic
}

function addToCart(id){
  // your existing cart logic
}


/* =========================
   PLAYER (UNCHANGED HOOK)
========================= */

function playBeat(url){
  document.getElementById("nowPlaying").innerText = "Playing...";
  // your existing player logic
}
