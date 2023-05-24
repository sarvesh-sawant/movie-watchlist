import { config  } from "./config.js";

const searchBtn = document.getElementById("search-btn")
const searchText = document.getElementById("search-id")

const apiKey = config.OMDB_API_SECRET;
const baseUrl = "http://www.omdbapi.com/"

let initialLoadFlag = 0

searchBtn.addEventListener("click", async () => {
    document.getElementById('no-shows-id').style.display = "none"
    if(initialLoadFlag === 0){
        document.getElementById('img-png').remove()
        initialLoadFlag+=1
    } else{
        initialLoadFlag+=1
    }
    let showName = searchText.value
    const response = await fetch(`${baseUrl}?s=${showName}&apikey=${apiKey}`)
    const data = await response.json()
    if(data["Response"] === "True"){
        let showsList = []
        for(let showObj of data["Search"]){
            showsList.push(showObj["imdbID"])
        }
        getShowsInfo(showsList)
    }else{
        console.log("No movie found")
        document.getElementById('no-shows-id').style.display = "block"
    }
    searchText.value = ""
})

const getShowsInfo = (showList) => {
    document.getElementById('show-id').innerHTML = ''
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
        document.getElementById('show-id').innerHTML += `
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
                <i class="fa-solid fa-circle-plus"><a href="#" class="watchlist-style">  Watchlist</a></i>
            </div>
            <div class="short-plot">
                <p>${plot.substring(0, 55)} <button id="read-more-${element}">... read more</button><span id="other-content-${element}" style="display: none;">${plot.substring(70)} </span><button id="read-less-${element}" style="display: none;">... read less</button></p>
            </div>
        </div>
        </div>
        `
    })
}


document.addEventListener("click", (event) => {
    if(event.target.id.includes("read-more")){
        document.getElementById(event.target.id).style.display = "none"
        document.getElementById(`other-content-${event.target.id.substring(10)}`).style.display = "inline"
        document.getElementById(`read-less-${event.target.id.substring(10)}`).style.display = "inline"
    }
    if(event.target.id.includes("read-less")){
        document.getElementById(event.target.id).style.display = "none"
        document.getElementById(`other-content-${event.target.id.substring(10)}`).style.display = "none"
        document.getElementById(`read-more-${event.target.id.substring(10)}`).style.display = "inline"
    }
})    



