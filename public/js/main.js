const fnv = document.querySelector(`#fnv`);


const options = {
    iterations: 3, //liczba lub Infinity
    delay : 0, //w ms
    duration: 1000, //w ms
    fill : "forwards", //both, forward, backward
    direction : "alternate", //normal, backward,
    ease : "ease-in", //ease, linear, ease-in, ease-out, ease-in-out, cubic(), steps()
}

fnv.addEventListener('click', ()=>{
    console.log(`S`);
    fnv.animate(
        [
            { transform: `rotate(0deg)`},
            { transform: `rotate(360deg)`}
        ],
        options
    )
})

