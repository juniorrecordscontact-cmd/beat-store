const beats = [
  {
    title: "Summer Guitar Beat",
    price: 25,
    previewFile: "https://www.dropbox.com/scl/fi/3n3sfuytmc7flqn5wxal6/115-BPM-Summer-Guitar.mp3?rlkey=syfcxzuokrclnb7ksnarm1xey&raw=1",
    wavFile: "https://www.dropbox.com/scl/fi/a0njsx2e82ybvs3dik7zz/115-BPM-Summer-Guitar.wav?rlkey=lw6ftovagn0wcjj9skl7e4uxr&raw=1",
    image: "https://www.dropbox.com/scl/fi/ksun4elxr76vvoqlmltst/guitar.jpg?rlkey=djhn73qvr0g5vt6gknw22uwcb&raw=1",
    buyLink: "https://www.paypal.com/paypalme/jayanreid07/25"
  }
];

function renderBeats() {
  const store = document.getElementById("store");

  // safety check (prevents blank page crash)
  if (!store) {
    console.error("Missing #store in HTML");
    return;
  }

  store.innerHTML = "";

  beats.forEach(beat => {
    const card = document.createElement("div");

    card.innerHTML = `
      <h3>${beat.title}</h3>

      <img src="${beat.image}" width="200">

      <audio controls src="${beat.previewFile}"></audio>

      <p>$${beat.price}</p>

      <a href="${beat.buyLink}" target="_blank">
        <button>Buy Now</button>
      </a>
    `;

    store.appendChild(card);
  });
}

// wait until page fully loads
window.addEventListener("DOMContentLoaded", renderBeats);
