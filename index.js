// API key: cugj8deZM3MxmsvUCaTVDxHMCxFQ10jB
// Base URL: https://api.giphy.com/v1/gifs/

//DOM elements
const userCardsContainer = document.querySelector("[data-user-cards-container]");
const searchInput        = document.querySelector("[data-search]");
const searchBtn          = document.getElementById("searchBtn");
const loadMoreBtn        = document.getElementById("loadMoreBtn");
//Config variables

//States
let term   = "";   // last search term
let offset = 0;    // next page start

loadMoreBtn.style.display = "none"; // hidden until we have results

//Functions K.I.S.S.










//Event Listeners
searchBtn.addEventListener("click", function () {
  searchGifs(searchInput.value, { append: false });
});

searchInput.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    searchGifs(searchInput.value, { append: false });
  }
});

loadMoreBtn.addEventListener("click", function () {
  searchGifs(currentQuery, { append: true });
});