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

updatePenguin = () => {
    let idValue = document.querySelector('#idInput').value;
    let nameValue = document.querySelector('#nameInput').value;
    let ageValue = document.querySelector('#ageInput').value;
    let feetValue = document.querySelector('input[name="feetInput"]:checked').value;
    // console.log(feetValue);
    feetValue = (feetValue == "true") ? true : false;
    // console.log(feetValue);

    let createUI = (data) => {
        try {
            let previous = document.querySelector('#container')
            previous.remove();
        } catch { }
        let main = document.querySelector('#result');
        let container = document.createElement('div');
        container.id = "container"
        main.appendChild(container);

        let resultStatus = document.createElement('p');
        resultStatus.textContent = "Penguin Updated";
        container.appendChild(resultStatus);

        let resultId = document.createElement('p');
        resultId.textContent = `Penguin ID: ${data.id}`;
        container.appendChild(resultId);

        let resultName = document.createElement('p');
        resultName.textContent = `Penguin Name: ${data.name}`;
        container.appendChild(resultName);

        let resultAge = document.createElement('p');
        resultAge.textContent = `Penguin Age: ${data.age}`;
        container.appendChild(resultAge);

        let resultFeet = document.createElement('p');
        let feetString;
        if (data.happyFeet == "true") {
            feetString = `${data.name} does have happy feet!`
        } else {
            feetString = `${data.name} doesn't have happy feet!`
        } resultFeet.textContent = `${feetString}`;
        container.appendChild(resultFeet);



        // result.textContent = `Penguin Created! 
        // Name: ${data.name}
        // Age: ${data.age}
        // ${feetString}`
        // container.appendChild(result);
    }
    let penguin = {
        pId: idValue,
        pName: nameValue,
        pAge: ageValue,
        pFeet: feetValue
    }
    console.log(penguin)
    fetch(`http://localhost:8083/Update/${idValue}`, {
        method: "PUT",
        headers: { "content-type": "application/JSON" },
        body:
            JSON.stringify(penguin)
    }).then((response) => {
        if (response.status != 200) {
            console.error(`Error: ${response.status}`);
            alert(`Error updating penguin\nError: ${response.status}`)
        } else {
            response.json().then((data) => {
                console.log(data)
                createUI(data);


            }).catch((error) => {
                console.error(error);
            })
        }
    })
}
let penguin2 = {
    pName: "name",
    pAge: 10,
    pFeet: "true"
}


document.querySelector('#createButton').addEventListener('click', updatePenguin)