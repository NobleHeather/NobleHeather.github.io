//* Afficher les données
// localStorage.clear();
// const GetData = async function() {
//     // return await fetch('http://localhost:3000/api/question')
//     return await fetch(`${thisUrl}/api/form`)
//     // return await fetch('https://aphantasique-form.herokuapp.com/api/question')
//     .then(response => response.json())
//     .then(json => {
//         console.log('Données en vrac (Form 0): ', json);
//         DisplayQuestion(json);
//     })
//     .catch((e) => console.log(e))
// }



const GetData = async function() {
    // return await fetch('http://localhost:3000/api/question')
    return await fetch(`${thisUrl}/api/form`, {
        // return await fetch('https://aphantasique-form.herokuapp.com/api/question', {
        method: "GET", 
        headers: {
          "Content-Type": "application/json", 
          'Accept': "application/json"
        },
        body: undefined,
    })
    .then(response => response.json())
    .then(json => {
        console.log('Données en vrac (Form 0): ', json);
        DisplayQuestion(json);
    })
    .catch((e) => console.log(e))
}
GetData();

//* Classer par question
let dataGraph = [[], [], [], [], [], [], []];
async function DisplayQuestion(data) {
    
    // let dataGraph = [[], [], [], [], [], [], []];
    // let dataGraph = [['Q1'], ['Q2'], ['Q3'], ['Q4'], ['Q5'], ['Q6'], ['Q7']];
    
//* On parcourt l'ensemble des form
    for (let x = 0; x < data.length; x++) {
        // console.log('x', x)

        //*On trie par numéro de question,
        //* au cas où les questions n'aient pas été traitées dans l'ordre
        data[x].Num_Data.sort(function(a, b){
            a = a[0];
            b = b[0];
            // console.log(a, b)
            return a-b
        });
        console.log(data[x].Num_Data);

        //* Pour chaque Q on push la data qui correspond
        for (let i = 0; i < data[x].Num_Data.length; i++) {
            // console.log('i', i)
            if (data[x].Num_Data[i][0] == i) {
                // console.log('push x i', x, i);
                dataGraph[i].push(data[x].Num_Data[i][1])
            }
        }
    }
    
    console.log(dataGraph);
    console.log(dataGraph[0]);

    return dataGraph; // pas utilisé
}

//? Temporaire : effacer form de DB
// const deleteForm = async function() {
//     fetch(`${thisUrl}/api/form/[ID FORM ICI]`, {
//         method: "DELETE"
//     })
//     .then(response => response.json())
//     .then(json => console.log(json));
// }
// deleteForm()

