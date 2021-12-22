laadVragen();

let vraagId;
let antwoord;
let vorigId = -1;


async function laadVragen() {
    var url_string = window.location.href ; //window.location.href
    var url = new URL(url_string);
    var vraagid = url.searchParams.get("vraagid");
    let res = await fetch('url.json');
    let data = await res.json();
    var url = data.link + "thesis/showByOne/" + vraagid;
    console.log(vorigId);
    fetch(url, {
        method: 'GET',
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    })
        .then(response => response.json())
        .then(vraag => {
                document.getElementById("vraag").innerHTML = vraag.question;
                console.log(localStorage.getItem("voterid"));
                vraagId = vraag.id;
                document.getElementById("volgendevraag").onclick = volgendeVraag;              
            }
        )
        .catch(err => console.log('Request Failed', err));
}

function volgendeVraag() {
    
    
    antwoordInvoer();

    let url_string = window.location.href; //window.location.href
    let url = new URL(url_string);
    let vraagid = url.searchParams.get("vraagid");
    if (vraagId == vorigId){
        window.location = "toonAntwoordenKiezer.html";
    } else {
        window.location = "vraagBeantwoorden.html?vraagid=" + (++vraagid);
    }
    
}

async function antwoordInvoer(){
    
        let res = await fetch('url.json');
        let data = await res.json();
        let url = data.link + "answer/add/" + localStorage.getItem("voterid");
        console.log(localStorage.getItem("voterid"));
        console.log(antwoord.value);

        const json = {
            "answerThesis": antwoord,
            "thesis": {
                "id": vraagId
            }
        }

        vorigId = vraagId;
    
    
    fetch(url, {
        method: 'POST',
        body: JSON.stringify(json),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    })
    
    .then(response => response.json) 
    .then(json => {
        console.log(json);
    })
    .catch(err => console.log(err));

        
}


function unCheckOther(id){
    for (let i = 0; i < 6; i++) {
        document.getElementById(i).checked = false;        
    }
    document.getElementById(id).checked = true;
    antwoord = document.getElementById(id).value;
}


