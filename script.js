//const roles = ["Mixing", "Mastering", "Producing", "Writing", "Session Keys", "Saxophone"];
//const genres = ["Pop", "Rock", "Electronic", "Jazz", "Funk"];

// Generate roles and genres dynamically
const roles = new Set();
const genres = new Set();

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

let filteredTracks = [];



// Render filter buttons
roles.forEach(role => {
  const btn = document.createElement("button");
  btn.textContent = role;
  btn.dataset.role = role;

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
  btn.dataset.genre = genre;

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
  // 🔥 GA event for play
  gtag("event", "play_track", {
    track_title: track.title,
    artist: track.artist,
    credits: track.credits.join(", "),
    genres: track.genres.join(", ")
  });
}

function cleanParam(value) {
  if (!value) return "";

  // Decode %23 → #
  let decoded = decodeURIComponent(value);

  if (decoded.includes("#")) {
    let [beforeHash, afterHash] = decoded.split("#");

    // ✅ Schedule hash jump AFTER filters are applied
    if (afterHash) {
      setTimeout(() => {
        window.location.hash = "#" + afterHash;
      }, 100); 
    }

    return beforeHash.trim();
  }

  return decoded.trim();
}

function renderTracks() {
  trackListEl.innerHTML = "";

  const filtered = tracks.filter(track => {
    const creditMatch = !activeCredit || track.credits.includes(activeCredit);
    const genreMatch = !activeGenre || track.genres.includes(activeGenre);
    return creditMatch && genreMatch;
  });

  filteredTracks = filtered;

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
      gtag("event", "play_track", {
        track_title: track.title,
        artist: track.artist,
        credits: track.credits.join(", "),
        genres: track.genres.join(", ")
      });
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
      updateFilter(role); // Update URL query string
      gtag("event", "filter_tracks_credit", {
        role: activeCredit,
      });
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
      updateGenre(activeGenre)
      gtag("event", "filter_tracks_genre", {
        genre: activeGenre,
      });
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
  updateFilter(null)
  updateGenre(null)
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


function roundToNearest5(num) {
  return Math.floor(num / 5) * 5;
}

function updateInstrumentYears() {
    const currentYear = new Date().getFullYear();
    const yearsKeys = roundToNearest5(currentYear - 1998);
    const yearsSax = roundToNearest5(currentYear - 2007);

    document.getElementById('years-keys').textContent = `${yearsKeys} years`;
    document.getElementById('years-sax').textContent = `${yearsSax} years`;
  }

  updateInstrumentYears();

function scrollTracks(direction) {
  const container = document.getElementById("track-list");
  const scrollAmount = container.offsetWidth * 0.8; // scroll by 80% width
  container.scrollBy({ left: direction * scrollAmount, behavior: "smooth" });
}
function enableDragScroll(containerId) {
  const container = document.getElementById(containerId);
  let isDown = false;
  let startX;
  let scrollLeft;

  container.addEventListener('mousedown', (e) => {
    isDown = true;
    container.classList.add('dragging');
    startX = e.pageX;
    scrollLeft = container.scrollLeft;
  });

  container.addEventListener('mouseleave', () => {
    isDown = false;
    container.classList.remove('dragging');
  });

  container.addEventListener('mouseup', () => {
    isDown = false;
    container.classList.remove('dragging');
  });

  container.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault(); // Prevent text/image selection
    const x = e.pageX;
    const walk = (x - startX) * 1.5;
    container.scrollLeft = scrollLeft - walk;
  });

  // Prevent click from firing after drag
  container.addEventListener('click', (e) => {
    if (Math.abs(container.scrollLeft - scrollLeft) > 5) {
      e.preventDefault();
      e.stopPropagation();
    }
  }, true);
}
// Enable drag scroll on track list
enableDragScroll("track-list");

function playNext() {
  const currentIndex = filteredTracks.findIndex(t => t.file === currentPlayingFile);
  if (currentIndex >= 0 && currentIndex < filteredTracks.length - 1) {
    playSpecificTrack(filteredTracks[currentIndex + 1]);
  }
}

function playPrevious() {
  const currentIndex = filteredTracks.findIndex(t => t.file === currentPlayingFile);
  if (currentIndex > 0) {
    playSpecificTrack(filteredTracks[currentIndex - 1]);
  }
}
function playSpecificTrack(track) {
  player.src = track.file;
  player.play();
  currentPlayingFile = track.file;


  // Update playing UI
  const cards = document.querySelectorAll(".track");
  cards.forEach(card => card.classList.remove("playing"));
  const match = [...cards].find(card =>
    card.innerHTML.includes(track.title)
  );
  if (match) {
    match.classList.add("playing");
    currentPlayingEl = match;
    currentPlayingFile = track.file;
  }

  gtag("event", "play_track", {
    track_title: track.title,
    artist: track.artist,
    credits: track.credits.join(", "),
    genres: track.genres.join(", ")
  });
}

player.addEventListener("ended", () => {
  playNext();
});

function renderGallery() {
  const container = document.getElementById("gallery-container");
  container.innerHTML = "";

  galleryImages.forEach((img, index) => {
    const div = document.createElement("div");
    div.className = "carousel-item";
    div.onclick = () => openLightbox(index);

    div.innerHTML = `
      <img src="${img.src}" alt="${img.caption}">
      <p>${img.caption}</p>
    `;

    container.appendChild(div);
  });
}

function openLightbox(index) {
  const lightbox = document.getElementById("lightbox");
  const imgEl = document.getElementById("lightbox-img");
  const captionEl = document.getElementById("lightbox-caption");

  const item = galleryImages[index];
  imgEl.src = item.src;
  captionEl.textContent = item.caption;
  lightbox.style.display = "flex";
}

function closeLightbox() {
  document.getElementById("lightbox").style.display = "none";
}

function updateFilter(role) {
  activeCredit = role;

  const params = new URLSearchParams(window.location.search);
  if (role) {
    params.set("role", role);
  } else {
    params.delete("role");
  }
  // preserve existing section hash if present
  const hash = window.location.hash || "#portfolio";

  window.history.replaceState(
    {},
    "",
    `${window.location.pathname}?${params}${window.location.hash}`
  );

  renderTracks();
}

function updateGenre(genre) {
  activeGenre = genre;

  const params = new URLSearchParams(window.location.search);
  if (genre) {
    params.set("genre", genre);
  } else {
    params.delete("genre");
  }
  // preserve existing section hash if present
  const hash = window.location.hash || "#portfolio";


  window.history.replaceState(
    {},
    "",
    `${window.location.pathname}?${params}${window.location.hash}`
  );

  renderTracks();
}

function loadFiltersFromURL() {
  const params = new URLSearchParams(window.location.search);
  const role = params.get("role");
  const genre = params.get("genre");

  if (role) {
    activeCredit = role;
    activeCredit = cleanParam(activeCredit);
    document.querySelectorAll(".filter-buttons button").forEach(btn => {
      btn.classList.toggle("active", btn.dataset.role === activeCredit);
    });
  }

  if (genre) {
    activeGenre = genre;
    activeGenre = cleanParam(activeGenre);
    document.querySelectorAll(".genre-buttons button").forEach(btn => {
      btn.classList.toggle("active", btn.dataset.genre === activeGenre);
    });
  }

  renderTracks();
}
// Call this after DOM and galleryImages are ready
document.addEventListener("DOMContentLoaded", () => {
  loadFiltersFromURL();
});

document.querySelectorAll("#navbar a").forEach(link => {
  link.addEventListener("click", () => {
    const nav = document.getElementById("navbar");
    nav.classList.remove("active");
  });
});
renderGallery();
window.addEventListener("load", () => {
  if (window.location.hash) {
    document.querySelector(window.location.hash)?.scrollIntoView({ behavior: "smooth" });
  }
});



