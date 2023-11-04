const box = document.querySelector('.card_container')
const input = document.querySelector('.search_input')
const loading = document.querySelector('.loading')
const form = document.querySelector('.form')
const notFoundMassage = document.querySelector('.not_found')
const countryData = fetch('https://restcountries.com/v3.1/all')
const itemsPerpage = 20;
let currentPage = 1;
let totalItems = 0;


let newData = [];

countryData.then((response) => response.json()).then((countries) => {
    newData = countries
    totalItems = newData.length
    generatePaninationLinks()
    callCountry('')
})

function callCountry(searchValue) {
    box.innerHTML = '';

    let found = false;
    const startIndex = (currentPage - 1) * itemsPerpage;
    const endIdex = Math.min(startIndex + itemsPerpage, totalItems)
    const card_wrapper = document.createElement('div')
    card_wrapper.classList.add('card-wrapper')



    newData.slice(startIndex, endIdex).forEach((country) => {
        if (country !== null && country.currencies !== undefined) {
            const countryName = country.name.common.toLowerCase();
            const searchData = searchValue.toLowerCase();
            const countryCurrencies = Object.keys(country.currencies)

            if (countryName.includes(searchData)) {
                const card = document.createElement('div')
                card.classList.add('card')

                const image = document.createElement('img')
                image.src = country.flags.png
                image.alt = countryName

                const card_content = document.createElement('div')
                card_content.classList.add('card__content')

                const title = document.createElement('h2')
                title.textContent = countryName

                const population = document.createElement('h3')
                population.textContent = `Population: ${country.population.toLocaleString()}`

                const region = document.createElement('h3')
                region.textContent = `Region: ${country.region}`

                const capital = document.createElement('h3')
                capital.textContent = `Capital: ${country.capital}`

                const currencies = document.createElement('h3')
                currencies.textContent = `Currencies: ${countryCurrencies}`

                card.appendChild(image)
                card_content.appendChild(title)
                card_content.appendChild(population)
                card_content.appendChild(region)
                card_content.appendChild(capital)
                card_content.appendChild(currencies)
                card_wrapper.appendChild(card)
                card.appendChild(card_content)
                box.appendChild(card_wrapper)

                found = true;
            }
        }
    })

    window.scrollTo(0, 0)

    loading.style.display = 'none'

    if (!found) {
        notFoundMassage.style.display = 'block'
    } else {
        loading.style.display = 'none'
        notFoundMassage.style.display = 'none'
    }
}

const pagination = document.querySelector('.pagination')

function generatePaninationLinks() {
    pagination.innerHTML = '';
    const totalPage = Math.round(totalItems / itemsPerpage)

    newData.slice(0, totalPage).forEach((_, i) => {
        const pageLink = document.createElement('li')
        pageLink.textContent = i + 1;

        pagination.appendChild(pageLink)

        pageLink.addEventListener('click', () => {
            currentPage = i + 1;
            callCountry('');
            updatePaginationLink()
            if (index + 1 === currentPage) {
                pageLink.classList.add('active');
            }
        })


    })
}

function updatePaginationLink() {
    const pageLinks = pagination.querySelectorAll('li')
    pageLinks.forEach((link, index) => {
        if (index + 1 === currentPage) {
            link.classList.add('active')
        } else {
            link.classList.remove('active')
        }
    })
}






form.addEventListener('submit', (e) => {
    e.preventDefault()
    const searchValue = input.value.trim();
    callCountry(searchValue)
    form.reset();
})


// function generatePaginationLinks() {
//     pagination.innerHTML = '';
//     const totalPages = Math.ceil(totalItems / itemsPerPage);

//     console.log(newNumber(4));
//     myData.slice(0, totalPages).forEach((_, index) => {
//         const pageLink = document.createElement('li');
//         pageLink.textContent = index + 1;

//         pageLink.addEventListener('click', () => {
//             currentPage = index + 1;
//             updateCard(searchInput.value);
//             updatePaginationLink();
//         });
//         if (index + 1 === currentPage) {
//             pageLink.classList.add('active');
//         }

//         pagination.appendChild(pageLink);
//     })

// }

// function updatePaginationLink() {
//     const pageLinks = document.querySelectorAll('li');
//     pageLinks.forEach((link, index) => {
//         if (index + 1 === currentPage) {
//             link.classList.add('active')
//         } else {
//             link.classList.remove('active')
//         }
//     })
// }

// input.addEventListener('input', () => {
//     const searchValue = input.value.trim();
//     callCountry(searchValue)
// });


















// Эксперемантальный код

// form.addEventListener('submit', async(e) => {
//     e.preventDefault();
//     const inputvalue = Object.fromEntries(new FormData(e.target))

//     const response = await fetch(`https://restcountries.com/v3.1/name/${inputvalue.name}`);

//     if (response.ok) {
//         const data = await response.json();
//         callCountry(data)
//     } else {
//         alert('NOT FOUND!')
//     }



// })