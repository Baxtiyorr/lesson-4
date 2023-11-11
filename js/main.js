const box = document.querySelector('.box')
const form = document.querySelector('.form')
const search_btn = document.querySelector('.search_btn')
const hide = document.querySelector('.pass')
const show = document.querySelector('.pass-2')

const input_password = document.querySelector('.input_password')
const input_first_name = document.querySelector('.input_first_name')
const input_last_name = document.querySelector('.input_last_name')

async function create_post() {
    const first_name = input_first_name.value.trim();
    const last_name = input_last_name.value.trim();
    const password = input_password.value.trim();
    const user_id = new Date().getMilliseconds();
    const student = {
        first_name: first_name,
        last_name: last_name,
        password: password,
        user_id: user_id,
    }

    const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json; charset=UTF-8'
        },
        body: JSON.stringify(student)
    })

    if (response.ok) {
        const newPost = await response.json();
        const wrap_obj = [newPost]
        user_render(wrap_obj)
    }

}

const card_wrapper = document.createElement('div');
card_wrapper.classList.add('card-wrapper');
box.appendChild(card_wrapper);

function user_render(users) {


    users.forEach((user) => {
        const card = document.createElement('div');
        card.classList.add('card');

        const card_content = document.createElement('div');
        card_content.classList.add('card__content');

        const first_name = document.createElement('h2');
        first_name.textContent = `Name: ${user.first_name}`;

        const last_name = document.createElement('h2');
        last_name.textContent = `Last name: ${user.last_name}`;

        const password = document.createElement('h3');
        password.textContent = `Password: ${user.password}`;

        const user_id = document.createElement('h4');
        user_id.textContent = `User ID: ${user.user_id}`;

        card_content.appendChild(first_name);
        card_content.appendChild(last_name);
        card_content.appendChild(password);
        card_content.appendChild(user_id);

        card.appendChild(card_content);
        card_wrapper.appendChild(card);
    });
}




form.addEventListener('submit', (e) => {
    e.preventDefault()
    if (input_first_name === '' && input_last_name === '' && input_password === '') {
        const span = document.querySelectorAll('.validate')
        console.log(span);
    }


    create_post()
    form.reset()
})



hide.addEventListener('click', () => {
    show.classList.remove('display')
    hide.classList.add('display')
    if (input_password.getAttribute('type') === 'password') {
        input_password.setAttribute('type', 'text')
    } else {
        input_password.setAttribute('type', 'password')
    }


})

show.addEventListener('click', () => {
    show.classList.add('display')
    hide.classList.remove('display')
    if (input_password.getAttribute('type') === 'password') {
        input_password.setAttribute('type', 'text')
    } else {
        input_password.setAttribute('type', 'password')
    }

})