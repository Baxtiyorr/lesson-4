const box = document.querySelector('.card_container')
const loading = document.querySelector('.loading')
const form = document.querySelector('.form')
const input = document.querySelector('.search_input')
const not_found_massage = document.querySelector('.not_found')


// const serch_users =
const github_api_url = 'https://api.github.com/users?/per_page-80';
const token = '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'

const data = fetch(github_api_url, {
    method: 'GET',
    headers: {
        'Authorization': `token ${token} `,
        'X-GitHub-Api-Version': '2022-11-28'
    }
})


async function get_data(url) {
    try {
        const response = fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': `token ${token} `,
                'X-GitHub-Api-Version': '2022-11-28'
            }
        })
        const data = (await response).json();
        return data
    } catch (error) {
        console.log(error);
    }
}


form.addEventListener('submit', async(e) => {
    e.preventDefault()
    const search_value = input.value.trim().toLowerCase()

    const users = await get_data(`https://api.github.com/users/${search_value}`)

    users_render(users)

})


function users_render(users) {
    let found = false;
    const card_wrapper = document.createElement('div')
    card_wrapper.classList.add('card-wrapper')
    users.forEach((user) => {
        const card = document.createElement('div')
        card.classList.add('card')

        const image = document.createElement('img')
        image.src = user.avatar_url
        image.alt = user.login

        const card_content = document.createElement('div')
        card_content.classList.add('card__content')

        const user_log = document.createElement('h2')
        user_log.textContent = `Login: ${user.login}`

        const user_id = document.createElement('h4')
        user_id.classList.add('user_id')
        user_id.textContent = `User ID: ${user.id}`
        const status = document.createElement('h3')
        status.textContent = `Status: ${user.type}`


        card.appendChild(user_id)
        card.appendChild(image)
        card_content.appendChild(user_log)
        card_content.appendChild(status)
        card_wrapper.appendChild(card)
        card.appendChild(card_content)
        box.appendChild(card_wrapper)

        found = true;
    })

    loading.style.display = 'none'

    if (!found) {
        not_found_massage.style.display = 'block'
    } else {
        loading.style.display = 'none'
        not_found_massage.style.display = 'none'
    }
}

get_data(github_api_url).then((data) => users_render(data))







// form.addEventListener('submit', (e) => {
//     e.preventDefault()
//     const searchValue = input.value.trim();
//     users_render(searchValue)
//     form.reset();
// })


// input.addEventListener('input', () => {
//     const searchValue = input.value.trim();
//     callCountry(searchValue)
// });