// API key: cugj8deZM3MxmsvUCaTVDxHMCxFQ10jB
// Base URL: https://api.giphy.com/v1/gifs/

const userCardTemplate = document.querySelector("[data-user-template]");
const userCardsContainer = document.querySelector("[data-user-cards-container]");
const searchInput = document.querySelector("[data-search]");
const searchBtn = document.getElementById("searchBtn");
const loadMoreBtn =  document.getElementById("loadMoreBtn")

const API_KEY = "cugj8deZM3MxmsvUCaTVDxHMCxFQ10jB";
const LIMIT = 12;
const RATING = "pg-13";

let currentQuery = "";   // remembers last search
let currentOffset = 0;   // pagination offset
let lastBatchCount = 0;  // optional; not required

loadMoreBtn.style.display = "none"; // hide initially

async function searchGifs(query, { append = false } = {}) {
  const userTerm = (query || "").trim();
  const finalTerm = `${userTerm} lizard meme gif`.trim(); // always add "lizard"

   if (!userTerm) {
    userCardsContainer.innerHTML = "<p>Type something to search.</p>";
    loadMoreBtn.style.display = "none";
    return;
  }

  if (!append) {
    currentQuery = userTerm;
    currentOffset = 0; // ✅ reset for a new search
    userCardsContainer.innerHTML = "<p>Loading…</p>";
  }

  loadMoreBtn.disabled = true; // prevent double-clicks

  try {
    const url =
      `https://api.giphy.com/v1/gifs/search` +
      `?api_key=${API_KEY}` +
      `&q=${encodeURIComponent(finalTerm)}` +
      `&limit=${LIMIT}` +
      `&offset=${currentOffset}` +   // ✅ use the live offset
      `&rating=${RATING}` +
      `&lang=en`;

    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const { data } = await res.json();

    if (!append) {
      userCardsContainer.innerHTML = ""; // clear "Loading…"
    }

    data.forEach(item => {
      const card = userCardTemplate.content.cloneNode(true).firstElementChild;
      const header = card.querySelector("[data-header]");
      const img = card.querySelector("[data-body] img");
      header.textContent = item.title || "Untitled";
      img.src = item.images.fixed_height.url;
      img.alt = item.title || "gif";
      img.loading = "lazy";
      userCardsContainer.append(card);
    });

    lastBatchCount = data.length;
    currentOffset += data.length;   

    if (!append && data.length === 0) {
      userCardsContainer.innerHTML = "<p>No results.</p>";
      loadMoreBtn.style.display = "none";
      return;
    }
    
    if (data.length < LIMIT) {              // Show Load More only if we got a full page
      loadMoreBtn.style.display = "none";
    } else {
      loadMoreBtn.style.display = "inline-block";
    }
  } catch (e) {
    console.error(e);
    if (!append) userCardsContainer.innerHTML = "<p>Failed to load GIFs.</p>";
    loadMoreBtn.style.display = "none";
  } finally {
    loadMoreBtn.disabled = false;
  }
}

searchBtn.addEventListener("click", () => {           // New search
  searchGifs(searchInput.value, { append: false });
});

searchInput.addEventListener("keydown", e => {
  if (e.key === "Enter") {
    searchGifs(searchInput.value, { append: false });
  }
});

loadMoreBtn.addEventListener("click", () => {           // Next page
  searchGifs(currentQuery, { append: true });
});
