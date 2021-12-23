var candidateData;

function showAllCandidates(){
    let partijenTabel = document.getElementById("kandidatenTabel");
    console.log(kandidatenTabel);
   
    let inhoudInnerhtml= "";

    inhoudInnerhtml +=
    `<tr>
        <th>Voornaam</th>
        <th>Achternaam</th>
        <th>Partij</th>
        <th>Geboortedatum</th>
        <th>Expertise</th>
      </tr>
      `
    console.log(partijenTabel.innerHTML);

    for (let i = 0; i < candidateData.length; i++){
        inhoudInnerhtml +=
        `<tr>
            <td>
                ${candidateData[i].firstName}
            </td>
            <td>
                ${candidateData[i].lastName}
            </td>
            <td>
                ${candidateData[i].politicalGroupName}
            </td>
            <td>
                ${candidateData[i].dob}
            </td>
            <td>
                ${candidateData[i].expertise}
            </td>
        </tr>
        `
    }
    kandidatenTabel.innerHTML = inhoudInnerhtml;
}

async function getallCandidates(){
    let res = await fetch('url.json');
    let data = await res.json();
    let url = data.link + "candidate/list";

    res = await fetch(url);
    candidateData = await res.json();
    console.log(candidateData);

    showAllCandidates();
}

getallCandidates();


