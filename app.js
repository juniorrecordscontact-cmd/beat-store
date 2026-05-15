const beats = [
  {
    title: "Summer Guitar Beat",
    price: 25,
    previewFile: "https://www.dropbox.com/scl/fi/3n3sfuytmc7flqn5wxal6/115-BPM-Summer-Guitar.mp3?raw=1",
    wavFile: "https://www.dropbox.com/scl/fi/a0njsx2e82ybvs3dik7zz/115-BPM-Summer-Guitar.wav?raw=1",
    image: "https://www.dropbox.com/scl/fi/ksun4elxr76vvoqlmltst/guitar.jpg?raw=1",
    buyLink: "https://www.paypal.com/paypalme/jayanreid07/25"
  }
];

function renderBeats() {
  const store = document.getElementById("store");

  if (!store) {
    console.error("NO STORE FOUND");
    return;
  }

  store.innerHTML = "";

  beats.forEach(b => {
    const card = document.createElement("div");
    card.className = "beat-card";

    card.innerHTML = `
      <img src="${b.image}" />
      <h3>${b.title}</h3>
      <audio controls src="${b.previewFile}"></audio>
      <p>$${b.price}</p>
      <a href="${b.buyLink}" target="_blank">
        <button>Buy Now</button>
      </a>
    `;

    store.appendChild(card);
  });
}

window.addEventListener("DOMContentLoaded", renderBeats);
