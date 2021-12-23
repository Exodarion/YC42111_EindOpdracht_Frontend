//Holds all the windows that can be displayed in the administrator menu
var windows = 
{ 
    "1PartyAdd" : document.getElementById("partijInvoer"),
    "2CandidateAdd" : document.getElementById("kandidaatInvoer"),
    "3Partyremove" : document.getElementById("partijverwijderInvoer"),
    "4Candidateremove" : document.getElementById("kandidaatverwijderInvoer")
}
var partijData;
var candidateData;

//Hide all windows by default
hideWindows();
refreshGetData();

///////////////////////////////////////////////////////////////////////////////////////
// UTILITY METHODS
///////////////////////////////////////////////////////////////////////////////////////

//Hide All Windows
function hideWindows () 
{
    for(let element in windows)
        windows[element].style.display = 'none';
}

//Show window specified by the 'indicator'
function showWindow (indicator) 
{
    for(let element in windows)
    {
        let object = windows[element];
        if(element.startsWith(indicator))
            object.style.display = 'block';
        else
            object.style.display = 'none';
    }
}

function refreshGetData () {
    getallCandidates();
    getPoliticalGroups();
}

//Dynamically set selection names to the party names provided
function setPoliticalGroupNames(object)
{
    //get reference to the selection element
    let selectie = document.getElementById(object);
    selectie.innerHTML = ""; //On Refresh, needs to be reset to empty
    for(i = 0; i < partijData.length; i++)
    {
        //manually add new html element inside the select section
        selectie.insertAdjacentHTML
        ('beforeend', 
        '<option value="' + i + '" >' + partijData[i].name + '</option>');
    }
}

//Dynamically set selection names to the party names provided
function setCandidateNames(object)
{
    //get reference to the selection element
    let selectie = document.getElementById(object);
    selectie.innerHTML = ""; //On Refresh, needs to be reset to empty
    for(i = 0; i < candidateData.length; i++)
    {
        //manually add new html element inside the select section
        selectie.insertAdjacentHTML
        ('beforeend', 
        '<option value="' + i + '" >' + candidateData[i].firstName + " " + 
        candidateData[i].lastName + " : " +
        candidateData[i].politicalGroupName +
        '</option>');
    }
}

///////////////////////////////////////////////////////////////////////////////////////
// DELETE REQUESTS
///////////////////////////////////////////////////////////////////////////////////////

//Send a post request to the backend given set data
async function sendDeleteRequest(object, DataUrl, dataObject){
    //get local or network database URL first
    let res = await fetch('url.json');
    let data = await res.json();

    let selectie = document.getElementById(object);
    let url = data.link + DataUrl + dataObject[selectie.value].id;

    await fetch(url, {method : 'Delete'});
    refreshGetData(); //Refresh data after update
} 

//Manually delete a candidate from a political group without refreshing
async function deleteCandidateFromParty(arrayID)
{
    //get local or network database URL first
    let res = await fetch('url.json');
    let data = await res.json();
    let url = data.link + "candidate/remove/" + candidateData[arrayID].id;

    await fetch(url, {method : 'Delete'});
}

function removeCandidate() 
{
    sendDeleteRequest("kandidaatSelectie", "candidate/remove/", candidateData);
}

function removePG() 
{
    //First remove all candidates from this group before removing the group
    //If not done, the candidates that are associated with this group will have a broken link
    let selectie = document.getElementById("partijSelectie2");
    let partyID = partijData[selectie.value].id;
    for(let i = 0; i < candidateData.length; i++)
    {
        let candidatePartyID = candidateData[i].partyID;
        console.log("candidatePartyID " + candidatePartyID);
        console.log("partyID " + partyID);
        if(candidatePartyID == partyID)
            deleteCandidateFromParty(i);
    }

    sendDeleteRequest("partijSelectie2", "politicalGroup/remove/", partijData);
}

///////////////////////////////////////////////////////////////////////////////////////
// POST REQUESTS
///////////////////////////////////////////////////////////////////////////////////////

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
                
                refreshGetData(); //Refresh data after update
            }
        }
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
    || refData.DOBData.value == ""
    || refData.pgData.value == ""
    || refData.expertiseData.value.length < 1)
    { console.log("Return here plx"); return; }

    console.log("Execute addCandidate");
    //Create the Json object to be sent to the backend
    const json = {
        "firstName": refData.firstnameData.value,
        "lastName": refData.lastnameData.value,
        "dob": refData.DOBData.value,
        "expertise": refData.expertiseData.value,
        "partyID": partijData[parseInt(refData.pgData.value)].id // Get the party ID, using the index from the pgData value provided
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
        "pga": refData.orientatie.value,
    };

    sendPostRequest(json, 'politicalGroup/add', refData)
}

///////////////////////////////////////////////////////////////////////////////////////
// GET REQUESTS
///////////////////////////////////////////////////////////////////////////////////////

async function getPoliticalGroups(){
    let res = await fetch('url.json');
    let data = await res.json();
    let url = data.link + "politicalGroup/list";
    let request = new XMLHttpRequest();

    request.onreadystatechange = function(){
        if(this.readyState == 4 ){
            partijData = JSON.parse(this.responseText);
            setPoliticalGroupNames("partijSelectie");
            setPoliticalGroupNames("partijSelectie2");
        }
    }
    request.open("GET", url);
    request.send();
}

async function getallCandidates(){
    let res = await fetch('url.json');
    let data = await res.json();
    let url = data.link + "candidate/list";

    res = await fetch(url);
    candidateData = await res.json();
    console.log(candidateData);

    setCandidateNames("kandidaatSelectie");
}