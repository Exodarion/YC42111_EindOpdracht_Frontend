async function voegVraagToe(){
    if(vraagInvoer.value.length >= 5){
        const vraagInvoer = document.getElementById("vraagInvoer");
        console.log(vraagInvoer.value);

        const xhreq = new XMLHttpRequest();

        const json = {
            "question": vraagInvoer.value
        };

        let res = await fetch('url.json');
        let data = await res.json();

        xhreq.open('POST', data.link + 'thesis/add');
        xhreq.setRequestHeader('Content-Type', 'application/json');
        xhreq.send(JSON.stringify(json));

        document.getElementById("vraagInvoer").value = "";

        location.href = "toonvragenadministrator.html";
    }
}

