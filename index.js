const searchBtn = document.getElementById("search-btn")
const searchText = document.getElementById("search-id")

const baseUrl = "http://www.omdbapi.com/?i=tt3896198&apikey=a364b521/"

let initialLoadFlag = 0

let watchList = []

let showsList;

if(localStorage.getItem("watchList") !== null){
    const watchListFromStorage = JSON.parse(localStorage.getItem("watchList"))
    watchList = watchListFromStorage
}

searchBtn.addEventListener("click", async () => {
    document.getElementById('no-shows-id').style.display = "none"
    if(initialLoadFlag === 0){
        document.getElementById('img-png').remove()
        initialLoadFlag+=1
    } else{
        initialLoadFlag+=1
    }
    let showName = searchText.value
    const response = await fetch(`${baseUrl}/shows/${showName}`)
    const data = await response.json()
    if(data["Response"] === "True"){
        showsList = []
        for(let showObj of data["Search"]){
            showsList.push(showObj["imdbID"])
        }
        getShowsInfo(showsList, "show-id")
    }else{
        document.getElementById('no-shows-id').style.display = "block"
    }
    searchText.value = ""
})

const getShowsInfo = (showList, divToRender) => {
    document.getElementById(divToRender).innerHTML = ''
    showList.forEach(async (element) => {
        const showUrl = `${baseUrl}/showid/${element}`
        const response = await fetch(showUrl)
        const data = await response.json()
        let title = data["Title"]
        let imdbRating = data["imdbRating"] 
        let runtime = data["Runtime"] 
        let genre = data["Genre"] 
        let plot = data["Plot"] 
        let poster = data["Poster"]
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
                ${watchList.includes(element) ? `<i class="fa-solid fa-circle-minus"><a id="rem-to-watchlist-${element}" href="#" class="watchlist-style">  Remove</a></i>`:`<i class="fa-solid fa-circle-plus"><a id="add-to-watchlist-${element}" href="#" class="watchlist-style">  Watchlist</a></i>`}
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
    if(event.target.id.includes("add-to-watchlist")){
        if(!watchList.includes(event.target.id.substring(17))){
            watchList.push(event.target.id.substring(17))
            localStorage.setItem("watchList", JSON.stringify(watchList)) 
            getShowsInfo(showsList,"show-id")
        }
    }
    if(event.target.id.includes("rem-to-watchlist")){
        watchList = watchList.filter(imdbId => imdbId !== event.target.id.substring(17))
        localStorage.setItem("watchList", JSON.stringify(watchList))
        getShowsInfo(showsList,"show-id")
    }
})    









