const baseUrl = "https://sarveshsawant.com/omdb"

let watchList = []

if(localStorage.getItem("watchList") !== null){
    const watchListFromStorage = JSON.parse(localStorage.getItem("watchList"))
    watchList = watchListFromStorage
}

const getShowsInfo = (showList, divToRender) => {
    document.getElementById(divToRender).innerHTML = ''
    if(watchList.length === 0){
        renderIfNoShowsInWatchList()
    }
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


const renderIfNoShowsInWatchList = () => {
    document.getElementById("no-shows-in-watchlist").innerHTML += `
    <p>Your watchlist is looking a little empty...</p>
    <i class="fa-solid fa-circle-plus" ><a href="index.html"> Lets add some movies!</a></i>
`
}

if(watchList.length === 0){
    renderIfNoShowsInWatchList()
}
else{
    getShowsInfo(watchList, "watch-show-id")
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
        watchList = watchList.filter(imdbId => imdbId !== event.target.id.substring(17))
        localStorage.removeItem('watchList')
        getShowsInfo(watchList, "watch-show-id")
    }
}) 