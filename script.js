const container = document.getElementById("beat-container");

function loadBeats() {
  let beats = JSON.parse(localStorage.getItem("beats")) || [];

  container.innerHTML = "";

  if (beats.length === 0) {
    container.innerHTML = "<p>No beats available yet. Stay tuned 🔥</p>";
    return;
  }

  beats.forEach(beat => {
    const div = document.createElement("div");
    div.classList.add("beat");

    div.innerHTML = `
      <h2>${beat.title}</h2>
      <p>${beat.price}</p>
      <p>Instant delivery via email after purchase</p>
      <audio controls controlsList="nodownload">
        <source src="${beat.file}" type="audio/mpeg">
      </audio>
      <br>
      <button onclick="window.location.href='${beat.buyLink}'">
        Buy Now
      </button>
    `;

    container.appendChild(div);
  });
}

loadBeats();
