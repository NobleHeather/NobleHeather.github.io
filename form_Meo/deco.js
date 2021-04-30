//* Pour range

function get_tickmarks() {
    // remplacer .replaceWith avec un équivalent de textContent omg - -"
    $("#choix").replaceWith("<small id='choix'>&nbsp; => Choix : </small>");

    // console.log(document.getElementById(""));
    console.log(document.querySelector('.form-range').value);

    let val = document.querySelector('.form-range').value;
    console.log("choix = " + val);
    $("#choix").append(`${val}`);
}

