// API key: cugj8deZM3MxmsvUCaTVDxHMCxFQ10jB
// Base GIF URL: https://api.giphy.com/v1/gifs/search
// Base Sticker URL: https://api.giphy.com/v1/stickers/search maybe add later...

//DOM elements
const userCardsContainer = document.querySelector("[data-user-cards-container]");
const template           = document.querySelector("[data-user-template]");
const searchInput        = document.querySelector("[data-search]");
const searchBtn          = document.getElementById("searchBtn");
const loadMoreBtn        = document.getElementById("loadMoreBtn");

//Config variables
const API_KEY = "cugj8deZM3MxmsvUCaTVDxHMCxFQ10jB";
const LIMIT   = 14;               // results per page
const RATING  = "pg-13";              // content rating

//States
let term   = "";   // last search term
let offset = 0;    // next page start

loadMoreBtn.style.display = "none"; // hidden until we have results

//Functions K.I.S.S. FFS!!
function addCard(item) {
  const card = template.content.cloneNode(true).firstElementChild;
  card.querySelector("[data-header]").textContent = item.title || "Untitled";
  const img = card.querySelector("[data-body] img");
  img.src = item.images.fixed_width.url;
  img.alt = item.title || "gif";
  img.loading = "lazy";
  userCardsContainer.appendChild(card);
}

// Async function to fetch and render gifs //sidenote: try/catch block for better error handling
async function fetchAndRender(append) {
  const q = `${term} lizard`;
  const url = `https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${encodeURIComponent(q)}&limit=${LIMIT}&offset=${offset}&rating=${RATING}&lang=en`;

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const { data } = await response.json();

    if (!append) userCardsContainer.innerHTML = ""; // fresh search → clear

    for (const item of data) addCard(item);
    offset += data.length; // next page starts after what we got

    if (!append && data.length === 0) { // if 0 no results found
      userCardsContainer.innerHTML = "<p>No results found</p>";
      loadMoreBtn.style.display = "none";
      return;
    }
    // show "Load more" only if we got a full page
    loadMoreBtn.style.display = data.length < LIMIT ? "none" : "block";
  } catch (err) {
    console.error("Fetch error:", err);
    if (!append) userCardsContainer.innerHTML = "<p>Error fetching results</p>";
    loadMoreBtn.style.display = "none";
  }
}

//Event Listeners
searchBtn.addEventListener("click", function () {
  const typed = (searchInput.value || "").trim();
  if (!typed) {
    userCardsContainer.innerHTML = "<p>Type something to search.</p>";
    loadMoreBtn.style.display = "none";
    return;
  }
  term = typed;       // remember last search
  offset = 0;         // reset pagination
  userCardsContainer.innerHTML = "<p>Loading…</p>";
  fetchAndRender(false);
});

searchInput.addEventListener("keydown", function (e) {
  if (e.key === "Enter") searchBtn.click();
});

loadMoreBtn.addEventListener("click", function () {
  fetchAndRender(true);
});

//FUTURE IMPROVEMENTS//
//WARNING: Before creating another freaking mess, plan your code architecture!!
// Before writing a function
// -What does it take (params)?
// -What does it return (data or nothing)?
// -What side effects (DOM, global state) does it have?
// -What can go wrong, and who handles that?
// For async flows
// -Where do I await? (fetch, parsing)
// -Where do I throw vs. handle?
// -Do I need loading and empty states?
// For arrays
// -Do I need to transform → map
// -Do I need to filter → filter
// -Do I need to accumulate → reduce
// -Do I need to do side effects → for...of / forEach

//Plans for the future: 
// -Random GIFs (using same search bar /w a different button) 
// -Stricker Search(using same search bar /w a different button)