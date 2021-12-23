const kandidatenTabel = document.getElementById("kandidatenTabel");
let myStorage = window.localStorage;
const partijSpan = document.getElementById("partij");
var partijData;

renderKandidaten();
renderPartij();

async function getKandidaten() {
    let res = await fetch('url.json');
    let data = await res.json();
    let partijId = myStorage.getItem("laatstAangekliktePartijAdmin")
    let url = data.link + 'politicalGroup/membersByPartyID/' + partijId;
    try {
        let res = await fetch(url);
        partijData = await res.json();
        return partijData;
    } catch (error) {
        console.log(error);
    }
}

async function renderKandidaten() {
    let kandidaten = await getKandidaten()
    let inhoudInnerhtml = "";

    inhoudInnerhtml +=
        `<tr>
        <th>Naam</th>
        <th>Expertise</th>
        <th>Geboortedatum</th>
      </tr>
      `

    for (let i = 0; i < kandidaten.length; i++) {
        inhoudInnerhtml +=
            `<tr>
            <td>
                ${kandidaten[i].firstName} ${kandidaten[i].lastName}
            </td>
            <td>
                ${kandidaten[i].expertise}
            </td>     
            <td>
                ${kandidaten[i].dob}
            </td>    
        </tr>
        `
    }
    kandidatenTabel.innerHTML = inhoudInnerhtml
}

async function renderPartij() {
    let res = await fetch('url.json');
    let data = await res.json();
    let partijId = myStorage.getItem("laatstAangekliktePartijAdmin");
    let url = data.link + `politicalGroup/byID/${partijId}`;
    try {
        let res = await (fetch(url));
        let partij = await res.json();
        console.log(partij);
        partijSpan.innerText = partij.name;
    } catch (error) {
        console.log(error);
    }
}