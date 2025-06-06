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

let activeFilters = new Set(); // Start with nothing selected
let activeGenres = new Set();
let currentPlayingEl = null;
let currentPlayingFile = null;



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

const genreButtonsEl = document.getElementById("genre-buttons");

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
  const roleMatch = activeFilters.size === 0 ||
    track.credits.some(credit => activeFilters.has(credit));

  const genreMatch = activeGenres.size === 0 ||
    track.genres.some(genre => activeGenres.has(genre));
    

  return roleMatch && genreMatch;
  
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
      ${track.disclaimer ? `<div class="tooltip">${track.disclaimer}</div>` : ""}
    `;
    if (track.file === currentPlayingFile) {
  div.classList.add("playing");
  currentPlayingEl = div;
}

    player.addEventListener("pause", () => {
  if (currentPlayingEl) {
    currentPlayingEl.classList.remove("playing");
  }
});
    
div.onclick = () => {
  const isSameTrack = player.src.includes(track.file);

  if (isSameTrack) {
    // Toggle play/pause if already selected
    if (player.paused) {
      player.play();
      currentPlayingFile = track.file;
    } else {
      player.pause();
    }
  } else {
    // Play new track
    player.src = track.file;
    currentPlayingFile = track.file;
    player.play();
  }

  // Update "now playing" card styling
  if (currentPlayingEl) {
    currentPlayingEl.classList.remove("playing");
  }
  div.classList.add("playing");
  currentPlayingEl = div;
};
    trackListEl.appendChild(div);
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


renderTracks();

  // Basic accordion toggle
  document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".accordion-button").forEach(button => {
      button.addEventListener("click", () => {
        const item = button.parentElement;
        item.classList.toggle("active");
      });
    });
  });

