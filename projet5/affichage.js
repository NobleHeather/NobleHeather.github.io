// localStorage.clear();

//* AFFICHAGE PAGE D'ACCUEIL

let imgs = document.querySelectorAll('img');

async function afficheNounours() {
    //* On attend le retour de fetch
    await GetNounours();

    console.log(data);
    //* On remplit avec les img renvoyées par l'API
    console.log(data[0].imageUrl);
    for (let i = 0; i < imgs.length; i++) {
        imgs[i].src = data[i].imageUrl
    }
}
afficheNounours();

//// Si l'utilisateur a déjà une commande en cours

//* On récupère la commande dans local storage
let choixNounoursTab = JSON.parse(localStorage.getItem("choixNounoursTab"));
console.log(choixNounoursTab);

if (choixNounoursTab != null) {
    
    //* calcul de la quantité totale
    let quantiteTotale = 0;
    for (let i = 0; i < choixNounoursTab.length; i++) {
        quantiteTotale += parseInt(choixNounoursTab[i][1]);
        console.log(quantiteTotale);
    }
    
    //* BOOTSTRAP_BADGE : On remet le badge sur le panier
    let badge = document.querySelector('.badge');
    if (quantiteTotale == 0) {
        badge.innerHTML = ``;
    } else {
        badge.innerHTML = `${quantiteTotale}`;
    }

}

