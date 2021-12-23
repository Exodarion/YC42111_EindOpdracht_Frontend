

async function haalAllePartijenOp() {
    let res = await fetch('url.json');
    let data = await res.json();
    let url = data.link + "politicalGroup/list";
    let request = new XMLHttpRequest();

    request.onreadystatechange = function () {
        if (this.readyState == 4) {
            toonAllePartijen(JSON.parse(this.responseText));
            console.log(this.responseText);
        }
    }
    request.open("GET", url);
    request.send();
}

function gaNaarTest() {
    window.location = "vraagBeantwoorden.html?vraagid=0";

}

function toonAllePartijen(partijen) {
    let partijenTabel = document.getElementById("partijenTabel");
    console.log(partijenTabel);

    let inhoudInnerhtml = "";

    inhoudInnerhtml +=
        `<tr>
        <th>Partij</th>
        <th>Orientatie</th>
        <th></th>
      </tr>
      `
    console.log(partijenTabel.innerHTML);

    for (let i = 0; i < partijen.length; i++) {
        inhoudInnerhtml +=
            `<tr>
            <td>
                ${partijen[i].name}
            </td>
            <td>
                ${partijen[i].pga}
            </td>
            <td>
                <button class="btn btn-dark" onclick="toonKandidaten(${partijen[i].id})">
                    Toon kandidaten
                </button>
            </td>
        
        </tr>
        `
    }
    partijenTabel.innerHTML = inhoudInnerhtml;

    console.log(localStorage.getItem("voterid"));

}

function toonKandidaten(id) {
    let myStorage = window.localStorage;
    myStorage.setItem("laatstAangekliktePartijKiezer", id);
    location.href = "toonkandidatenkiezer.html";
}

haalAllePartijenOp();


