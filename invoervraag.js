const vraagInvoer = document.getElementById("vraagInvoer");

function voegVraagToe(){
    if(vraagInvoer.value.length >= 5){
        console.log(vraagInvoer.value);

        const xhreq = new XMLHttpRequest();

        const json = {
            "question": vraagInvoer.value
        };

        xhreq.open('POST', 'http://localhost:8082/thesis/add');
        xhreq.setRequestHeader('Content-Type', 'application/json');
        xhreq.send(JSON.stringify(json));

        document.getElementById("vraagInvoer").value = "";

        location.href = "toonvragenadministrator.html";

        // xhreq.onreadystatechange = function () {
        //     if (xhreq.readyState === 4) {
        //         if (xhreq.status === 200) {
        //             successMessage.style.display = 'block';
        //             vraagInvoer.value = '';
                    
        //         }
        //     }
        // }

    }

}



