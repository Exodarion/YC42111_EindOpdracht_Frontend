const partijInvoer = document.getElementById("partijInvoer");
const kandidaatInvoer = document.getElementById("kandidaatInvoer");
var partijData;

//Set default to none AKA hidden for both Add candidate and party windows
kandidaatInvoer.style.display = 'none';
partijInvoer.style.display = 'none';

//Show Add Party Window
function showPartijInvoer() {
    kandidaatInvoer.style.display = 'none';
    partijInvoer.style.display = 'block';
}

//Show Add Candidate Window
function showKandidaatInvoer() {
    partijInvoer.style.display = 'none';
    kandidaatInvoer.style.display = 'block';
}

//Dynamically set selection names to the party names provided
function setPoliticalGroupNames()
{
    //get reference to the selection element
    let partijSelectie = document.getElementById("partijSelectie");
    for(i = 0; i < partijData.length; i++)
    {
        //manually add new html element inside the select section
        partijSelectie.insertAdjacentHTML
        ('beforeend', 
        '<option value="' + i + '" >' + partijData[i].name + '</option>');
    }
}

function addCandidate() 
{
    //cache reference data here first
    let refData = {
        "firstnameData": document.getElementById("kandidaatFirstName"),
        "lastnameData": document.getElementById("kandidaatLastName"),
        "DOBData": document.getElementById("kandidaatDOB"),
        "pgData": document.getElementById("partijSelectie"),
        "expertiseData": document.getElementById("kandidaatExpertise")
    }

    //Requirements for the data to be considered valid
    if(refData.firstnameData.value.length < 1
    || refData.lastnameData.value.length < 1
    || refData.DOBData.value == null
    || refData.expertiseData.value.length < 1)
    { console.log("Return here plx"); return; }

    console.log("Execute addCandidate");
    //Create the Json object to be sent to the backend
    const json = {
        "firstName": refData.firstnameData.value,
        "lastName": refData.lastnameData.value,
        "dob": refData.DOBData.value,
        "expertise": refData.expertiseData.value,
        "partyID": parseInt(refData.pgData.value) + 1
    };

    sendPostRequest(json, 'candidate/add', refData);
}

function addPoliticalGroup() {
    let refData = 
    {
        "partijNaam" : document.getElementById("partijnaam"),
        "orientatie" : document.getElementById("orientatie")
    }

    if (refData.partijNaam.value.length < 2 || refData.orientatie == null)
        return;

    const json = 
    {
        "name":refData.partijNaam.value,
        "pga": refData.orientatie.value
    };

    sendPostRequest(json, 'politicalGroup/add', refData)
}

//Send a post request to the backend given set data
async function sendPostRequest(JsonData, endpointURL, refData){
    //get local or network database URL first
    const xhr = new XMLHttpRequest();
    let res = await fetch('url.json');
    let data = await res.json();

    xhr.open('POST', data.link + endpointURL);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify(JsonData));

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                successMessage.style.display = 'block';
                //empty the content of all ref elements after execution
                for(let element in refData)
                    refData[element].value = '';
            }
        }
    }
} 

async function getPoliticalGroups(){
    let res = await fetch('url.json');
    let data = await res.json();
    let url = data.link + "politicalGroup/list";
    let request = new XMLHttpRequest();

    request.onreadystatechange = function(){
        if(this.readyState == 4 ){
            partijData = JSON.parse(this.responseText);
            setPoliticalGroupNames();
        }
    }
    request.open("GET", url);
    request.send();
}

getPoliticalGroups();