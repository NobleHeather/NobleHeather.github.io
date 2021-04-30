//* Afficher les données

const GetData = async function() {
    return await fetch(`${thisUrl}/api/form`)
    // return await fetch('http://localhost:3000/api/question')
    // return await fetch('https://aphantasique-form.herokuapp.com/api/question')
    .then(response => response.json())
    .then(json => {
        console.log('Données en vrac (Form 0): ', json);
        // DisplayQuestion(json);
    })
    .catch((e) => console.log(e))
}
GetData();

// function DisplayQuestion(data) {
//     // console.log(data);
//     // console.log(data.data);
//     let datatab = []
//     for (let i = 0; i < data.length; i++) {
//         datatab.push(JSON.parse(data[i].data[0]));
//     }
//     console.log('Données organisées (Q1 - data): ', datatab);
//     console.log('Données organisées (Q1) -> section : ', data[0].section,
//     ', question numéro : ', data[0].num, ', question obligatoire ?', data[0].cat, 
//     'datas : ', datatab);
// }