async function voegVraagToe() {
    let invoer = document.getElementById("vraagInvoer");
    let data;

    if (invoer.value.length >= 5) {
        console.log(invoer.value);

        data = {
            "question": invoer.value
        };
    } else {
        alert("Voer geldige vraag in")
    }

    let res = await fetch('url.json');
    let linkData = await res.json();

    fetch(linkData.link + "thesis/add", {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    })

        .then(response => response.json)
        .then(json => console.log(json))
        .catch(err => console.log(err));
}