laadAnwoordenEnVragen();

async function laadAnwoordenEnVragen(){
    
    let res = await fetch('url.json');
    let data = await res.json();
    let url = data.link + "voter/showAnswers/93"; //+ localStorage.getItem("voterid");

    fetch(url, {
        method: 'GET',
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    } )

    .then(response => response.json())
    .then(data => {
        let inhoudInnerhtmlVragen = "";
        
        let vragenOverzicht = document.getElementById("vragenOverzicht");
                   
        inhoudInnerhtmlVragen +=
        `<tr>
            <th>Nummer</th>
            <th>Vraag</th>
            <th>Antwoord</th>
        </tr>        
        `;

        
        for (let i = 0; i < data.length; i++){
            inhoudInnerhtmlVragen +=
            `
            <tr>
                <td>${i}</td>
                <td>${data[i].thesis.question}</td>
                <td>${data[i].answerThesis}</td>
            </tr>
            `;
           
        }
        vragenOverzicht.innerHTML = inhoudInnerhtmlVragen;
        
    })
    .catch(err => console.log('Request Failed', err));

}