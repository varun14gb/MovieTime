const apiKey = "bcb1a8422badaa2928750e97d9713b59";

handleQuery = async () => {
    try {

        const query = document.querySelector("#search").value;
        if (query === "") {
            return alert("Enter somehing in search field");
        }

        let movie = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}`);
        movie = await movie.json();

        if (movie.results.length < 1) {
            return alert("No Movie Found! 404!");
        }

        movie = await fetch(`https://api.themoviedb.org/3/movie/${movie.results[0].id}?api_key=${apiKey}`);
        movie = await movie.json();

        let tags = "";
        movie.genres.forEach(genre => {
            tags = tags.concat(`<p>${genre.name}</p>`);
        });

        let movie1 = await fetch("https://www.omdbapi.com/?apikey=c3c05772&i=" + movie.imdb_id);
        movie1 = await movie1.json();

        let ratings = "";
        movie1.Ratings.forEach(rating => {
            ratings = ratings.concat(`<p>${rating.Source} : ${rating.Value}</p>`)
        });

        console.log(movie1);
        const main = document.querySelector(".search");
        main.innerHTML = `
        <div class="movie">
            <img src="https://image.tmdb.org/t/p/original/${movie.poster_path}" />
            <div class="cont">
                <h1>${movie.original_title}</h1>
                <div class="date">
                    <p>Release Date: ${movie.release_date}</p>
                    <p>Runtime: ${movie.runtime}m</p>
                </div>
                <div class="tags">
                    ${tags}
                </div>
                <blockquote><i>${movie.tagline}</i></blockquote>
                <p>${movie.overview}</p>
                <h3>Ratings:</h3>
                <div class="ratings">
                    ${ratings}
                </div>
            </div>
        </div>
        `;

    } catch (e) {
        console.log(e)
        return alert("Error occurred while connnecting to APIs!");
    }
}