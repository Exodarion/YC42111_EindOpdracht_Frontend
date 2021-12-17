function voegVraagToe(){
let invoer = document.getElementById("vraagInvoer");
let data;

if( invoer.value.length >= 5){
    console.log(invoer.value);

    data = {
        "question": invoer.value
    };
} else {
    alert("Voer geldige vraag in")
}


fetch("http://localhost:8082/thesis/add", {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
        "Content-type": "application/json; charset=UTF-8"
    }
})

.then(response => response.json) 
.then(json => console.log(json))
.catch(err => console.log(err));
}