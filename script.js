const tracks = [
    {
      title: "Track One",
      file: "audio/Back2Black.mp3",
      credits: ["Mixing", "Mastering", "Writing"]
    },
    {
      title: "Track Two",
      file: "audio/HOOTS.mp3",
      credits: ["Producing", "Session Keys"]
    },
    {
      title: "Track Three",
      file: "audio/tonightnogood.mp3",
      credits: ["Mixing", "Producing", "Writing"]
    }
  ];
  
  const trackListEl = document.getElementById("track-list");
  const player = document.getElementById("player");
  const checkboxes = document.querySelectorAll(".filters input[type='checkbox']");
  
  function renderTracks() {
    const activeFilters = [...checkboxes]
      .filter(cb => cb.checked)
      .map(cb => cb.value);
  
    trackListEl.innerHTML = "";
  
    const filtered = tracks.filter(track =>
      track.credits.some(credit => activeFilters.includes(credit))
    );
  
    filtered.forEach(track => {
      const div = document.createElement("div");
      div.className = "track";
      div.innerHTML = `
        <div class="track-title">${track.title}</div>
        <div class="track-credits">${track.credits.join(", ")}</div>
      `;
      div.onclick = () => {
        if (player.src !== location.href + track.file) {
          player.src = track.file;
          player.play();
        } else {
          player.paused ? player.play() : player.pause();
        }
      };
      trackListEl.appendChild(div);
    });
  }
  
  checkboxes.forEach(cb => cb.addEventListener("change", renderTracks));
  
  renderTracks();