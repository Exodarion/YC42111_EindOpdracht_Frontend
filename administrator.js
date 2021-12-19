const partijInvoer = document.getElementById("partijInvoer");
const kandidaatInvoer = document.getElementById("kandidaatInvoer");
const partijNaam = document.getElementById("partijnaam");
const orientatie = document.getElementById("orientatie");

function showPartijInvoer() {
    kandidaatInvoer.style.display = 'none';
    partijInvoer.style.display = 'block';
}

function showKandidaatInvoer() {
    partijInvoer.style.display = 'none';
    kandidaatInvoer.style.display = 'block';
}

async function handlePartijForm() {

    console.log(orientatie.value);
    if (partijNaam.value.length >= 2) {
        const xhr = new XMLHttpRequest();

        const json = {
            "name": partijNaam.value,
            "pga": orientatie.value
        };

        let res = await fetch('url.json');
        let data = await res.json();

        xhr.open('POST', data.link + 'politicalGroup/add');
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(JSON.stringify(json));

        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    successMessage.style.display = 'block';
                    partijNaam.value = '';
                    orientatie.value = '';
                }
            }
        }
    }
}