//! Un fois mis en ligne, modif contenu href de fav (cf drapeau)

//// récupérer choix de notif de utilisateur dans un tableau
let checkboxes = $("input[type=checkbox][name=notification]")
let enabledSettings = [];

checkboxes.change(function() {
    enabledSettings = checkboxes
    .filter(":checked") // Filter out unchecked boxes.
    .map(function() { // Extract values using jQuery map.
        return this.value;
    })
    .get() // Get array.
    console.log(enabledSettings);
    return enabledSettings;
});

//// Quand utilisateur set range, affiche le temps choisi
//* En fonction de la taille de l'écran on met un <br /> ou pas entre "durée choisie" et la durée
let query = window.matchMedia("(max-width: 700px)");

function setBR(query) {
    if (query.matches) { // If media query matches
        $("#choix").replaceWith("<div id='choix'>Durée choisie : </div>");
    } else {
        $("#choix").replaceWith("<div id='choix'>Durée choisie :<br /></div>");
    }
}
query.addListener(setBR) // Attach listener function on state changes

function get_tickmarks() {
    setBR(query);
    // $("#choix").replaceWith("<div id='choix'>Durée choisie : <br /></div>");
    let val = document.getElementById("timePeriod").value;
    console.log("durée = " + val);
    $("#choix").append(`${val} min`); 
}

//// Image & bouton réinitialisation & selects paramètres cachés
$("img").hide();
$("#autreBreak").hide();
$("#soundSelect").hide();
$("#imgSelect").hide();

//// Affiche les paramètres quand on clique sur cog
$("#settings").click(function() {
    $("#soundSelect").show();
    $("#imgSelect").show();    
});

//// deco de bouton
let stylesInactive = {
    backgroundColor : "rgb(204, 204, 204)",
    color : "rgb(100, 100, 100)",
    border : "1px solid black"
};

let stylesActive = {
    backgroundColor : "white",
    color : "black",
    border : "1px solid black"
};

// oiseaux https://bigsoundbank.com/UPLOAD/ogg/1672.ogg
// cloche "https://bigsoundbank.com/UPLOAD/ogg/2116.ogg"
   
//// Objet son
let son = document.createElement("audio");
son.src = "https://bigsoundbank.com/UPLOAD/ogg/2116.ogg";
son.volume = 0.1;
son.autoPlay = false;
son.preLoad = true;
son.controls = true;

//// Changer de son
$('#soundSelect').change(function() {
    if ($(this).val() === 'cloche') {
        son.src = "https://bigsoundbank.com/UPLOAD/ogg/2116.ogg";
        // recache paramètres
        $("#soundSelect").hide();   
        $("#imgSelect").hide();
        console.log('cloche');
    } else if ($(this).val() === 'oiseau') {
        son.src = "https://bigsoundbank.com/UPLOAD/ogg/1672.ogg"
        // recache paramètres
        $("#soundSelect").hide();   
        $("#imgSelect").hide();
    console.log('oiseau');
    }
});

//// Changer d'image
$('#imgSelect').change(function() {
    if ($(this).val() === 'zen') {
        $("img").attr('src', 'break2.jpg');
        // recache paramètres
        $("#soundSelect").hide();   
        $("#imgSelect").hide();
        console.log('img2');
    } else if ($(this).val() === 'mer') {
        $("img").attr('src', 'break1.jpg');
        // recache paramètres
        $("#soundSelect").hide();
        $("#imgSelect").hide();
    console.log('img1');
    }
});

//// faire clignoter le title
let title = document.getElementById('title');
let favicon = document.getElementById('favicon');

//* Plus loin on stoke les function texte et fav dans ces variable pour pouvoir les stopper
let clignotText;
let clignotFavicon;

//* stop la fonction clignotement
function stop() {
    clearInterval(clignotText);
    clearInterval(clignotFavicon);
}

//* fait clignoter le titre
function texte() {
    title.textContent = title.textContent == "TAKE" ? "A BREAK" : "TAKE";
    // $("h1").fadeOut(200).delay(300).fadeIn(200);
    // favicon.setAttribute("href", "stop.png");
}
//* fait clignoter le favicon
function fav() {
    favicon.href = favicon.href == "https://nobleheather.github.io/takeABreak/go.png" ? "https://nobleheather.github.io/takeABreak/stop.png" : "https://nobleheather.github.io/takeABreak/go.png";
}

//// affiche alert &|| img &|| play a sound
function takeBreak() {
    let i = enabledSettings.length;
    console.log(enabledSettings);
    console.log("i = " + i);
    //* A la 2e itération on affiche imgDiv qui a été caché par btn "autre break"
    $("#imgDiv").show();
    if (i == 1) { // si tableau a une case
        console.log("i == 1");
        //teste contenu du tableau et agit en fonction de choix de notif
        if (enabledSettings.includes("son")) {
            son.play();
            $("#calcul").css(stylesActive);
        } else if (enabledSettings.includes("image")) {
            $("img").show();
            $("#autreBreak").show();
            console.log("allo ?");
            // $("#calcul").css(stylesActive);
        } else if (enabledSettings.includes("alert")) {
            // alert("Take a break !");
            clignotText = setInterval(texte, 1000);
            clignotFavicon = setInterval(fav, 1000);
            $("#calcul").css(stylesActive);
        } else {
            console.log("erreur");
        }    
    } else if (i == 2) { // si tableau a 2 cases
        console.log("i == 2");
        console.log(enabledSettings);
        if (enabledSettings.includes('son') && enabledSettings.includes('image')) {
            son.play();
            $("img").show();
            $("imgDiv").show();
            $("#autreBreak").show();
            console.log("sound + img");
        } else if (enabledSettings.includes('image') && enabledSettings.includes('alert')) {
            $("img").show();
            $("imgDiv").show();
            $("#autreBreak").show();
            // alert("Take a break !");
            clignotText = setInterval(texte, 1000);
            clignotFavicon = setInterval(fav, 1000);
            console.log("img + alert");
        } else if (enabledSettings.includes('alert') && enabledSettings.includes('son')) {
            son.play();
            $("#calcul").css(stylesActive);
            // alert("Take a break !");
            clignotText = setInterval(texte, 1000);
            clignotFavicon = setInterval(fav, 1000);
            console.log("alert + sound");
        } else {
            console.log("erreur");
        }    
    } else if (i == 3) { // si tableau a 3 cases
        console.log("i == 3");
        console.log(enabledSettings);
        $("img").show();
        $("#autreBreak").show();
        son.play();
        // alert("Take a break !");
        clignotText = setInterval(texte, 1000);
        clignotFavicon = setInterval(fav, 1000);
        console.log("alert + son + img")
    } else {
        console.log("error");
    }
}

//// calcule la durée à partir du click
let click;
$("#calcul").click(function(event) {
    // stylise bouton
    $("#calcul").css(stylesInactive);
    // si pas de notif choisie
    if (enabledSettings.length === 0) {
        alert("Choisissez un type de notification");
        $("#calcul").css(stylesActive);
    // lancement du chrono
    } else {
        click = event.timeStamp;
        console.log("origine du temps = " + click);
        // pour passer de 10 ms à 10 min : * 60 000
        let val = (document.getElementById("timePeriod").value) * 60000; 
        console.log("durée = " + val);
        setTimeout(takeBreak, val);
    }
});

//// Réinitialiser
$('#autreBreak').click(function() {
    $("#imgDiv").hide(); //? Pourquoi on peut pas juste cacher l'img ?
    $("#img").hide();
    $("#autreBreak").hide();
    $("#calcul").css(stylesActive);
    stop();
});

//* FONCTIONNE MAIS INUTILISEE
// Quand on clique sur bouton start, lance compteur
// Au 2e clique, affiche temps
// let last, now;
// console.log(last);
// console.log(now);

// $("#start").click(function(event) {

//     if (last) {
//         now = Math.round((event.timeStamp - last) / 1000);
//         console.log(last);
//         console.log(now);
//         $("#temps").append("time since last event: " + now + "<br />");
//     } else {
//         $("#temps").append("Click again <br />");
//     }

//     last = event.timeStamp;
//     console.log(last);
// });
//*JUSQUE ICI