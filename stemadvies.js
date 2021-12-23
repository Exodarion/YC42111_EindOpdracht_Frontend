const percentages = document.getElementById('votingAdvice')

getAdvice()

async function getAdvice() {
    let res = await fetch('url.json');
    let data = await res.json();
    let url = data.link + "advice/" + localStorage.getItem("voterid");
    console.log(url);
    var jsonArray = await fetch(url);
    var jsonParsedArray = await jsonArray.json();
    console.log(jsonParsedArray)

    let inhoudInnerhtml= "";

    inhoudInnerhtml +=
        `<tr>
        <th>Partij</th>
        <th>Percentage</th>
      </tr>
      `

    for (key in jsonParsedArray) {
        let value = jsonParsedArray[key];
        if (jsonParsedArray.hasOwnProperty(key)) {
            inhoudInnerhtml +=
                `<tr>
            <td>
                ${key}
            </td>
            <td>
                ${value}%
            </td>
        </tr>
        `
        }
    }
    percentages.innerHTML = inhoudInnerhtml;
}

