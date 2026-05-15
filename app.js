firebase.initializeApp({
  apiKey: "AIzaSyD2y_gXSvYFe4OIXkns2Euwcgk73DV83fw",
  authDomain: "junior-beats-store.firebaseapp.com",
  projectId: "junior-beats-store"
});

const db = firebase.firestore();

const store = document.getElementById("store");

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

        <p>$${b.price}</p>

        <a href="${b.buyLink}" target="_blank">
          <button>Buy Now</button>
        </a>
      `;

      store.appendChild(card);
    });

  });
}

window.onload = loadBeats;
