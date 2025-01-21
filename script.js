const API_URL = 'https://www.omdbapi.com/'; // Base API URL
const API_KEY = 'ac92cce9'; // Your API key

// Function to fetch movies from the API
async function fetchMovies(searchTerm = "top rated") {
    try {
        const response = await fetch(`${API_URL}?apikey=${API_KEY}&s=${encodeURIComponent(searchTerm)}`);
        const data = await response.json();

        if (data.Response === "True") {
            return data.Search.map(movie => ({
                title: movie.Title,
                rating: "N/A", // OMDb search doesn't include ratings
                image: movie.Poster !== "N/A" ? movie.Poster : "placeholder-image.jpg",
                year: movie.Year
            }));
        } else {
            console.error("No movies found:", data.Error);
            return [];
        }
    } catch (error) {
        console.error("Error fetching movies:", error);
        return [];
    }
}

// Function to create a movie card
function createMovieCard(movie) {
    return `
        <div class="movie-card">
            <img src="${movie.image}" alt="${movie.title}">
            <div class="movie-info">
                <h3>${movie.title}</h3>
                <p>${movie.year}</p>
                <div class="rating">
                    <i class="fas fa-star"></i>
                    <span>${movie.rating}</span>
                </div>
            </div>
        </div>
    `;
}

// Function to populate movies
async function populateMovies(searchTerm = "Avengers") {
    const movieGrid = document.getElementById('movieGrid');
    movieGrid.innerHTML = '<p>Loading...</p>'; // Show loading message
    const movies = await fetchMovies(searchTerm);
    if (movies.length > 0) {
        movieGrid.innerHTML = movies.map(movie => createMovieCard(movie)).join('');
    } else {
        movieGrid.innerHTML = '<p>No movies found. Try a different search.</p>';
    }
}

// Event listener for the search input
document.getElementById('search').addEventListener('input', (e) => {
    const searchTerm = e.target.value.trim();
    if (searchTerm) {
        populateMovies(searchTerm);
    }
});

// Initialize movies when the page loads
document.addEventListener('DOMContentLoaded', () => {
    populateMovies(); // Fetch default movies on load
});
