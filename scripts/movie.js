let API_KEY = `1907dd7e22213c1275b820c5455946aa`;
let latestMovies = [];
const newItemsOfTheSeason = document.querySelector("#newItemsOfTheSeason");

let data;
let { id, media_type } = JSON.parse(localStorage.getItem("result"));
let movieName = document.querySelector("#movie-name");

function createMovieGridBody(list) {
  let content = "";
  for (let i = 0; i < Math.min(list.length, 6); i++) {
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
}
async function getLatestMovies(type, time) {
  let res = await fetch(
    `https://api.themoviedb.org/3/trending/${type}/${time}?api_key=${API_KEY}`
  );
  latestMovies = (await res.json()).results;
  display();
}
async function movieDetails() {
  let response = await fetch(
    `https://api.themoviedb.org/3/${media_type}/${id}?api_key=${API_KEY}`
  );
  data = await response.json();
  console.log(data);
  Display();
}

function Display() {
  movieName.innerHTML = data.name || data.title;
  let productionCompanies = Object.values(data.production_companies)
    .map((item) => item.name) // Extract the 'name' field
    .join(", ");
  let row = document.querySelector("#row");
  row.innerHTML = `
  <div class="movie-container">
      <div class="movie-card" onclick="goToItem('${data.id}', '${
    data.media_type
  }')">
          <div class="movie-image-container">
            <img src="https://image.tmdb.org/t/p/w500/${
              data.poster_path
            }" alt="${data.title || data.name}" class="movie-image" />
            <div class="rate ${
              data.vote_average <= 6
                ? "low-rate"
                : data.vote_average <= 7.5
                ? "medium-rate"
                : ""
            }">${data.vote_average.toPrecision(2)}</div>
            <div class="bookmark"><i class="fa-regular fa-bookmark"></i></div>

          </div>

      </div>
      <div class="movie-detail">
            Release Date: <span class="font-color-yellow">${
              data.release_date || data.first_air_date
            }</span>
            Production Companies: <span class = "font-color-yellow">${productionCompanies}</span>
            Number Of Seasons: <span class = "font-color-yellow">${
              data.seasons ? data.seasons.length : 1
            }</span>
            <div class="description">${data.overview}</div>
      </div>
      </div>
<iframe  src="https://www.youtube.com/embed/2oRlBmwKzy4?si=KYiRCkOp5mGso03x" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
    `;
}

movieDetails();
getLatestMovies("all", "day");
