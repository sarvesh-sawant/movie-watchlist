
import { config  } from "./config.js";

const apiKey = config.OMDB_API_SECRET;
const baseUrl = "http://www.omdbapi.com/"

let watchList = []

if(localStorage.getItem("watchList") !== null){
    const watchListFromStorage = JSON.parse(localStorage.getItem("watchList"))
    watchList = watchListFromStorage
}

console.log(watchList)

const getShowsInfo = (showList, divToRender) => {
    console.log(document.getElementById(divToRender))
    document.getElementById(divToRender).innerHTML = ''
    showList.forEach(async (element) => {
        const showUrl = `${baseUrl}?i=${element}&apikey=${apiKey}`
        const response = await fetch(showUrl)
        const data = await response.json()
        let title = data["Title"]
        let imdbRating = data["imdbRating"] 
        let runtime = data["Runtime"] 
        let genre = data["Genre"] 
        let plot = data["Plot"] 
        let poster = data["Poster"]
        console.log(`title=${title}\nimdbRating=${imdbRating}\nruntime=${runtime}\ngenre=${genre}\nplot=${plot}\nposter=${poster}`)
        document.getElementById(divToRender).innerHTML += `
        <div class="show-img">
        <img src="${poster}">
        <div class="show-content">
            <div class="show-title-rating">
                <h6>${title}</h6>
                <i class="fa-solid fa-star" style="color: #f8dc25;"></i>
                <p>${imdbRating}</p>
            </div>
            <div class="runtime-genre-watchlist">
                <p>${runtime}</p>
                <p>${genre}</p>
                <i class="fa-solid fa-circle-minus"><a id="add-to-watchlist-${element}" href="#" class="watchlist-style">  Remove</a></i>
            </div>
            <div class="short-plot">
                <p>${plot.substring(0, 55)} <button id="read-more-${element}">... read more</button><span id="other-content-${element}" style="display: none;">${plot.substring(70)} </span><button id="read-less-${element}" style="display: none;">... read less</button></p>
            </div>
        </div>
        </div>
        `
    })
}

getShowsInfo(watchList, "watch-show-id")

document.addEventListener("click", (event) => {
    console.log(event.target.id)
    if(event.target.id.includes("add-to-watchlist")){
        console.log(event.target.id.substring(17))
        watchList = watchList.filter(imdbId => imdbId !== event.target.id.substring(17))
        localStorage.removeItem('watchList')
        getShowsInfo(watchList, "watch-show-id")
    }
}) 