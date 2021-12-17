window.onload = ()=>{
    var url_string = window.location.href; //window.location.href
    var url = new URL(url_string);
    var vraagid = url.searchParams.get("vraagid");
    var url = "http://localhost:8082/thesis/showByOne/"+vraagid;
    console.log(url);
    fetch(url,  {
        method: 'GET',
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    })
    .then (response => response.json())
    .then (vraag => {
        document.getElementById("vraag").innerHTML = vraag.question;
        document.getElementById("vraagId").value = vraag.id;
        document.getElementById("volgendevraag").onclick = volgendeVraag;

        
    
    }
    
    )
    .catch(err => console.log('Request Failed', err));
}

function volgendeVraag(vraagid){
    var url_string = window.location.href; //window.location.href
    var url = new URL(url_string);
    var vraagid = url.searchParams.get("vraagid");
    if(vraagid == -1){
        vraagid = 0;
    }
    window.location = "test.html?vraagid="+ (++vraagid);
}