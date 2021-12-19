toonVragen();

async function toonVragen() {
    let res = await fetch('url.json');
    let data = await res.json();
    let url = data.link;

    fetch(url + "thesis/list")
        // Handle success
        .then(response => response.json())  // zet om naar json object
        .then(d => { // d = array met thesises, het object dat ik uit de response.json krijg  Daarom heet dit chaning
            let vragenOverzicht = document.getElementById("vragenTabel");
            console.log(vragenTabel);

            let inhoudInnerhtml = "";
            inhoudInnerhtml +=
                `<tr>
            <th>Nummer</th>
            <th>Vraag</th>
            <th></th>
        </tr> 
        `

            console.log(vragenOverzicht.innerHTML);

            for (let i = 0; i < d.length; i++) {
                inhoudInnerhtml +=
                    `<tr>
                <td>
                    ${i}
                </td>
                 <td>
                 ${d[i].question}
                </td>
                <td>
                    <button class= "btn btn-primary" onclick="verwijderVraag(${d[i].id})">
                    Verwijder vraag
                    </button>
                </td>
            </tr>   
            `
            }

            vragenOverzicht.innerHTML = inhoudInnerhtml;
        })
        .catch(err => console.log('Request Failed', err)); // Catch errors
}

async function verwijderVraag(idVraag) {
    let res = await fetch('url.json');
    let data = await res.json();
    let url = data.link;

    fetch(url + "thesis/remove/" + idVraag, {
        method: 'DELETE',
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    })

        .then(response => response.json)
        .then(json => console.log(json))
        .catch(err => console.log('Request Failed', err));

    location.reload();
}

function goToAdd() {
    location.href = "invoervraag.html"
}
