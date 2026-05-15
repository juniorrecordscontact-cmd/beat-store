const beats = [
  {
    title: "TEST BEAT",
    price: 25,

    // IMPORTANT: must be raw links
    previewFile: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    image: "https://images.unsplash.com/photo-1511379938547-c1f69419868d",

    buyLink: "https://www.paypal.com/paypalme/jayanreid07/25"
  }
];

function renderBeats() {
  const store = document.getElementById("store");

  console.log("STORE FOUND:", store);

  store.innerHTML = "";

  beats.forEach(b => {
    const card = document.createElement("div");
    card.className = "beat-card";

    card.innerHTML = `
      <img src="${b.image}" onerror="console.log('IMAGE FAILED')">

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
}

window.addEventListener("DOMContentLoaded", renderBeats);
