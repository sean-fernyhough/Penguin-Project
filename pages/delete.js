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

let remove = () => {
    let id = document.querySelector('#searchbar').value;
    fetch(`http://localhost:8083/delete/${id}`, {
        method: "DELETE"
    }).then((response) => {
        if (response.status != 200) {
            console.error(`Error: ${response.status}`);
            alert(`Error: ${response.status}`)
        } else {
            console.log("deleted")
        }
    })
}



document.querySelector('#deleteBtn').addEventListener('click', remove)