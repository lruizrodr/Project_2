// API key: cugj8deZM3MxmsvUCaTVDxHMCxFQ10jB
// Base URL: https://api.giphy.com/v1/gifs/
// Endpoint: https://api.giphy.com/v1/gifs/search?api_key=YOUR_API_KEY&q=funny+cats&limit=10&offset=0&rating=g&lang=en
const userCardTemplate = document.querySelector("[data-user-template]");
const userCardsContainer = document.querySelector("[data-user-cards-container]");
const searchInput = document.querySelector("[data-search]");
const searchBtn = document.getElementById("searchBtn");
const loadMoreBtn = document.getElementById("loadMoreBtn");

const API_KEY = "cugj8deZM3MxmsvUCaTVDxHMCxFQ10jB";
const LIMIT = 12;
const RATING = "pg-13";

let currentQuery = ""; //should remember last search
let currentOffset = 0; // new offset for pagination
let lastBatchCount = 0; // how many results were in the last batch

loadMoreBtn.style.display = "none"; // hide initially

async function searchGifs(query, { append = false } = {}) {
  const userTerm = (query || "").trim();
  const finalTerm = `${userTerm} lizard meme gif`.trim(); // always add "lizard"

  if (!finalTerm) {
    userCardsContainer.innerHTML = "<p>Type something to search.</p>";
    loadMoreBtn.style.display = "none"; // hide load more button
    return;
  }
  if (!append) {
    currentQuery = userTerm;
    currentOffset = 0;
    userCardsContainer.innerHTML = "<p>Loading…</p>";
  }
  loadMoreBtn.disabled = true; // prevent douible clicks, enable later if needed

  try {
    const url =                                     //easier to see the url
        `https://api.giphy.com/v1/gifs/search` +
        `?api_key=${API_KEY}` +
        `&q=${encodeURIComponent(finalTerm)}` +
        `&limit=${LIMIT}` +
        `&offset=${currentOffset}` +                     // ← use the real offset
        `&rating=${RATING}` +
        `&lang=en`;

    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const { data } = await res.json();

    if (!append) { userCardsContainer.innerHTML = "";
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
    currentOffset = 0; // reset offset for new search

    if (!append && data.lenth === 0) {
        userCardsContainer.innerHTML = "<p>No results.</p>";
        loadMoreBtn.style.display = "none"; // hide load more button
        return;
    }
    
    if (data.length < LIMIT) { // fewer than limit will not load more pages
        loadMoreBtn.style.display = "none"; // hide load more button
    }
    else {
        loadMoreBtn.style.display = "inline-block"; // show load more button
    }
}
    catch (e) {
    console.error(e);
    if (!append) userCardsContainer.innerHTML = "<p>Failed to load GIFs.</p>";
    loadMoreBtn.style.display = "none";
    } 
  
    finally {
    loadMoreBtn.disabled = false;
    }
}

    searchBtn.addEventListener("click", () => {
    searchGifs(searchInput.value, { append: false });
});
    searchInput.addEventListener("keydown", e => {
    if (e.key === "Enter") {
    searchGifs(searchInput.value, { append: false });
    }
});
    loadMoreBtn.addEventListener("click", () => {
    searchGifs(currentQuery, { append: true });
});


// search //
// https://api.giphy.com/v1/gifs/search?api_key=YOUR_API_KEY&q=funny+cats&limit=10&offset=0&rating=g&lang=en
// random //
//https://api.giphy.com/v1/gifs/random?api_key=YOUR_API_KEY&tag=funny&rating=g
// trending //
//https://api.giphy.com/v1/gifs/trending?api_key=YOUR_API_KEY&limit=10&rating=g
// Will make a simple search first, if time allows, we can implement the other features.