function get_tickmarks() {
    // remplacer .replaceWith avec un équivalent de textContent omg - -"
    $("#choix").replaceWith("<small id='choix'>&nbsp; => Choix : </small>");
    let val = document.getElementById("mimique").value;
    console.log("choix = " + val);
    $("#choix").append(`${val}`);
}