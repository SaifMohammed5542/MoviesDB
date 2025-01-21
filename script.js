const API_URL = 'https://www.omdbapi.com/';
const API_KEY = 'ac92cce9';

async function fetchMovies(searchTerm = "top rated") {
    try {
        const response = await fetch(`${API_URL}?apikey=${API_KEY}&s=${encodeURIComponent(searchTerm)}`);
        const data = await response.json();

        if (data.Response === "True") {
            return data.Search.map(movie => ({
                title: movie.Title,
                rating: "N/A",
                image: movie.Poster !== "N/A" ? movie.Poster : "placeholder-image.jpg",
                year: movie.Year
            }));
        } else {
            console.error(`No movies found: ${data.Error}`);
            return [];
        }
    } catch (error) {
        console.error("Error fetching movies:", error);
        return [];
    }
}

function createMovieCard(movie) {
    return `
        <div class="movie-card">
            <img src="${movie.image}" alt="${movie.title}">
            <div class="movie-info">
                <h3>${movie.title}</h3>
                <p>Year: ${movie.year}</p>
                <p>Rating: ${movie.rating}</p>
            </div>
        </div>
    `;
}


async function populateMovies(searchTerm = "") {
    const movieGrid = document.getElementById('movieGrid');
    movieGrid.innerHTML = '<p>Loading...</p>';

    const movies = await fetchMovies(searchTerm);
    if (movies.length > 0) {
        movieGrid.innerHTML = movies.map(movie => createMovieCard(movie)).join('');
    } else {
        movieGrid.innerHTML = '<p>No movies found. Try a different search.</p>';
    }
}

document.getElementById('search').addEventListener('input', (e) => {
    const searchTerm = e.target.value.trim();
    populateMovies(searchTerm);
});

document.addEventListener('DOMContentLoaded', () => {
    populateMovies(); // Default movie list
});
