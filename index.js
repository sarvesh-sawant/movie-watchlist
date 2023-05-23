import { config  } from "./config.js";

const searchBtn = document.getElementById("search-btn")
const searchText = document.getElementById("search-id")

const apiKey = config.OMDB_API_SECRET;
const baseUrl = "http://www.omdbapi.com/"


searchBtn.addEventListener("click", async () => {
    let movieName = searchText.value
    const response = await fetch(`${baseUrl}?s=${movieName}&apikey=${apiKey}`)
    const data = await response.json()
})

