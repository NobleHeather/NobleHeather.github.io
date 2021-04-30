//* QUESTIONS

    //* NOMMAGE DES CHAMPS
// (ça n'a l'air de rien là comme ça mais il m'a fallu autant de temps que si je les avais
// nommés un par un dans le html donc je suis même pas sûre que ça soit rentable,
// t'as intérêt à faire un formulaire 2.0 et même un 3.0)

//! Que va faire ce bout de code quand il n'y aura pas de label juste après input ? (cas des range)
//* Dans la section 1 représentation visuelle, en fonction du nombre de fieldset
for (let x = 0; x < $('#SouvenirsVisuels fieldset').length; x++) {

    //* On nomme chaque fieldset avec un numéro de question
    //todo NB : c'est une class et pas un id car on a des id "hidden" pour les toggle btn //Du coup j'ai mis les truc toggle dans des div
    $(`#SouvenirsVisuels fieldset:eq(${x})`).attr('id', `question${x}`);
    $(`#SouvenirsVisuels fieldset:eq(${x}) button`).attr('id', `validerQ${x}`);

    //* On nomme les inputs et les labels de ce fieldset en fonction du numéro de question
    for (let i = 0; i < $(`#question${x} input`).length; i++) {
        $(`#question${x} input:eq(${i})`).attr('id', `q${x}.${i}`);
        $(`#question${x} input:eq(${i})`).attr('name', `q${x}`);
        $(`#question${x} input:eq(${i}) + label`).attr('for', `q${x}.${i}`);
    }
}

    //* CAPTAGE DE DATA (question 1, voir si généralisable)

    //*Envoyer data de Q à la DB
    const PostQuestion = async function(questionInfo) {
        fetch(`${thisUrl}/api/question`, {
        // fetch('http://localhost:3000/api/question', {
        // fetch('https://aphantasique-form.herokuapp.com/api/question', {
            method: "POST",
            headers : {
                'Accept' : 'application/json',
                'Content-type': 'application/json'
            },
            body: JSON.stringify(questionInfo)
        })
        .then(response => response.json())
        .then(json => {
            console.log('Données renvoyées par la DB : ', json);
        })
        .catch((e) => {
            console.log(e);
        })
    }

    //* Capturer les values des inputs
    //! ratio

    
let fieldsets = document.querySelectorAll('fieldset');


//* Désactive la question
function DisableQuestion(inputs) {

    console.log('FONCTION DISABLE_QUESTION');
    
    Array.from(inputs, item => {
        item.setAttribute('disabled', 'disabled')
            // console.log(inputs);
    });

}

//* Capture les éléments dans chaque fieldset
Array.from(fieldsets, fieldset => {
    let inputs = fieldset.querySelectorAll('input');
    let btnValider = fieldset.querySelector('button');
    let btnShowGraph = fieldset.querySelector('a');

    console.log(inputs);
    console.log(btnValider);
    console.log(btnShowGraph);
    console.log(fieldset);

    //* Si c'est une partie textarea, on l'exclus
    if (fieldset.querySelector('legend').getAttribute('id') == 'avis') {
        console.log('avis');
    //* Sinon on continue
    } else {

        btnShowGraph.style.opacity = '0';
    
        //* Quand on clique sur valider on montre le btn showGraph
        //* Et on disable la question + capture les données
        btnValider.addEventListener('click', function(e) {
            console.log('BOUTON VALIDER');
            e.preventDefault();
            
            btnShowGraph.style.opacity = '1';
            DisableQuestion(inputs);
    
            // console.log('allo ?');
            let questionInfo = {
                num : $(fieldset).attr('id').charAt(8), //num de question
                data : [$(`${fieldset} input:checked`).attr('id').charAt(3)], //réponse user
                section: 'Souvenirs Visuels' //sous-partie du questionnaire
            }
            
            console.log('Données entrées par l\'utilisateur : ', questionInfo);
            
            PostQuestion(questionInfo);
            
        }); 
    
        //* Quand on clique sur btn showGraph... montre le graph (wow quelle surprise)
        btnShowGraph.addEventListener('click', function(e) {
            console.log('BOUTON SHOW_GRAPH');
            e.preventDefault();
            
            fieldset.setAttribute('class', 'texte col-6');
        
        });

    }
    
});





$('#validerQ0').on('click', function(e) {
    e.preventDefault();

    //input
    // console.log($(`#question0 input:checked`)); // Oooooh :O
    // console.log($(`#question0 input:checked`).attr('id'));
    // console.log($(`#question0 input:checked`).attr('id').charAt(3)); //Aaaah :O


    
    let questionInfo = {
        num : 0, //num de question
        data : [$(`#question0 input:checked`).attr('id').charAt(3)], //réponse user
        cat: true, //question obligatoire ou non
        section: 'representation visuelle' //sous-partie du questionnaire
    }
    
    console.log('Données entrées par l\'utilisateur : ', questionInfo);
    
    PostQuestion(questionInfo);

    //! DisableQuestion(questionInfo.num)
    
});
    