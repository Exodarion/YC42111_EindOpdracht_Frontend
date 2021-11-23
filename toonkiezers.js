let kiezersTabel = document.getElementById("kiezersTabel");

function toonAlleKiezers(kiezers) {
    for (let i = 0; i < kiezers.length; i++) {
        kiezersTabel.innerHTML +=
            `<tr>
        <td>
            ${kiezers[i].firstName}
        </td>
        <td>
            ${kiezers[i].lastName}
        </td>
        <td>
            ${kiezers[i].email}
        </td>
        <td>
            ${kiezers[i].dob}
        </td>
        <td>
            ${kiezers[i].residence}
        </td>
    </tr>`
    }
}

function haalAlleVotersOp() {
    let url = "http://localhost:8082/voter/list";
    let request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        if(this.readyState == 4) {
            toonAlleKiezers(JSON.parse(this.responseText));
            console.log(this.responseText);
        }
    }
    request.open("GET", url);
    request.send();
}

function proefData() {

    let persoon1 = {}
    persoon1.naam = "Fred";
    persoon1.leeftijd = 33;
    persoon1.city = "Amsterdam";

    let persoon2 = {}
    persoon2.naam = "Fred";
    persoon2.leeftijd = 33;
    persoon2.city = "Amsterdam";

    let persoon3 = {}
    persoon3.naam = "Fred";
    persoon3.leeftijd = 33;
    persoon3.city = "Amsterdam";

    let personen = [
        persoon1, persoon2, persoon3
    ]

    return personen;
}



