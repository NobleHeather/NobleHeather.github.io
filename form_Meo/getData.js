//* Afficher les données

const GetData = async function() {
    return await fetch('http://localhost:3000/api/question')
    .then(response => response.json())
    .then(json => {
        console.log(json);
        DisplayQuestion(json);
    })
    .catch((e) => console.log(e))
}
GetData();

function DisplayQuestion(data) {
    // console.log(data);
    // console.log(data.data);
    let datatab = []
    for (let i = 0; i < data.length; i++) {
        datatab.push(JSON.parse(data[i].data[0]));
    }
    console.log(datatab);
}