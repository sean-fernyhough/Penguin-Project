document.querySelector('#searchButton').addEventListener('click', () => {
    let query = document.querySelector('#searchBar').value;
    let letter = query.charAt(0);
    letter = letter.toUpperCase();
    query = query.slice(1, query.length);
    query = letter + query;
    console.log(query);

    fetch(`http://localhost:8083/get/name/${query}`).then((response) => {
        if (response.status != 200) {
            console.error(`Error: ${response.status}`);
        } response.json().then((data) => {
            console.log(data);
            for (obj of data) {
                console.log(obj)
            }
        })
    })
})
let searchArea = document.querySelector('#searchArea');
let body = document.querySelector('body');
let removeChildren = (parent) => {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

let br1 = document.createElement('br');
let br2 = document.createElement('br');
let br3 = document.createElement('br');
let searchType = "id";

setSearchId = () => {

    searchType = "id";
    removeChildren(searchArea);
    let label = document.createElement('label');
    let input = document.createElement('input');
    input.type = "number";
    input.id = "searchbar";
    input.name = "idInput";
    label.textContent = "Penguin's ID: "


    searchArea.appendChild(br1);
    searchArea.appendChild(label);
    searchArea.appendChild(br2);
    searchArea.appendChild(input);
    searchArea.appendChild(br3);

}
setSearchName = () => {

    searchType = "name";
    removeChildren(searchArea);
    let label = document.createElement('label');
    let input = document.createElement('input');
    input.type = "text";
    input.id = "searchbar";
    input.name = "nameInput";
    label.textContent = "Penguin's Name: "


    searchArea.appendChild(br1);
    searchArea.appendChild(label);
    searchArea.appendChild(br2);
    searchArea.appendChild(input);
    searchArea.appendChild(br3);
}

setSearchAge = () => {

    searchType = "age";
    removeChildren(searchArea);
    let label = document.createElement('label');
    let input = document.createElement('input');
    input.type = "number";
    input.id = "searchbar";
    input.name = "nameInput";
    label.textContent = "Penguin's Age: "


    searchArea.appendChild(br1);
    searchArea.appendChild(label);
    searchArea.appendChild(br2);
    searchArea.appendChild(input);
    searchArea.appendChild(br3);
}

setSearchAll = () => {

    searchType = "all";
    removeChildren(searchArea);
    let label = document.createElement('label');
    label.textContent = "Press search to show all Penguins"
    searchArea.appendChild(br1);
    searchArea.appendChild(label);
}

let createUI = (data) => {
    let results = document.querySelector('#results');

    let main = document.createElement('div');
    main.classList = "card";

    let cardBody = document.createElement('div');
    cardBody.classList = "card-body";

    let title = document.createElement('h5');
    title.classList = "card-title";
    title.textContent = `${data.name}`

    let subTitle = document.createElement('h6');
    subTitle.classList = "card-subtitle";
    subTitle.textContent = `${data.age} Years Old`

    let bodyText = document.createElement('p');
    bodyText.classList = "card-text";

    let feetString;
    if (data.happyFeet == "true") {
        feetString = `${data.name} does have happy feet!`
    } else {
        feetString = `${data.name} doesn't have happy feet!`
    }
    bodyText.textContent = feetString

    cardBody.appendChild(title);
    cardBody.appendChild(subTitle);
    cardBody.appendChild(bodyText);
    main.appendChild(cardBody);
    results.appendChild(main);

}


let search = () => {
    console.log(searchType);
    let fetchString;
    if (searchType == "id") {
        let value = document.querySelector('#searchbar').value;
        fetchString = `http://localhost:8083/get/${value}`;
        console.log(fetchString);
    } else if (searchType == "name") {
        let value = document.querySelector('#searchbar').value;
        fetchString = `http://localhost:8083/get/name/${value}`;
    } else if (searchType == "age") {
        let value = document.querySelector('#searchbar').value;
        fetchString = `http://localhost:8083/get/age/${value}`;
    } else if (searchType == "all") {
        fetchString = `http://localhost:8083/getAll`;
    }
    fetch(fetchString).then((response) => {
        if (response.status != 200) {
            console.error(`Error: ${response.status}`);
            alert(`Error searching penguins\nError: ${response.status}`)
        } else {
            response.json().then((data) => {
                let results = document.querySelector('#results');
                removeChildren(results);
                for (obj of data) {
                    console.log(obj)
                    createUI(data);

                }

            }).catch((error) => {
                console.error(error);
            })
        }
    })

}

body.addEventListener('load', setSearchId)
document.querySelector('#idTab').addEventListener('click', setSearchId)
document.querySelector('#nameTab').addEventListener('click', setSearchName)
document.querySelector('#ageTab').addEventListener('click', setSearchAge)
document.querySelector('#allTab').addEventListener('click', setSearchAll)
document.querySelector('#searchBtn').addEventListener('click', search)