//* QUESTIONS
// localStorage.clear();
    //* NOMMAGE DES CHAMPS
// (ça n'a l'air de rien là comme ça mais il m'a fallu autant de temps que si je les avais
// nommés un par un dans le html donc je suis même pas sûre que ça soit rentable,
// t'as intérêt à faire un formulaire 2.0 et même un 3.0)

//* Dans la section 0 souvenirs visuels, en fonction du nombre de fieldset
function NameQuestion() {

    for (let x = 0; x < $('#SouvenirsVisuels fieldset').length; x++) {
    
        //* On nomme chaque fieldset avec un numéro de question
        //todo NB : c'est une class et pas un id car on a des id "hidden" pour les toggle btn //Du coup j'ai mis les truc toggle dans des div
        $(`#SouvenirsVisuels fieldset:eq(${x})`).attr('id', `question${x}`);
        $(`#SouvenirsVisuels fieldset:eq(${x}) button`).attr('id', `validerQ${x}`);
    
        //* On nomme les inputs et les labels de ce fieldset en fonction du numéro de question
        for (let i = 0; i < $(`#question${x} input`).length; i++) {
            $(`#question${x} input:eq(${i})`).attr('id', `q${x}_${i}`);
            $(`#question${x} input:eq(${i})`).attr('name', `q${x}`);
            $(`#question${x} input:eq(${i}) + label`).attr('for', `q${x}.${i}`);
        }
    }
}
NameQuestion();

    //* CAPTAGE DE DATA (question 1, voir si généralisable)

//*Envoyer data de Q à la DB
const PostForm = async function(formInfo) {
    console.log('POST_FORM');
    console.log(thisUrl);
    
    // console.log(formInfo);
    // fetch('http://localhost:3000/api/question', {
        fetch(`${thisUrl}/api/form`, {
        // fetch('https://aphantasique-form.herokuapp.com/api/question', {
        
        method: "POST",
        headers : {
            'Accept' : 'application/json',
            'Content-type': 'application/json'
        },
        body: JSON.stringify(formInfo)
    })
    .then(response => response.json())
    .then(json => {
        console.log('Données renvoyées par la DB : ', json);
    })
    .catch((e) => {
        console.log(e);
    })
}

//// Stock les questions sur local storage
function PostQuestion(questionInfo) {
    console.log('POST_QUESTION_LOCAL_STORAGE');
    console.log(questionInfo)

    let questionInfoTab = JSON.parse(localStorage.getItem("questionInfoTab")) || [];
    //* Si c'est un textarea
    if (questionInfo.somethingElse) {
        questionInfoTab.push([questionInfo.section, {num : questionInfo.num, data : questionInfo.somethingElse}]);
        localStorage.setItem("questionInfoTab", JSON.stringify(questionInfoTab));

    } else {
        questionInfoTab.push([questionInfo.section, {num : questionInfo.num, data : questionInfo.data}]);
        localStorage.setItem("questionInfoTab", JSON.stringify(questionInfoTab));
    }
    questionInfoTab = JSON.parse(localStorage.getItem("questionInfoTab"));
    // console.log(questionInfoTab);

    //* Update la progression
    let progression = JSON.parse(localStorage.getItem("progression")) || 0;
    progression += 1
    localStorage.setItem("progression", JSON.stringify(progression));
    console.log(progression);
    UpdateProgression(progression);

    //// Stock le num de Q sur localStorage
    let disableTab = JSON.parse(localStorage.getItem("disableTab")) || [];
    disableTab.push(questionInfo.num);
    localStorage.setItem("disableTab", JSON.stringify(disableTab));
    
}


//*Formate un objet formInfo à envoyer à la DB
function CreateFormInfo() {
    console.log('FONCTION CREATE_FORM_INFO');
    //// On récupère le tableau de toutes les questions sur locat storage
    let formInfoTab = JSON.parse(localStorage.getItem("questionInfoTab"));
    
    console.log(formInfoTab);

    const formInfoPropre = formInfoTab.map(item => {
        // console.log(item);
        // console.log(item[1]);
        // console.log(item[1]);
        return item = item[1];
    });

    let pseudo = "test temp";

    let formInfo = {
        section : formInfoTab[0][0],
        Num_Data : formInfoPropre,
        pseudo : pseudo
    }

    console.log(formInfo);

    return formInfo;
}
// CreateFormInfo();

$('#ValiderForm').on('click', function(e) {
    console.log('BOUTON VALIDER_FORM');
    e.preventDefault();

    // btn btn-warning col-3 m-auto
    $('#ValiderForm').attr('class', 'btn btn-secondary col-3 m-auto')
    
    PostForm(CreateFormInfo());

});

    //* FORMATAGE QUESTIONS
let fieldsets = document.querySelectorAll('fieldset');

//* Crée un objet à envoyer à DB pour ratio
function CreateRatioQuestionInfo(fieldset) {
    let inputs = fieldset.querySelectorAll("input");
    let btnValider = fieldset.querySelector("button");
    let btnShowGraph = fieldset.querySelector("a");

    // console.log(inputs);
    // console.log(btnValider);
    // console.log(btnShowGraph);
    // console.log(fieldset);

    btnShowGraph.style.opacity = "0";

    //* Quand on clique sur valider on montre le btn showGraph
    //* Et on disable la question + capture les données
    btnValider.addEventListener("click", function (e) {
        console.log("BOUTON VALIDER");
        e.preventDefault();

        // console.log(inputs);
        // console.log(btnValider);
        // console.log(btnShowGraph);
        // console.log(fieldset);

        btnShowGraph.style.opacity = "1";
        console.log( fieldset.querySelector('input:checked').getAttribute('id').charAt(3) );

        console.log(JSON.parse($(fieldset).attr("id").charAt(8)));
        // console.log($(`input:checked`).attr("id").charAt(3));

        // console.log('allo ?');
        let questionInfo = {
            num: JSON.parse($(fieldset).attr("id").charAt(8)), //num de question
            data: JSON.parse(fieldset.querySelector('input:checked').getAttribute('id').charAt(3)), //réponse user
            section: "Souvenirs Visuels", //sous-partie du questionnaire
        };

        console.log("Données entrées par l'utilisateur : ", questionInfo);
        PostQuestion(questionInfo);
        DisableQuestion(inputs);
    });

    //* Quand on clique sur btn showGraph... montre le graph (wow quelle surprise)
    btnShowGraph.addEventListener("click", function (e) {
        console.log("BOUTON SHOW_GRAPH");
        e.preventDefault();

        fieldset.setAttribute("class", "texte col-12 col-md-6 d-flex flex-column justify-content-between pb-3 mb-3");
    });
}

//* Crée un objet à envoyer à DB pour textarea
function CreateAvisQuestionInfo(fieldset) {

    //* Quand on clique sur le bouton pour l'ensemble du form
    $(fieldset.querySelector('textarea')).on('change', function() {
        // e.preventDefault();

        let questionInfo = {
            num: JSON.parse($(fieldset).attr("id").charAt(8)), //num de question
            data: -1, //réponse user
            section: "Souvenirs Visuels", //sous-partie du questionnaire
            somethingElse : $('textarea').val()
        };
    
        console.log("Données entrées par l'utilisateur : ", questionInfo);
    
        PostQuestion(questionInfo);

    });
    
}

//* Crée un objet à envoyer à DB pour range
function CreateRangeQuestionInfo(fieldset) {

   
    let btnValider = fieldset.querySelector("button");
    let btnShowGraph = fieldset.querySelector("a");

    
    // console.log(btnValider);
    // console.log(btnShowGraph);
    // console.log(fieldset);

    btnShowGraph.style.opacity = "0";

    //* Quand on clique sur valider on montre le btn showGraph
    //* Et on disable la question + capture les données
    btnValider.addEventListener("click", function (e) {
        console.log("BOUTON VALIDER");
        e.preventDefault();

        let rangeVal = fieldset.querySelector("input").value;
        console.log(rangeVal);

        btnShowGraph.style.opacity = "1";
        //* disable range
        fieldset.querySelector("input").disabled = true;

        // console.log('allo ?');
        let questionInfo = {
            num: JSON.parse($(fieldset).attr("id").charAt(8)), //num de question
            data: JSON.parse(rangeVal), //réponse user
            section: "Souvenirs Visuels", //sous-partie du questionnaire
        };

        console.log("Données entrées par l'utilisateur : ", questionInfo);

        PostQuestion(questionInfo);
    });

    //* Quand on clique sur btn showGraph... montre le graph (wow quelle surprise)
    btnShowGraph.addEventListener("click", function (e) {
        console.log("BOUTON SHOW_GRAPH");
        e.preventDefault();

        fieldset.setAttribute("class", "texte col-6");
    });

}

//* Capture les éléments dans chaque fieldset
Array.from(fieldsets, fieldset => {
    
    //* Si c'est une partie textarea, on l'exclus
    if (fieldset.querySelector('legend').getAttribute('id') == 'avis') {
        console.log('avis');

        CreateAvisQuestionInfo(fieldset);
    //* Sinon on continue
    } else if (fieldset.querySelector('input').getAttribute('type') == 'range') {
        console.log('range');
        CreateRangeQuestionInfo(fieldset);
    } else {
        CreateRatioQuestionInfo(fieldset);  
        console.log('ratio');
    }
    
});





// $('#validerQ0').on('click', function(e) {
//     e.preventDefault();

//     //input
//     // console.log($(`#question0 input:checked`)); // Oooooh :O
//     // console.log($(`#question0 input:checked`).attr('id'));
//     // console.log($(`#question0 input:checked`).attr('id').charAt(3)); //Aaaah :O


    
//     let questionInfo = {
//         num : 0, //num de question
//         data : [$(`#question0 input:checked`).attr('id').charAt(3)], //réponse user
//         cat: true, //question obligatoire ou non
//         section: 'representation visuelle' //sous-partie du questionnaire
//     }
    
//     console.log('Données entrées par l\'utilisateur : ', questionInfo);
    
//     PostQuestion(questionInfo);

//     //! DisableQuestion(questionInfo.num)
    
// });
    