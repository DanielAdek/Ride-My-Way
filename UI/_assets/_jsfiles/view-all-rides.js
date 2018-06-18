const departure = document.querySelector('#departure');
const arrival = document.querySelector('#arrival');
const dateViewRides = document.querySelector('#date-view-all-rides');
const searchRidesButton = document.querySelector('#search-rides');
const subHeadingTitle = document.querySelector('.title > h2');
const getOne = document.querySelector('.card-content .one');
const getTwo = document.querySelector('.card-content .two');
const getThree = document.querySelector('.card-content .three');
const getFour = document.querySelector('.card-content .four');
const getFive = document.querySelector('.card-content .five');
const getSix = document.querySelector('.card-content .six');
const viewDetailLink = document.querySelectorAll('.view-details');
const modal = document.querySelector('.modal');
const backdropOverLay = document.querySelector('.backdrop-modal');
const modalButton = document.querySelectorAll('.close-modal');

searchRidesButton.addEventListener('click', showFilteredRides);
viewDetailLink.forEach((element) => {
    element.addEventListener('click', showModal);
});
modalButton.forEach((element) => {
    element.addEventListener('click', closeModal);
});

let driversNames = ["Annan", "Anndra", "Anselm", "Anthony", "Anthony-John", "Antoine", "Anton", "Antoni",
    "Antonio", "Antony", "Antonyo", "Anubhav", "Aodhan", "Aon", "Aonghus", "Apisai",
    "Brydon-Craig", "Bryn", "Brynmor", "Bryson", "Buddy", "Bully", "Burak", "Burhan", "Butali", "Butchi", "Byron", "Cabhan", "Cadan", "Cade",
    "Caden", "Cadon", "Cadyn", "Caedan", "Caedyn", "Cael", "Caelan", "Caelen",
    "Craig-James", "Crawford", "Creag", "Crispin", "Cristian", "Crombie", "Cruiz", "Cruz",
    "Cuillin", "Cullen", "Cullin", "Curtis", "Cyrus", "Daanyaal", "Daegan", "Daegyu",
    "Dafydd", "Dailey", "Daimhin", "Daithi", "Dakota", "Daksh", "Dale", "Dalong",
    "Dalton", "Damian", "Damien", "Damon", "Dan", "Danar", "Dane", "Danial", "Daniel",
    "Daniele", "Daniel-James", "Daniels",
    "Daniil", "Danish", "Daniyal", "Danniel", "Danny", "Dante", "Danyal", "Danyil",
];


function showFilteredRides(e) {
    e.preventDefault();
    if (departure.value.trim() === "" || arrival.value.trim() === "") {
        alert('Please enter start and end locations');
        return false;
    }
    subHeadingTitle.textContent = "Search Results";
    changeName();
}

function changeName() {

    const random = Math.floor(Math.random() * driversNames.length);
    const randomNum1 = Math.floor(Math.random() * driversNames.length - 1);
    const randomNum2 = Math.floor(Math.random() * driversNames.length - 2);
    const randomNum3 = Math.floor(Math.random() * driversNames.length - 3);
    const randomNum4 = Math.floor(Math.random() * driversNames.length - 4);
    const randomNum5 = Math.floor(Math.random() * driversNames.length - 5);

    getOne.textContent = driversNames[random];
    getTwo.textContent = driversNames[randomNum1];
    getThree.textContent = driversNames[randomNum2];
    getFour.textContent = driversNames[randomNum3];
    getFive.textContent = driversNames[randomNum4];
    getSix.textContent = driversNames[randomNum5];
    departure.value = "";
    arrival.value = null;
}

function showModal() {
    backdropOverLay.classList.add('openBackdrop');
    modal.classList.add('openModal');   
}

function closeModal() {
    backdropOverLay.classList.remove('openBackdrop');
    modal.classList.remove('openModal');
}