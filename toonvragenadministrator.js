const request = new XMLHttpRequest();
let url;
function haalAlleVragenOp(){
    url = "http://localhost:8082/thesis/list";
    
    request.onreadystatechange = function(){
        if(this.readyState == 4 ){
            toonAlleVragen(JSON.parse(this.responseText));
            console.log(this.responseText);
        }
    }
    request.open("GET", url);
    request.send();
}

function toonAlleVragen(vragen){
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

    for (let i = 0; i < vragen.length; i++){
        inhoudInnerhtml +=
        `<tr>
            <td>
                ${i}
            </td>
            <td>
                ${vragen[i].question}
            </td>
            <td>
                <button class= "btn btn-primary" onclick="verwijderVraag()">
                Verwijder vraag
            </button>
        </tr>   
        `
    }
    vragenOverzicht.innerHTML = inhoudInnerhtml;

}

haalAlleVragenOp();

function voerVraagIn(){
    location.href = "invoervraag.html"
}

function verwijderVraag(){
    url =  "http://localhost:8082/thesis/remove/{id}"
}