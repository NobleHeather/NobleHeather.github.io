//TENTATIVE DE FETCH
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

let contact = {
    firstName: "Jean",
    lastName: "Machin",
    address: "30 rue du bout du monde",
    city: "Truc",
    email: "machin@truc.fr"
}

let products = ["5be9c8541c9d440000665243", "5beaa8bf1c9d440000a57d94"];

let commande = {contact, products};

// POST
fetch('http://localhost:3000/api/teddies/order', {
    method: "POST",
    headers : {
        'Accept' : 'application/json',
        'Content-type': 'application/json'
    },
    // body: JSON.stringify(commande) //* => 500 : internal server error
    // body: JSON.stringify(contact, products) //* => 400 : bad request
    // body: JSON.stringify({contact: contact, products: products}) //* => 500 : internal server error
    // body: JSON.stringify({contact: contact, products: products}) //* OK 
    body: JSON.stringify(commande) //* OK 
})
.then(response => response.json())
.then(json => console.log(json));



//GET //*fonctionne
let requestGetAll = new XMLHttpRequest();
requestGetAll.onreadystatechange = function() {
    if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
    let response = JSON.parse(this.responseText);
    // console.log(response.current_condition.condition);
    console.log(response);
    }
};
requestGetAll.open("GET", "http://localhost:3000/api/teddies/");
requestGetAll.send();



//GET //*fonctionne aussi
// let requestGetID = new XMLHttpRequest();
// requestGetID.onreadystatechange = function() {
//     if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
//     let response = JSON.parse(this.responseText);
//     // console.log(response.current_condition.condition);
//     console.log(response);
//     }
// };
// requestGetID.open("GET", "http://localhost:3000/api/teddies/5beaa8bf1c9d440000a57d94");
// requestGetID.send();










//* BROUILLON

// function getPeople(ressource) {
//     fetch(ressource)
//     .then(response => {
//         return response.json();
//     })
//     .then(data => console.log(data))
//     .catch(err => console.log(err));
// }
// getPeople('contact.json');


//GET
// fetch("https://jsonplaceholder.typicode.com/users")
// .then(response => response.json())
// .then(json => {
//     // Create a variable to store HTML 
//     let li = `<tr><th>Name</th><th>Email</th></tr>`; 
        
//     // Loop through each data and add a table row 
//     json.forEach(user => { 
//         li += `<tr> 
//             <td>${user.name} </td> 
//             <td>${user.email}</td>          
//         </tr>`; 
//     }); 

//     // Display result 
//     document.getElementById("users").innerHTML = li;  
// });

// fetch(postUrl, {
//     method: 'POST',
//     headers : {
//         'Content-type': 'application/json',
//     },
//     body: JSON.stringify(data)
// })
// .then(response => response.json())
// .then(data => {
//     console.log('success:', data);
// })
// .catch(error) => {
//     console.error('Error : ', error);
// });


// fetch("https://www.une-url.com")
// .then(response => response.json())
// .then(response => alert(JSON.stringify(response)))
// .catch(error => alert("Erreur : " + error));

// //* http://localhost:3000/api/teddies

// let promise = fetch(url, {
//     method: "GET", //ou POST, PUT, DELETE, etc.
//     headers: {
//       "Content-Type": "text/plain;charset=UTF-8" //pour un corps de type chaine
//     },
//     body: undefined,
// });

// data = infos utilisateurs

// fetch(postUrl, {
//     method: 'POST',
//     headers : {
//         'Content-type': 'application/json',
//     },
//     body: JSON.stringify(data)
// })
// .then(response => response.json())
// .then(data => {
//     console.log('success:', data);
// })
// .catch(error) => {
//     console.error('Error : ', error);
// });