const APIURL =
  "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=";
const IMGPATH = "https://image.tmdb.org/t/p/w1280";

const main = document.getElementById("main");
const form = document.getElementById("form");
let currentPage = 1;
let isLoading = false;

getMovies(APIURL + currentPage);

async function getMovies(APIURL) {
  isLoading = true;
  const resp = await fetch(APIURL);
  const respData = await resp.json();

  showMovies(respData.results);
  isLoading = false;
}

function showMovies(movies) {
  movies.forEach((movie) => {
    const { poster_path, title, vote_average, overview } = movie;
    const formattedVote = vote_average.toFixed(1);

    const movieEl = document.createElement("div");
    movieEl.classList.add("movie");

    movieEl.innerHTML = `
          <img
            src="${IMGPATH + poster_path}"
            alt="${title}"
          />
          <div class="movie-info">
            <h3>${title}</h3>
            <span class="${getClassByRate(
              vote_average
            )}">${formattedVote}</span>
          </div>
          <div class="overview">
                <h3>Overview:</h3>
                ${overview}
            </div>
        `;

    main.appendChild(movieEl);
  });
}

function getClassByRate(vote) {
  if (vote >= 7.5) {
    return "green";
  } else if (vote >= 5) {
    return "orange";
  } else {
    return "red";
  }
}

window.addEventListener("scroll", () => {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

  if (clientHeight + scrollTop >= scrollHeight - 5 && !isLoading) {
    currentPage++;
    getMovies(APIURL + currentPage);
  }
});

window.onload = function () {
  window.scrollTo(0, 0);
};
