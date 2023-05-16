const map = document.querySelector('svg');
const infobox = document.querySelector('#infoBox');
const resultbox = document.querySelector('#resultBox');
const mapAreas = document.querySelectorAll('.cls-2');
const pointer = document.querySelector('#pointer');

let mapbBox = map.getBoundingClientRect();

    //placerholder data
let data = new Array;
data['pinecreek'] = `THE CREEK OF PINES`;
data['sorrows'] = `MAIN CAMP OF THE SORROWS TRIBE`;
data['deadhorses'] = `MAIN CAMP OF THE DEAD HORSES TRIBE`;
data['threemarys'] = `MAIN OUTPOST OF THE WHITE LEGS TRIBE`;
data['southpass'] = `SOUTHERN ENTRANCE TO ZION`;
data['pinecreeksource'] = `SOURCE OF PINE CREEK`;

let searchregex;
const clickEvent = new Event('click');
const hoverEvent = new Event('mouseover');
const leaveEvent = new Event('mouseleave');

let bestCandidate = new Array;

const searchEval = () => {
        //reset
    bestCandidate.length = 0;
    mapAreas.forEach(element => {
        element.dispatchEvent(leaveEvent)
    })    

        //if a query is actually present
    if(infobox.value){
        searchregex = RegExp(infobox.value, 'g'); 
        mapAreas.forEach(element => {
            if(element.id.match(searchregex)){
                bestCandidate.push([element.id.search(searchregex),element])
            }
        })

        if(bestCandidate.length > 0){
                //clunky but it works
            bestCandidate.find(element => element[0] >= 0)[1].dispatchEvent(clickEvent)
            bestCandidate.find(element => element[0] >= 0)[1].dispatchEvent(hoverEvent)
            pointer.classList.add('hidden')
        
        }
        else{
            resultbox.textContent = `NOTHING FOUND`;
        }
    }
    else{
        resultbox.textContent = `RESULTBOX`;
    }
}

const resultEval = (e) => {
    resultbox.textContent = data[e.target.id];
}

const resizeEval = () => {
    mapbBox = map.getBoundingClientRect(); //I hate that I have to get the mapbBox value each time, ugh
    map.style.left = window.innerWidth/2 - mapbBox.width/4 + "px";
    map.style.top = window.innerHeight/2 - mapbBox.height/2 + "px";

        //this is so damn inelegant
    infobox.style.width = 25 + "vw";
    infobox.style.left = (parseFloat(map.style.left.slice(0,-2)) / 2) - (infobox.offsetWidth /2) + "px";

    resultbox.style.width = 25 + "vw";
    resultbox.style.left = (parseFloat(map.style.left.slice(0,-2)) / 2) - (resultbox.offsetWidth /2) + "px";
}

const colorGive = (e) => {
    e.target.classList.remove('cls-2')
    e.target.classList.add('cls-3')
}

const colorTake = e => {
    e.target.classList.add('cls-2')
    e.target.classList.remove('cls-3')
}

const pointerPosEval = e => {
    pointer.style.left = (e.pageX - pointer.offsetWidth/2 )+ "px";
    pointer.style.top = (e.pageY - pointer.offsetHeight - 5 )+ "px";
}

const pointerEval = e => {
    pointer.textContent = e.target.id
    pointer.classList.remove('hidden');
}

const pointerTake = e => {
    pointer.classList.add('hidden');
}

mapAreas.forEach(element => {
    element.addEventListener('click', resultEval);
    element.addEventListener('mouseover', colorGive);
    element.addEventListener('mouseover', pointerEval);

    element.addEventListener('mouseleave', colorTake);
    element.addEventListener('mouseleave', pointerTake);

    element.addEventListener('transitionstart', ()=>{
        console.log(`TRANSITION START`);
    })
})

infobox.addEventListener('input', searchEval);
window.addEventListener('resize', resizeEval);
window.addEventListener('load', resizeEval);
window.addEventListener('mousemove', pointerPosEval);