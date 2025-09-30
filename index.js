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














// Will need to add event listener to the search bar to capture input and make API call based on that input. DONT FORGET
// search //
// https://api.giphy.com/v1/gifs/search?api_key=YOUR_API_KEY&q=funny+cats&limit=10&offset=0&rating=g&lang=en
// random //
//https://api.giphy.com/v1/gifs/random?api_key=YOUR_API_KEY&tag=funny&rating=g
// trending //
//https://api.giphy.com/v1/gifs/trending?api_key=YOUR_API_KEY&limit=10&rating=g
// Will make a simple search first, if time allows, we can implement the other features.