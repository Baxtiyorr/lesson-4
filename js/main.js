const box = document.querySelector('.box')
const form = document.querySelector('.form')
const input = document.querySelector('.input')
const loading = document.querySelector('.loading')
const not_found_massage = document.querySelector('.not_found')
const search_btn = document.querySelector('.search_btn')
const select = document.querySelector('.select')

const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4ODU3MmIwZWU3OWE3ZWE1ZDdjNTYzZTVhNjhkMzljZiIsInN1YiI6IjY1NGI5YzY3NjdiNjEzMDEwMmUxYjFjMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.MI-1wzheKLHaaSIDKGu2LGyu7e8dtG31x9LdIwCuAfk'
    }
};

const movie_url = 'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1'

const searchUrl = 'https://api.themoviedb.org/3/search/movie?query='

async function get_movies(url) {
    try {
        const response = await fetch(url, options);
        if (response.status !== 200) {
            console.log('error response');
        }
        const movies = await response.json();
        return movies
    } catch (error) {
        console.error(error)
    }
}

const img_url = 'https://image.tmdb.org/t/p/w500'

function render_movie(movies) {
    box.innerHTML = '';
    let found = false;
    const card_wrapper = document.createElement('div')
    card_wrapper.classList.add('card-wrapper')
    movies.forEach((movie) => {
        const { backdrop_path, overview, vote_average, original_title } = movie

        const card = document.createElement('div')
        card.classList.add('card')

        const image = document.createElement('img')
        image.src = img_url + backdrop_path

        card.appendChild(image)
        const card_content = document.createElement('div')
        card_content.classList.add('card__content')

        const title = document.createElement('h2')
        title.textContent = original_title

        const desc = document.createElement('p')
        const trimmed_desc = overview.substring(0, 49)
        desc.textContent = trimmed_desc

        const read_more = document.createElement('button')
        read_more.classList.add('read_more_btn')
        read_more.textContent = `readmore...`
        read_more.addEventListener('click', () => {
            desc.textContent = overview
            read_more.style.display = 'none'
            close.style.display = 'block'
        })



        const close = document.createElement('button')
        close.classList.add('close')
        close.textContent = 'close'
        close.addEventListener('click', () => {
            desc.textContent = trimmed_desc
            read_more.style.display = 'block'
            close.style.display = 'none'
        })


        const votes = document.createElement('span')
        votes.textContent = vote_average

        if (vote_average <= 4) {
            votes.classList.add('span-color-red')
        } else if (vote_average >= 5 && vote_average <= 7.5) {
            votes.classList.add('span-color-yellow')
        } else if (vote_average > 7.5) {
            votes.classList.add('span-color-green')
        }

        card_content.appendChild(title)
        card_content.appendChild(desc)
        card_content.appendChild(read_more)
        card_content.appendChild(close)
        card_content.appendChild(votes)
        card.appendChild(card_content)

        card_wrapper.appendChild(card)
        box.appendChild(card_wrapper)
        found = true;
    });
    window.scrollTo(0, 0)
    loading.style.display = 'none'
    if (!found) {
        not_found_massage.style.display = 'block'
    } else {
        loading.style.display = 'none'
        not_found_massage.style.display = 'none'
    }
}


get_movies(movie_url).then((movie) => render_movie(movie.results))


form.addEventListener('submit', async(event) => {
    event.preventDefault();
    const searchValue = input.value.trim().toLowerCase();
    const movies = await get_movies(`${searchUrl}${searchValue}`);
    render_movie(movies.results);
    form.reset()
});

select.addEventListener('change', async() => {
    const selectedValue = select.value.trim().toLowerCase();
    const movie = await get_movies(`${movie_url}&sort_by=${selectedValue}`)
    render_movie(movie.results)
})


const pages = document.querySelectorAll('ul li span')
pagination(pages)

function pagination(pages) {
    pages.forEach((page, index) => {
        page.addEventListener('click', async() => {
            const activePage = document.querySelector('.active')
            if (activePage) {
                activePage.classList.remove('active')
            }
            page.classList.add('active')
            const page_content = page.textContent
            const movies = await get_movies(`https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${page_content}`)
            render_movie(movies.results)
        })
    })
}