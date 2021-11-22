let voornaam = document.getElementById("voornaam");
let achternaam = document.getElementById("achternaam");
let geboortedatum = document.getElementById("geboortedatum");
let email = document.getElementById("email");
let woonplaats = document.getElementById("woonplaats");
let voerInHeader = document.getElementById("voerIn");
let successMessage = document.getElementById("success");
let errorMessage = document.getElementById("error");

function handleForm() {
    if (voornaam.value.length < 2 || achternaam.value.length < 2 ||
        geboortedatum == null ||
        email.value.length < 5) {
        successMessage.style.display = 'none';
        errorMessage.style.display = "block";
        return;
    }
    errorMessage.style.display = "none";


    voegKiezersGegevensToe();
}

function voegKiezersGegevensToe() {
    const xhr = new XMLHttpRequest();

    const json = {
        "firstName": voornaam.value,
        "lastName": achternaam.value,
        "dob": geboortedatum.value,
        "email": email.value,
        "residence": woonplaats.value
    };

    xhr.open('POST', 'http://localhost:8082/voter/add');
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