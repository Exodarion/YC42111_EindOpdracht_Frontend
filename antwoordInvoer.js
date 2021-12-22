async function antwoordInvoer(){
    let res = await fetch('url.json');
    let data = await res.json();

    let url = data.link + "answer/add";
    let antwoord = document.getElementById("antwoord");
    console.log(antwoord.value);

    const json = {
        "answerThesis": antwoord.value,
        "thesis": {
            "id": 2
        }
    }

fetch(url, {
    method: 'POST',
    body: JSON.stringify(json),
    headers: {
        "Content-type": "application/json; charset=UTF-8"
    }
})

.then(response => response.json) 
.then(json => console.log(json))
.catch(err => console.log(err));
}

