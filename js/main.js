// const form = document.querySelector('.form'),
//     input = document.getElementById('input_distance'),
//     onFoot = 3.6,
//     onBike = 20.1,
//     inCar = 70,
//     onPlane = 800,
//     h2 = document.querySelectorAll('.h2')

// form.addEventListener('submit', (event) => {
//     event.preventDefault()
//     const userInp = input.value.trim();

//     const countOnFoot = userInp / onFoot;
//     const countOnBike = userInp / onBike;
//     const countInCar = userInp / inCar;
//     const countOnPlane = userInp / onPlane;

//     h2.forEach((element, i) => {

//         switch (i) {
//             case 0:
//                 element.textContent = `${countOnFoot.toFixed(1)} hours`
//                 break;
//             case 1:
//                 element.textContent = `${countOnBike.toFixed(1)} hours`
//                 break;
//             case 2:
//                 element.textContent = `${countInCar.toFixed(1)} hours`
//                 break;
//             case 3:
//                 element.textContent = `${countOnPlane.toFixed(1)} hours`
//                 break;
//             default:
//                 break;
//         }

//     })

//     form.reset()
// })


// const celsiusInp = document.getElementById('toFarengeyt'),
//     farengeytForm = document.querySelector('.faren_form'),
//     h2_2 = document.querySelector('.count')

// farengeytForm.addEventListener('submit', (event) => {
//     event.preventDefault()
//     const C = celsiusInp.value.trim();
//     const calc = (C * (9 / 5)) + 32;

//     h2_2.textContent = `${calc}°F`
// })

const box = document.querySelector('.clock')

window.onload = function() {
    window.setInterval(function() {
        const date = new Date();

        let hours = date.getHours();
        let minutes = date.getMinutes();
        let second = date.getSeconds();

        if (hours < 10) { hours = '0' + hours }
        if (minutes < 10) { minutes = '0' + minutes }
        if (second < 10) { second = '0' + second }

        const clock = hours + ':' + minutes + ':' + second;

        box.textContent = clock;
    }, 1000);
}