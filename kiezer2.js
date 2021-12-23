const voornaam = document.getElementById("voornaam");
const achternaam = document.getElementById("achternaam");
const geboortedatum = document.getElementById("geboortedatum");
const email = document.getElementById("email");
const woonplaats = document.getElementById("woonplaats");
const successMessage = document.getElementById("success");
const errorMessage = document.getElementById("error");


async function handleForm() {
    if (voornaam.value.length <= 2 || achternaam.value.length <= 2 ||
        geboortedatum == null ||
        email.value.length < 5) {
        errorMessage.style.display = "block";
        return;
    }
    errorMessage.style.display = "none";


    await voegKiezersGegevensToe();
}

async function voegKiezersGegevensToe() {
    
    const json = {
        "firstName": voornaam.value,
        "lastName": achternaam.value,
        "dob": geboortedatum.value,
        "email": email.value,
        "residence": woonplaats.value
    };

    let res = await fetch('url.json');
    let data = await res.json();
    
    fetch(data.link + "voter/add", {
        method: 'POST',
        body: JSON.stringify(json),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    })

    .then(response => response.json())
    .then(data => {
                console.log(data.id);
                localStorage.setItem("voterid", data.id);
                console.log(localStorage.getItem("voterid"))
            }
        )
    .catch(err => console.log('Request Failed', err));
    
    window.location = "toonpartijenkiezer.html";
}