const voornaam = document.getElementById("voornaam");
const achternaam = document.getElementById("achternaam");
const geboortedatum = document.getElementById("geboortedatum");
const email = document.getElementById("email");
const woonplaats = document.getElementById("woonplaats");
const voerInHeader = document.getElementById("voerIn");
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
    const xhr = new XMLHttpRequest();

    const json = {
        "firstName": voornaam.value,
        "lastName": achternaam.value,
        "dob": geboortedatum.value,
        "email": email.value,
        "residence": woonplaats.value
    };

    let res = await fetch('url.json');
    let data = await res.json();
    xhr.open('POST', data.link + 'voter/add');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify(json));

    xhr.onreadystatechange = function () {

        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                successMessage.style.display = 'block';
                voerInHeader.style.display = 'none';
                voornaam.readOnly = true;
                achternaam.readOnly = true;
                geboortedatum.readOnly = true;
                woonplaats.readOnly = true;
                email.readOnly = true;
                alert('Uw gegevens zijn ingevoerd.')
            }
        }
    }
}