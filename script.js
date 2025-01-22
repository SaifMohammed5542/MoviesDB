const movies = [
    {
        title: "The Shawshank Redemption",
        rating: 9.3,
        image:"xexsb_512.webp",
        year: 1994
    },
    {
        title: "The Godfather",
        rating: 9.2,
        image: "51DYbDM1TKL._SX300_SY300_QL70_FMwebp_.webp",
        year: 1972
    },
    {
        title:"The Dark Knight",
        rating: 9.0,
        image: "download.jpeg",
        year: 2008
    },
    {
        title: "The Lord of the Rings:The Return of the King",
        rating: 9.0,
        image: "download (1).jpeg",
        year: 2003
    },
    {
        title: "Fight Club",
        rating: 8.8,
        image: "download (2).jpeg",
        year: 1999
    },
    {
        title: "Inception",
        rating: 8.8,
        image: "download (3).jpeg",
        year: 2010,
    },
    {
        title: "se7en",
        rating: 8.6,
        image: "download (4).jpeg",
        year: 1995,
    },
];


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


function populateMovies() {
    const movieGrid = document.getElementById('movieGrid');
    movieGrid.innerHTML = movies.map(movie => createMovieCard(movie)).join('');
}


let currentSlide = 0;
const slides = document.querySelectorAll('.slide');

function showSlide(index) {
    slides.forEach(slide => slide.classList.remove('active'));
    slides[index].classList.add('active');
}

document.querySelector('.next').addEventListener('click', () => {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
});

document.querySelector('.prev').addEventListener('click', () => {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(currentSlide);
});


document.getElementById('search').addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const filteredMovies = movies.filter(movie => 
        movie.title.toLowerCase().includes(searchTerm)
    );
    const movieGrid = document.getElementById('movieGrid');
    movieGrid.innerHTML = filteredMovies.map(movie => createMovieCard(movie)).join('');
});


document.addEventListener('DOMContentLoaded', () => {
    populateMovies();

    setInterval(() => {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }, 5000);
});
