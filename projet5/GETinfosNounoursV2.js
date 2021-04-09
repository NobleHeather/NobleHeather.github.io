////RECUPERER INFOS NOUNOURS SUR BASE DE DONNEES

//*On déclare réponse en dehors de la requête afin de pouvoir l'utiliser ensuite
let data;

//*On récupère les infos nounours sur la base de données
const GetNounours = async function() {
    try {
        // let response = await fetch('http://localhost:3000/api/teddies')
        let response = await fetch('https://projet-oc-5.herokuapp.com/api/teddies')
        if (response.ok) {
            /*let*/ data = await response.json()
            console.log(data)
        } else {
            console.error('response : ', response.status)
        }
    } catch (e) {
        console.log(e.stack)
    }
}
GetNounours();

//* cette fonction s'exécute après nounours
async function DoSomething() {
    console.log(data) //undefined
    await GetNounours();
    console.log(data) //contient infos nounours

    console.log(data[0]) //Norbert
    console.log(data[1]) //Arnold
    console.log(data[2]) //LennyCarl
    console.log(data[3]) //Gustav
    console.log(data[4]) //Garfunkel
    // détails de Norbert
    console.log(data[0].colors)
    console.log(data[0].description)
    console.log(data[0].imageUrl)
    console.log(data[0].name)
    console.log(data[0].price)
    console.log(data[0]._id)
    // Détails de couleurs Norbert
    console.log(data[0].colors[0])
    console.log(data[0].colors[1])
    console.log(data[0].colors[2])
    console.log(data[0].colors[3])

}
DoSomething()






// setTimeout(() => {
    
//     // console.log(infosNounours[0].name);
//     console.log(data);

// }, 1000);



// let infosNounours;
// const GetAllNounours = async () => {
//     infosNounours = await fetch('http://localhost:3000/api/teddies')
//         .then(response => response.text())
//         .then(body => JSON.parse(body));
//     console.log(infosNounours);
//     console.log(infosNounours[0]);
//     console.log(infosNounours[0].name);
    
//     return infosNounours;
// }
// console.log(GetAllNounours());



//! promise structure
// let get = function(url) {
//     return new Promise(function(resolve, reject) {
//         request XMLHttpRequest
//         if readyState ok {
//             resolve(request)
//         }
//         else {
//             reject(request)
//         }
//     })
// }
//! promise

//!try catch

// let a = {} //a est un objet

// try {
//     a.method() //on essaye une method qui n'existe pas
// } catch (e) { //e pour erreur
//     // ici on fait un truc en cas d'erreur
//     console.log(e.stack) //affiche l'erreur .stack method pour avoir détails
// } finally {
//     // truc exécuté quoi qu'il arrive
// }
// // comme ça ça bloque pas la suite du code

// //créer un erreur
// let demo = function(nombre) {
//     if (nombre > 5) {
//         throw new Error('Trop grand')
//     }
//     return nombre + 5
// }

// try {
//     demo(6)
// } catch (e) {
//     console.log(e.stack)
// }

//!try catch FIN


//STRUCTURE POST ////ce truc ne fonctionne pas 
// const PostCommande = async function(data2) {
//     let response = await fetch('http://localhost:3000/api/teddies/order'), {
//         method: "POST",
//         headers : {
//         'Content-type': 'application/json'
//         },
//         body : JSON.stringify(data2)
//     })
//     if (response.ok) {
//         let data2 = await response.json()
//         console.log(data2)
//     } else {
//         console.error('response serveur', response.status)
//     }
// }


// PostCommande({
//     firstName: "string",
//     lastName: "string",
//     address: "string",
//     city: "string",
//     email: "string"
//     }
//     ["string", "string", "string"]
// )

/**
 * Expects request to contain:
 * contact: {
 *   firstName: string,
 *   lastName: string,
 *   address: string,
 *   city: string,
 *   email: string
 * }
 * products: [string] <-- array of product _id
 */
