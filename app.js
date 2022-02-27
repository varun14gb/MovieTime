const apiKey = "bcb1a8422badaa2928750e97d9713b59";

document.getElementById("search").addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
        handleQuery();
    }
});

// Suggestions of popular movies in search field (20 * 20)
fillSuggestions = () => {
    let sg = "";
    for (let i = 1; i <= 20; i++) {
        fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=${i.toString()}`)
            .then(response => response.json())
            .then(suggestions => {
                suggestions.results.forEach(suggestion => {
                    sg = sg.concat(`<option value="${suggestion.original_title}">`)
                });

                document.querySelector("#suggestions").innerHTML = sg;
            })
            .catch(err => {
                return alert("Error occurred while fetching suggestions!");
            })
    }
}

fillSuggestions();

handleQuery = async () => {
    try {
        let main = document.querySelector(".search");
        const query = document.querySelector("#search").value;

        main.innerHTML = `<div class="loader"></div>`;

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

        let credits = await fetch(`https://api.themoviedb.org/3/movie/${movie.id}/credits?api_key=${apiKey}`)
        credits = await credits.json();

        let casts = "";
        for await (const ac of credits.cast) {
            let actor = await fetch(`https://api.themoviedb.org/3/person/${ac.id}?api_key=${apiKey}`);
            actor = await actor.json();

            casts = casts.concat(`
                <div class="card">
                    <img alt="${actor.name}" src="https://image.tmdb.org/t/p/original/${actor.profile_path}" />
                    <p>${actor.name}</p>
                </div>
            `);
        }

        main.innerHTML = `
        <div class="movie">
            <img src="https://image.tmdb.org/t/p/original/${movie.poster_path}" />
            <div class="cont">
                <h1 class="title">${movie.original_title}</h1>
                <div class="date">
                    <p>Release Date: ${movie.release_date}</p>
                    <p>Runtime: ${movie.runtime}m</p>
                </div>
                <div class="tags">
                    ${tags}
                </div>
                <blockquote><i>${movie.tagline}</i></blockquote>
                <p>${movie.overview}</p>
                <p><b>Awards:</b>${" " + movie1.Awards}</p>
                <h3>Ratings:</h3>
                <div class="ratings">
                    ${ratings}
                </div>
            </div>
            
        </div>
        `;

        document.querySelector(".casts").innerHTML = `
        <h2>Cast:</h2>
                    <div class="cards">
                        ${casts}
                    </div>
                </div>
                `;

    } catch (e) {
        return alert("Error occurred while connnecting to APIs!");
    }
}