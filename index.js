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

//Functions K.I.S.S. FFS!!

function addCard(item) {
    const card = template.content.cloneNode(true).children[0];
    card.querySelector(".card-title").textContent = item.title;
    const img = card.querySelector(".card-image");
    img.src = item.images.fixed_width.url;
    img.alt = item.title;
    img.loading = "lazy";
    CSSContainerRule.appendChild(card);
}

console.log(addCard);






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