////RECUPERER INFOS NOUNOURS SUR BASE DE DONNEES

//*On déclare réponse en dehors de la requête afin de pouvoir l'utiliser ensuite
let response;

//*On récupère les infos nounours sur la base de données
let requestGetAll = new XMLHttpRequest();
requestGetAll.onreadystatechange = function() {
    //?il remplace quoi ce this ?
    if (this.readyState == XMLHttpRequest.DONE && this.status == 200) { 
    response = JSON.parse(this.responseText);
    // console.log(response.current_condition.condition);
    console.log(response);
    }
};
requestGetAll.open("GET", "http://localhost:3000/api/teddies/");
requestGetAll.send();

//* un pack de variable utilisées dans setTimeout ci-dessous
//* puis dans panier_V2.js

let norbertColorTab;
let norbertID;
let norbertName;
let norbertPrice;
let norbertImg;
let norbertDescription;

let arnoldColorTab;
let arnoldID;
let arnoldName;
let arnoldPrice;
let arnoldImg;
let arnoldDescription;

let lennyCarlColorTab;
let lennyCarlID;
let lennyCarlName;
let lennyCarlPrice;
let lennyCarlImg;
let lennyCarlDescription;

let gustavColorTab;
let gustavID;
let gustavName;
let gustavPrice;
let gustavImg;
let gustavDescription;

let garfunkelColorTab;
let garfunkelID;
let garfunkelName;
let garfunkelPrice;
let garfunkelImg;
let garfunkelDescription;

function recupInfos() {
    console.log("j'arrive après");
    console.log(response);
    
    //*On sépare les infos en plusieurs variables
    let norbertObj = response[0];
    let norbertTab = [];
    let arnoldObj = response[1];
    let arnoldTab = [];
    let lennyCarlObj = response[2];
    let lennyCarlTab = [];
    let gustavObj = response[3];
    let gustavTab = [];
    let garfunkelObj = response[4];
    let garfunkelTab = [];

    // console.log(response[2]);
    // let responseText = JSON.stringify(response);
    // console.log(responseText);

    // Parcourir objet pour récupérer les infos //ça sert à rien ça si ?
    // for (let [key, value] of Object.entries(NorbertObj)) {
         // console.log(`${key}: ${value}`);

         // let justKey = `${key}`;
         // console.log(justKey);
        
    //     let justValue = `${value}`;
    //     console.log(justValue);

         // let NorbertTab = Object.entries(NorbertObj);
         // console.log(NorbertTab);
        
         // let num = parseInt(justKey) + 1;
    // }
    
    //? comment faire plus DRY toute cette partie ?
    //? voir pour des boucles

    //* On transforme l'objet en tableau, parce que moi je préfère les tableaux
    norbertTab = Object.entries(norbertObj);
    console.log(norbertTab);

    //* On récupère toutes les infos de Norbert
    norbertColorTab = norbertTab[0][1];
    norbertID = norbertTab[1][1];
    norbertName = norbertTab[2][1];
    norbertPrice = norbertTab[3][1];
    norbertImg = norbertTab[4][1];
    norbertDescription = norbertTab[5][1];
    console.log(norbertColorTab);
    console.log(norbertID);
    console.log(norbertName);
    console.log(norbertPrice);
    console.log(norbertImg);
    console.log(norbertDescription);

    //* Idem pour les autres nounours
    arnoldTab = Object.entries(arnoldObj);
    console.log(arnoldTab);

    arnoldColorTab = arnoldTab[0][1];
    arnoldID = arnoldTab[1][1];
    arnoldName = arnoldTab[2][1];
    arnoldPrice = arnoldTab[3][1];
    arnoldImg = arnoldTab[4][1];
    arnoldDescription = arnoldTab[5][1];
    console.log(arnoldColorTab);
    console.log(arnoldID);
    console.log(arnoldName);
    console.log(arnoldPrice);
    console.log(arnoldImg);
    console.log(arnoldDescription);


    lennyCarlTab = Object.entries(lennyCarlObj);
    console.log(lennyCarlTab);

    lennyCarlColorTab = lennyCarlTab[0][1];
    lennyCarlID = lennyCarlTab[1][1];
    lennyCarlName = lennyCarlTab[2][1];
    lennyCarlPrice = lennyCarlTab[3][1];
    lennyCarlImg = lennyCarlTab[4][1];
    lennyCarlDescription = lennyCarlTab[5][1];
    console.log(lennyCarlColorTab);
    console.log(lennyCarlID);
    console.log(lennyCarlName);
    console.log(lennyCarlPrice);
    console.log(lennyCarlImg);
    console.log(lennyCarlDescription);


    gustavTab = Object.entries(gustavObj);
    console.log(gustavTab);

    gustavColorTab = gustavTab[0][1];
    gustavID = gustavTab[1][1];
    gustavName = gustavTab[2][1];
    gustavPrice = gustavTab[3][1];
    gustavImg = gustavTab[4][1];
    gustavDescription = gustavTab[5][1];
    console.log(gustavColorTab);
    console.log(gustavID);
    console.log(gustavName);
    console.log(gustavPrice);
    console.log(gustavImg);
    console.log(gustavDescription);


    garfunkelTab = Object.entries(garfunkelObj);
    console.log(garfunkelTab);

    garfunkelColorTab = garfunkelTab[0][1];
    garfunkelID = garfunkelTab[1][1];
    garfunkelName = garfunkelTab[2][1];
    garfunkelPrice = garfunkelTab[3][1];
    garfunkelImg = garfunkelTab[4][1];
    garfunkelDescription = garfunkelTab[5][1];
    console.log(garfunkelColorTab);
    console.log(garfunkelID);
    console.log(garfunkelName);
    console.log(garfunkelPrice);
    console.log(garfunkelImg);
    console.log(garfunkelDescription);    
}

//*On utilise la fonction pour récupérer les infos avec un délais le temps que la requête se fasse
//! Il y a sûrement moyen de faire ça mieux qu'avec setTimeout
setTimeout(() => {
    if (requestGetAll.readyState == XMLHttpRequest.DONE && requestGetAll.status == 200) {
        console.log("requête ok");
        recupInfos();
    }
}, 1000);

// var obj = { toto: "truc", machin: 42 };
// console.log(Object.entries(obj)); // [ ['toto', 'truc'], ['machin', 42] ]




