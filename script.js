//const roles = ["Mixing", "Mastering", "Producing", "Writing", "Session Keys", "Saxophone"];
//const genres = ["Pop", "Rock", "Electronic", "Jazz", "Funk"];

// Generate roles and genres dynamically
const roles = new Set();
const genres = new Set();

const tracks = [
  {
    title: "Gloryhammer - Wasteland Warrior Hoots Patrol",
    file: "audio/HOOTS.mp3",
    artwork: "img/GH_WWHP.jpg",
    credits: ["Saxophone"],
    genres: ["Rock", "Power Metal"],
    //disclaimer: "Not the official mix.\nCourtesy of XYZ Academy."
  },
  {
    title: "Suite Clarity - Led To Disgrace",
    file: "audio/SuiteClarity.m4a",
    artwork: "img/convergence.jpg",
    credits: ["Keyboards"],
    genres: ["Progressive Rock"]
  },
  {
    title: "Last II - Black Hole",
    file: "audio/BlackHole.mp4",
    artwork: "img/last2.jpg",
    credits: ["Keyboards"],
    genres: ["Rock", "Metal"]
  },
  {
    title: "FXRLY - I'll Be There",
    file: "audio/bthere.mp3",
    artwork: "img/FXLRY.jpg",
    credits: ["Keyboards"],
    genres: ["Pop Punk"]
  },
  {
    title: "Tyler Montague March - Pink Pony Club",
    file: "audio/pinkpony.mp3",
    artwork: "img/pinkpony.png",
    credits: ["Mastering", "Mixing", "Keyboards", "Engineering", "Produced"],
    genres: ["Contemporary Country"]
  },
  {
    title: "McVittie - Adrenaline",
    file: "audio/Adrenaline.mp3",
    artwork: "img/adrenaline.jpg",
    credits: ["Keyboards", "Produced", "Mixing", "Mastering", "Writing", "Engineering"],
    genres: ["Electronic", "Synthwave"]
  },
  {
    title: "Spectra - Meridian",
    file: "audio/Meridian.mp3",
    artwork: "img/pwodo.jpg",
    credits: ["Keyboards", "Writing", "Produced", "Mastering", "Mixing", "Engineering"],
    genres: ["Progressive Rock"]
  },
  {
    title: "McVittie - Lone Killer",
    file: "audio/LoneKiller.mp3",
    artwork: "img/lonekiller.jpg",
    credits: ["Keyboards", "Produced", "Mixing", "Mastering", "Writing", "Engineering"],
    genres: ["Electronic", "Synthwave"]
  },
  {
    title: "Crimson Ash - In Twilight",
    file: "audio/InTwilight.mp3",
    artwork: "img/meltingsky.jpg",
    credits: ["Mixing", "Mastering"],
    genres: ["Progressive Rock"]
  },
  
  {
    title: "Reggo The God - Birds Eye View",
    file: "audio/birdseyeview.mp3",
    artwork: "img/birdseye.png",
    credits: ["Mastering", "Mixing"],
    genres: ["Hip Hop"]
  },
  {
    title: "Spectra - Lost At Sea",
    file: "audio/LostAtSea.mp3",
    artwork: "img/pwodo.jpg",
    credits: ["Keyboards", "Saxophone", "Writing", "Produced", "Mastering", "Mixing", "Engineering"],
    genres: ["Progressive Rock"]
  },
  {
    title: "McVittie - The Final Kill",
    file: "audio/FinalKill_Sax.mp3",
    artwork: "img/lonekiller.jpg",
    credits: ["Keyboards", "Saxophone", "Produced", "Mixing", "Mastering", "Writing", "Engineering"],
    genres: ["Electronic", "Synthwave"]
  },  
  {
    title: "Mortrem - Nonfiction",
    file: "audio/nonfiction.mp3",
    artwork: "img/Mortrem.jpg",
    credits: ["Keyboards"],
    genres: ["Progressive Rock"]
  },  
  {
    title: "McVittie - Ionosphere",
    file: "audio/ionosphere.mp3",
    artwork: "img/voltage.jpg",
    credits: ["Keyboards", "Produced", "Mixing", "Mastering", "Writing", "Engineering"],
    genres: ["Electronic", "Synthwave"]
  },
];

tracks.forEach(track => {
  track.credits.forEach(role => roles.add(role));
  track.genres.forEach(genre => genres.add(genre));
});

const trackListEl = document.getElementById("track-list");
const player = document.getElementById("player");
const filterButtonsEl = document.getElementById("filter-buttons");
const genreButtonsEl = document.getElementById("genre-buttons");

let activeFilters = new Set(); // Start with nothing selected
let activeGenres = new Set();
let currentPlayingEl = null;
let currentPlayingFile = null;

let activeCredit = null;
let activeGenre = null;



// Render filter buttons
roles.forEach(role => {
  const btn = document.createElement("button");
  btn.textContent = role;

  btn.addEventListener("click", () => {
    const isActive = btn.classList.toggle("active");
    if (isActive) {
      activeFilters.add(role);
    } else {
      activeFilters.delete(role);
    }
    renderTracks();
  });

  filterButtonsEl.appendChild(btn);
});


genres.forEach(genre => {
  const btn = document.createElement("button");
  btn.textContent = genre;

  btn.addEventListener("click", () => {
    const isActive = btn.classList.toggle("active");
    if (isActive) {
      activeGenres.add(genre);
    } else {
      activeGenres.delete(genre);
    }
    renderTracks();
  });

  genreButtonsEl.appendChild(btn);
});

function playTrack(track, trackEl) {
  audioPlayer.src = track.src;
  audioPlayer.play();
  
  // Remove "playing" class from any previous card
  if (currentPlayingEl) {
    currentPlayingEl.classList.remove("playing");
  }

  // Add "playing" class to current card
  trackEl.classList.add("playing");
  currentPlayingEl = trackEl;
}

function renderTracks() {
  trackListEl.innerHTML = "";

  const filtered = tracks.filter(track => {
    const creditMatch = !activeCredit || track.credits.includes(activeCredit);
    const genreMatch = !activeGenre || track.genres.includes(activeGenre);
    return creditMatch && genreMatch;
  });

  filtered.forEach(track => {
    const div = document.createElement("div");
    div.className = "track";
    div.innerHTML = `
      <img src="${track.artwork}" alt="${track.title} artwork">
      <div class="track-details">
        <div class="track-title">${track.title}</div>
        <div class="track-credits">${track.credits.join(", ")}</div>
        <div class="track-genres"><strong>Genres:</strong> ${track.genres.join(", ")}</div>
        ${track.disclaimer ? `<div class="track-disclaimer">${track.disclaimer}</div>` : ""}
      </div>
    `;

    div.onclick = () => {
      const isSameTrack = player.src.includes(track.file);
      if (isSameTrack) {
        player.paused ? player.play() : player.pause();
      } else {
        player.src = track.file;
        player.play();
      }

      if (currentPlayingEl) currentPlayingEl.classList.remove("playing");
      div.classList.add("playing");
      currentPlayingEl = div;
      currentPlayingFile = track.file;
    };

    // ✅ Restore glow if it's the current track
    if (track.file === currentPlayingFile) {
      div.classList.add("playing");
      currentPlayingEl = div;
    }

    trackListEl.appendChild(div);
  });


  // Update buttons in case the filters change what's available
  renderFilterButtons();
}

// --- Render credit buttons ---
function renderFilterButtons() {
  filterButtonsEl.innerHTML = "";
  genreButtonsEl.innerHTML = "";
  const clearWrapper = document.getElementById("clear-filters-wrapper");
  clearWrapper.style.display = (activeCredit || activeGenre) ? "block" : "none";

  roles.forEach(role => {
    const btn = document.createElement("button");
    btn.textContent = role;
    btn.classList.toggle("active", activeCredit === role);

    // Check if this role would return any results with current genre
    const hasMatches = tracks.some(track =>
      track.credits.includes(role) &&
      (!activeGenre || track.genres.includes(activeGenre))
    );

    if (!hasMatches) return; // HIDE the button if no matches

    btn.addEventListener("click", () => {
      activeCredit = activeCredit === role ? null : role;
      renderFilterButtons();
      renderTracks();
    });

    filterButtonsEl.appendChild(btn);
  });

  genres.forEach(genre => {
    const btn = document.createElement("button");
    btn.textContent = genre;
    btn.classList.toggle("active", activeGenre === genre);

    const hasMatches = tracks.some(track =>
      track.genres.includes(genre) &&
      (!activeCredit || track.credits.includes(activeCredit))
    );

    if (!hasMatches) return; // HIDE the button if no matches

    btn.addEventListener("click", () => {
      activeGenre = activeGenre === genre ? null : genre;
      renderFilterButtons();
      renderTracks();
    });

    genreButtonsEl.appendChild(btn);
  });
}


player.addEventListener("play", () => {
  // Try to find and highlight the currently playing track card
  const cards = document.querySelectorAll(".track");
  cards.forEach(card => {
    const img = card.querySelector("img");
    if (img && player.src.includes(img.src)) {
      if (currentPlayingEl) currentPlayingEl.classList.remove("playing");
      card.classList.add("playing");
      currentPlayingEl = card;
    }
  });
});

renderFilterButtons();
renderTracks();

document.getElementById("clear-filters").addEventListener("click", () => {
  activeCredit = null;
  activeGenre = null;
  renderFilterButtons();
  renderTracks();
  document.getElementById("clear-filters-wrapper").style.display = "none";
});

  // Basic accordion toggle
  document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".accordion-button").forEach(button => {
      button.addEventListener("click", () => {
        const item = button.parentElement;
        item.classList.toggle("active");
      });
    });
  });

