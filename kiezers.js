let kiezersTabel = document.getElementById("kiezersTabel");
let knop = document.getElementById("knop");
knop.addEventListener("click", toonAlleKiezers);

function toonAlleKiezers() {
    console.log(kiezersTabel);

    let deData = proefData();
    console.log(deData);

    for (let i = 0; i < deData.length; i++) {
        kiezersTabel.innerHTML +=
            `<tr>
        <td>
            ${deData[i].naam}
        </td>
        <td>
            ${deData[i].leeftijd}
        </td>
        <td>
            ${deData[i].city}
        </td>
    </tr>`
    }
}

function haalAlleVotersOp() {
    let url = "http://localhost:8082/voter/list";
    var oReq = new XMLHttpRequest();
    oReq.onreadystatechange = function () {
        if(this.readyState == 4) {
            console.log(this.responseText);
        }
    }
    oReq.open("GET", url);
    oReq.send();
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



