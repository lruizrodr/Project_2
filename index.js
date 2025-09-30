// API key: cugj8deZM3MxmsvUCaTVDxHMCxFQ10jB
// Base URL: https://api.giphy.com/v1/gifs/
// Endpoint: https://api.giphy.com/v1/gifs/search?api_key=YOUR_API_KEY&q=funny+cats&limit=10&offset=0&rating=g&lang=en
const userCardTemplate = document.querySelector("[data-user-template]");
const userCardsContainer = document.querySelector("[data-user-cards-container]");
const searchInput = document.querySelector("[data-search]");
const searchBtn = document.getElementById("searchBtn");

const API_KEY = "cugj8deZM3MxmsvUCaTVDxHMCxFQ10jB";
const LIMIT = 12;
const RATING = "g";

async function searchGifs(query) {
  const userTerm = (query || "").trim();
  const finalTerm = `${userTerm} lizard meme gif`.trim(); // always add "lizard"

  if (!finalTerm) {
    userCardsContainer.innerHTML = "<p>Type something to search.</p>";
    return;
  }

  userCardsContainer.innerHTML = "<p>Loading…</p>";
  try {
    const url = `https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${encodeURIComponent(finalTerm)}&limit=${LIMIT}&offset=0&rating=${RATING}&lang=en`;
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const { data } = await res.json();

    userCardsContainer.innerHTML = "";
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

    if (!data.length) userCardsContainer.innerHTML = "<p>No results.</p>";
  } catch (e) {
    console.error(e);
    userCardsContainer.innerHTML = "<p>Failed to load GIFs.</p>";
  }
}

searchBtn.addEventListener("click", () => {
  searchGifs(searchInput.value);
});

searchInput.addEventListener("keydown", e => {
  if (e.key === "Enter") searchGifs(searchInput.value);
});


// Will need to add event listener to the search bar to capture input and make API call based on that input. DONT FORGET
// search //
// https://api.giphy.com/v1/gifs/search?api_key=YOUR_API_KEY&q=funny+cats&limit=10&offset=0&rating=g&lang=en
// random //
//https://api.giphy.com/v1/gifs/random?api_key=YOUR_API_KEY&tag=funny&rating=g
// trending //
//https://api.giphy.com/v1/gifs/trending?api_key=YOUR_API_KEY&limit=10&rating=g
// Will make a simple search first, if time allows, we can implement the other features.