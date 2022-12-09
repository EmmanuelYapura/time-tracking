const backgroundColors = [
    "hsl(15, 100%, 70%)",
    "hsl(195, 74%, 62%)",
    "hsl(348, 100%, 68%)",
    "hsl(145, 58%, 55%)",
    "hsl(264, 64%, 52%)",
    "hsl(43, 84%, 65%)"
];

const arrayTimeframe = document.querySelectorAll('.options p');

arrayTimeframe.forEach( timeframeButton => {
    timeframeButton.addEventListener('click', () => {
        timeframeValue = timeframeButton.innerText.toLowerCase();
        resetNodes();
        loadData(timeframeValue);
    })
})

function resetNodes(){
    const allNodes = document.querySelectorAll(".container-item");
    allNodes.forEach( node => node.remove());
}

async function getData(){
    const response = await fetch("data.json");
    const array = await response.json();
    return array;
}

async function loadData(option = "weekly"){
    const arrayItems = await getData();

    arrayItems.forEach( (item, index) => {
        createItem(item, index, option);
    });
}


function createItem( data, index, option){
    const $body = document.querySelector("body");
    const containerItems = document.querySelector(".container-items");

    let containerItem = document.createElement("div");
    containerItem.classList.add("container-item");
    containerItem.style.backgroundColor = backgroundColors[index];
    containerItem.style.backgroundImage = index != 5 ? `url("./images/icon-${data.title.toLowerCase()}.svg")` : `url("./images/icon-self-care.svg")`;

    let infoItem = document.createElement("div");
    infoItem.classList.add("info-item");

    let containerHours = document.createElement("div")
    containerHours.classList.add("container-hours");

    /* rubro */
    let p1 = document.createElement("p");
    p1.classList.add("text-hours");
    p1.innerText = `${data.title}`;
    
    /* horas */
    let p2 = document.createElement("p");
    p2.classList.add("text-hours");
    p2.id = "hours";
    p2.innerText = `${data.timeframes[option].current}hrs`;

    let containerWeek = document.createElement("div")
    containerWeek.classList.add("container-week");

    /* ... */
    let imgEllipsis = document.createElement("img");
    imgEllipsis.src = "./images/icon-ellipsis.svg"
    imgEllipsis.classList.add("ellipsis");
    imgEllipsis.alt = `icon-ellipsis`;

    /* last week */
    let p4 = document.createElement("p");
    p4.classList.add("text-week");
    p4.id = "week";
    p4.innerText = `Last week - ${data.timeframes[option].previous}hrs`;
    
    containerHours.appendChild(p1);
    containerHours.appendChild(p2);

    containerWeek.appendChild(imgEllipsis);
    containerWeek.appendChild(p4);

    infoItem.appendChild(containerHours);
    infoItem.appendChild(containerWeek);

    containerItem.appendChild(infoItem);

    containerItems.appendChild(containerItem);

    $body.appendChild(containerItems);
}

loadData('weekly');
