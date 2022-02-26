const apiKey = "bcb1a8422badaa2928750e97d9713b59";

handleQuery = () => {
    const query = document.querySelector("#search").value;
    if (query === "") {
        return alert("Enter somehing in search field");
    }

    fetch(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}`)
        .then(response => response.json())
        .then(data => {
            const movie = data.results[0];
            if (movie) {
                const main = document.querySelector(".search");
                main.innerHTML = `
                <div class="movie">
                    <img src="https://image.tmdb.org/t/p/original/${movie.poster_path}" />
                    <div class="cont">
                        <h1>${movie.original_title}</h1>
                    </div>
                </div>
                `;
                console.log(data.results[0]);
            } else {
                return alert("Nothing Found! 404!");
            }
        });
}