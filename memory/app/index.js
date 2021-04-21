let displayDiv = document.querySelector('#display');

const fetchFiche = async function() {
    // return await fetch('http://localhost:3000/api/fiche')
    return await fetch('https://memory-piafs.herokuapp.com/api/fiche')
    .then(response => response.json())
    .then(json => {
        console.log(json);
        display(json);
    })
    .catch((e) => console.log(e))
}
fetchFiche();

/* <div class="col"> //* NewCard
    <div class="card h-100">
        <img src="notAllowed.png" class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title text-center">Card title</h5>
            <p class="card-text text-center">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
        </div>
    </div>
</div> */

function display(json) {
    
    for (let i = 0; i < json.length; i++) {
        fill(json, i);
    }
}

function create(i) {

    console.log('CREATE');

    let newCard = document.createElement("div");
    newCard.innerHTML = '<div><img><div><h5></h5><p></p></div></div>';
    newCard.setAttribute('class', 'col mb-3');
    newCard.setAttribute('id', `id${i}`);

    let img = newCard.querySelector('img');
    img.setAttribute('class', 'card-img-top');

    let divs = newCard.querySelectorAll('div');
    divs[0].setAttribute('class', 'card h-100  border border-danger');
    divs[1].setAttribute('class', 'card-body');

    let h5 = newCard.querySelector('h5');
    h5.setAttribute('class', 'card-title text-center');

    let p = newCard.querySelector('p');
    p.setAttribute('class', 'card-text text-center')

    displayDiv.appendChild(newCard);

    return [img, h5, p, divs[0]];
}

function fill(json, i) {

    console.log('FILL');

    let tab = create(i);
    console.log(tab);
    console.log(json)

    tab[0].src = json[i].imgUrl;
    tab[1].textContent = json[i].nom;
    tab[2].textContent = json[i].indice;

    //* Si c'est une carte de plante, on met une bordure verte
    if (json[i].categorie == 1) {
        tab[3].setAttribute('class', 'card h-100  border border-success');
    } else if (json[i].categorie == 2) {
        tab[3].setAttribute('class', 'card h-100  border border-primary');
    }
}