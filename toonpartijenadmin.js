function haalAllePartijenOp(){
    let url = "http://localhost:8082/politicalGroup/list";
    let request = new XMLHttpRequest();

    request.onreadystatechange = function(){
        if(this.readyState == 4 ){
            toonAllePartijen(JSON.parse(this.responseText));
            console.log(this.responseText);
        }
    }
    request.open("GET", url);
    request.send();
}

function toonAllePartijen(partijen){
    let partijenTabel = document.getElementById("partijenTabel");
    console.log(partijenTabel);
   
    let inhoudInnerhtml= "";

    inhoudInnerhtml +=
    `<tr>
        <th>Partij</th>
        <th>Orientatie</th>
        <th></th>
      </tr>
      `
    console.log(partijenTabel.innerHTML);

    for (let i = 0; i < partijen.length; i++){
        inhoudInnerhtml +=
        `<tr>
            <td>
                ${partijen[i].name}
            </td>
            <td>
                ${partijen[i].pga}
            </td>
            <td>
                <button class="btn btn-primary" onclick="toonKandidaten(${partijen[i].id})">
                    Toon kandidaten
                </button>
            </td>
        
        </tr>
        `
    }
    partijenTabel.innerHTML = inhoudInnerhtml;
}

function toonKandidaten(id) {
    let myStorage = window.localStorage;
    myStorage.setItem("laatstAangekliktePartij", id);
    location.href = "toonkandidatenadmin.html";
}

function voerPartijIn() {
    // dit wordt uitgevoerd in story 7
}

haalAllePartijenOp();


