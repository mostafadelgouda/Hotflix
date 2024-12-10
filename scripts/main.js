let latestMovies = [];
let trendingMovies = [];
let API_KEY = `1907dd7e22213c1275b820c5455946aa`;
const newItemsOfTheSeason = document.querySelector("#newItemsOfTheSeason");
const recentlyUpdated = document.querySelector("#recentlyUpdated");

let latestMoviesStart = 0;
async function getLatestMovies(type, time) {
  let res = await fetch(
    `https://api.themoviedb.org/3/trending/${type}/${time}?api_key=${API_KEY}`
  );
  latestMovies = (await res.json()).results;
  display();
}
async function getTrendingMovies(type, time) {
  let res = await fetch(
    `https://api.themoviedb.org/3/trending/${type}/${time}?api_key=${API_KEY}`
  );
  trendingMovies = (await res.json()).results;

  display();
}
function createMovieGridBody(list) {
  let content = "";
  for (let i = 0; i < list.length; i++) {
    content += `
      <div class="movie-card" onclick="goToItem('${list[i].id}', '${
      list[i].media_type
    }')">
          <div class="movie-image-container">
            <div class="cover"></div>
            <img src="https://image.tmdb.org/t/p/w500/${
              list[i].poster_path
            }" alt="${list[i].title || list[i].name}" class="movie-image" />
            <div class="rate ${
              list[i].vote_average <= 6
                ? "low-rate"
                : list[i].vote_average <= 7.5
                ? "medium-rate"
                : ""
            }">${list[i].vote_average.toPrecision(2)}</div>
            <div class="bookmark"><i class="fa-regular fa-bookmark"></i></div>
            <div class="play">
              <i class="fa-sharp fa-solid fa-play"></i>
            </div>
          </div>
        <div class="movie-name"><a href="">${
          list[i].title || list[i].name
        }</a></div>
        <div class="release-date">${
          list[i].release_date || list[i].first_air_date
        }</div>
      </div>
    `;
  }
  return content;
}
function display() {
  newItemsOfTheSeason.innerHTML = createMovieGridBody(latestMovies);
  recentlyUpdated.innerHTML = createMovieGridBody(trendingMovies);
}

getLatestMovies("all", "day");

getTrendingMovies("tv", "day");

function latestNext() {
  newItemsOfTheSeason.scrollBy({
    top: 0,
    left: 260, // Adjust to the width of your movie cards + margin
    behavior: "smooth", // Adds smooth scrolling
  });
}
function latestPrev() {
  newItemsOfTheSeason.scrollBy({
    top: 0,
    left: -260, // Adjust to the width of your movie cards + margin
    behavior: "smooth", // Adds smooth scrolling
  });
}
function goToItem(id, mt) {
  localStorage.setItem("result", JSON.stringify({ id: id, media_type: mt }));

  location.href = "movie.html";
}
