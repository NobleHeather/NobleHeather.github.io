//* QUESTIONS
// localStorage.clear();
    //* NOMMAGE DES CHAMPS
// (ça n'a l'air de rien là comme ça mais il m'a fallu autant de temps que si je les avais
// nommés un par un dans le html donc je suis même pas sûre que ça soit rentable,
// t'as intérêt à faire un formulaire 2.0 et même un 3.0)

let errForm = document.getElementById('formErr');
errForm.style.display = 'none';
//* Dans la section 0 souvenirs visuels, en fonction du nombre de fieldset
function NameQuestion() {
    console.log('%c NAME QUESTION ', fct);
    console.log('%cAttribue des id à tous les éléments du form', exp)

    for (let x = 0; x < $('#SouvenirsVisuels fieldset').length; x++) {
    
        //* On nomme chaque fieldset avec un numéro de question, idem pour button & canvas
        //todo NB : c'est une class et pas un id car on a des id "hidden" pour les toggle btn //Du coup j'ai mis les truc toggle dans des div
        $(`#SouvenirsVisuels fieldset:eq(${x})`).attr('id', `question${x}`);
        $(`#SouvenirsVisuels fieldset:eq(${x}) button`).attr('id', `validerQ${x}`);
        $(`#SouvenirsVisuels fieldset:eq(${x}) button + a`).attr('href', `#collapse${x}`);
        $(`#SouvenirsVisuels fieldset:eq(${x}) + .graph .collapse`).attr('id', `collapse${x}`);
        $(`#SouvenirsVisuels fieldset:eq(${x}) + .graph canvas`).attr('id', `canevas${x}`);
    
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
    console.log('%c POST FORM ', fct);
    console.log('%cEnvoie l\'ensemble des questions à la DB', exp)
    console.log('%cvar thisUrl', vrb, thisUrl);
    
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
        console.log('%cDonnées renvoyées par la DB : ', DB, json);
        
    })
    .catch((e) => {
        console.log(e);
    })
}

//// Stock les questions sur local storage
function PostQuestion(questionInfo) {
    console.log('%c POST QUESTION LOCAL STORAGE ', fct);
    console.log('%cEnregistre les infos de la question dans local storage et le num de la Q à part pour la désactiver + incrémente progression', exp);

    console.log('%cobj questionInfo', vrb, questionInfo)

    //* S'il y a déjà des questions répondues dans local storage, on récupère le tableau
    //* Sinon tableau vide
    let questionInfoTab = JSON.parse(localStorage.getItem("questionInfoTab")) || [];

    //* Si c'est un textarea
    if (questionInfo.somethingElse) {
        console.log('IF textarea');
        questionInfoTab.push([questionInfo.section, [questionInfo.num, questionInfo.somethingElse]]);
        localStorage.setItem("questionInfoTab", JSON.stringify(questionInfoTab));

    //* Si c'est un ratio
    } else {
        console.log('ELSE ratio')
        questionInfoTab.push([questionInfo.section, [questionInfo.num, questionInfo.data]]);
        localStorage.setItem("questionInfoTab", JSON.stringify(questionInfoTab));
    }
    questionInfoTab = JSON.parse(localStorage.getItem("questionInfoTab"));
    // console.log(questionInfoTab);

    //* Update la progression
    let progression = JSON.parse(localStorage.getItem("progression")) || 0;
    progression += 1
    localStorage.setItem("progression", JSON.stringify(progression));
    console.log('%cvar progression', vrb, progression);
    UpdateProgression(progression);

    //// Stock le num de Q sur localStorage
    let disableTab = JSON.parse(localStorage.getItem("disableTab")) || [];
    disableTab.push(questionInfo.num);
    localStorage.setItem("disableTab", JSON.stringify(disableTab));
    
}


//*Formate un objet formInfo à envoyer à la DB
function CreateFormInfo(formInfoTab) {
    console.log('%c FONCTION CREATE FORM INFO ', fct);
    console.log('%cFormate les infos avant envoie à la DB : récup sur local storage, pré-tri', exp);
    
    console.log('%cvar formInfoTab :', vrb, formInfoTab);

    const formInfoPropre = formInfoTab.map(item => {
        // console.log(item);
        // console.log(item[1]);
        // console.log(item[1]);
        return item = item[1];
    });

    let pseudo = JSON.parse(localStorage.getItem("pseudo"));
    console.log('%cvar pseudo', vrb, pseudo);

    let formInfo = {
        section : formInfoTab[0][0],
        Num_Data : formInfoPropre,
        pseudo : pseudo
    }

    console.log('%cvar formInfo', vrb, formInfo);

    return formInfo;
}
// CreateFormInfo();
function verifForm () {
    console.log('%c VERIF FORM ', fct);
    console.log('%cVerifie que le nombre de question répondues == nombre total de Q', exp);

    //// On récupère le tableau de toutes les questions sur local storage
    let formInfoTab = JSON.parse(localStorage.getItem("questionInfoTab"));

    if (formInfoTab.length == fieldsets.length) {
        return formInfoTab;
    } else {
        errForm.style.display = 'block';
        setTimeout(function() {
            errForm.style.display = 'none';
        }, 5000)
        return false;
    }
}

$('#ValiderForm').on('click', function(e) {
    console.log('%c btn valider form ', btn);

    e.preventDefault();

    
    
    let formInfoTab = verifForm();
    
    if (formInfoTab) {
        //* On désactive le bouton
        $('#ValiderForm').attr('class', 'btn btn-secondary col-3 m-auto')
        PostForm(CreateFormInfo(formInfoTab));
    }
    

});

    //* FORMATAGE QUESTIONS
let fieldsets = document.querySelectorAll('fieldset');

//* Crée un objet à envoyer à DB pour ratio
function CreateRatioQuestionInfo(fieldset) {
    console.log('%c CREATE RATIO QUESTION INFO ', fct);
    console.log('%cPour chaque question, crée 2 event listener : pour récupérer infos (btn valider) & pour montrer le graph (btn show graph)', exp);

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
        console.log('%c btn valider ', btn);
        e.preventDefault();

        // console.log(inputs);
        // console.log(btnValider);
        // console.log(btnShowGraph);
        // console.log(fieldset);

        btnShowGraph.style.opacity = "1";
        // console.log( fieldset.querySelector('input:checked').getAttribute('id').charAt(3) );

        // console.log(JSON.parse($(fieldset).attr("id").charAt(8)));
        // console.log($(`input:checked`).attr("id").charAt(3));

        // console.log('allo ?');
        //* Récupère infos dans un obj
        let questionInfo = {
            num: JSON.parse($(fieldset).attr("id").charAt(8)), //num de question
            data: JSON.parse(fieldset.querySelector('input:checked').getAttribute('id').charAt(3)), //réponse user
            section: "Souvenirs Visuels", //sous-partie du questionnaire
        };

        console.log('%cobj données entrées par l\'utilisateur : ', vrb, questionInfo);
        PostQuestion(questionInfo);
        DisableQuestion(inputs);
    });

    //* Quand on clique sur btn showGraph... montre le graph (wow quelle surprise)
    btnShowGraph.addEventListener("click", function (e) {
        console.log('%c btn show graph ', btn);
        e.preventDefault();

        fieldset.setAttribute("class", "texte col-12 col-md-6 d-flex flex-column justify-content-between pb-3 mb-3");
    });
}

//* Crée un objet à envoyer à DB pour textarea
function CreateAvisQuestionInfo(fieldset) {
    console.log('%c CREATE AVIS QUESTION INFO ', fct);
    console.log('%cRécupère les infos entrées par utilisateur dans le text area ON CHANGE (pas click)', exp)

    //* Quand l'utilisateur écrit dans le textarea
    $(fieldset.querySelector('textarea')).on('change', function() {
        // e.preventDefault();

        let questionInfo = {
            num: JSON.parse($(fieldset).attr("id").charAt(8)), //num de question
            data: -1, // pour pas que ça soit traité par erreur
            section: "Souvenirs Visuels", //sous-partie du questionnaire
            somethingElse : $('textarea').val() //réponse user
        };
    
        console.log("%cDonnées entrées par l'utilisateur : ", vrb, questionInfo);
    
        PostQuestion(questionInfo);

    });
    
}

//* Crée un objet à envoyer à DB pour range
function CreateRangeQuestionInfo(fieldset) {
    console.log('%c CREATE RANGE QUESTION INFO ', fct);
    console.log('%cPour chaque question, crée 2 event listener : pour récupérer infos (btn valider) & pour montrer le graph (btn show graph)', exp);
   
    let btnValider = fieldset.querySelector("button");
    let btnShowGraph = fieldset.querySelector("a");

    
    // console.log(btnValider);
    // console.log(btnShowGraph);
    // console.log(fieldset);

    btnShowGraph.style.opacity = "0";

    //* Quand on clique sur valider on montre le btn showGraph
    //* Et on disable la question + capture les données
    btnValider.addEventListener("click", function (e) {
        console.log('%c btn valider ', btn);
        e.preventDefault();

        let rangeVal = fieldset.querySelector("input").value;
        // console.log(rangeVal);

        btnShowGraph.style.opacity = "1";
        //* disable range
        fieldset.querySelector("input").disabled = true;

        // console.log('allo ?');
        let questionInfo = {
            num: JSON.parse($(fieldset).attr("id").charAt(8)), //num de question
            data: JSON.parse(rangeVal), //réponse user
            section: "Souvenirs Visuels", //sous-partie du questionnaire
        };

        console.log("%c obj données entrées par l'utilisateur : ", vrb, questionInfo);

        PostQuestion(questionInfo);
    });

    //* Quand on clique sur btn showGraph... montre le graph (wow quelle surprise)
    btnShowGraph.addEventListener("click", function (e) {
        console.log('%c btn show graph ', btn);
        e.preventDefault();

        fieldset.setAttribute("class", "texte col-6");
    });

}

//* Capture les éléments dans chaque fieldset
console.log('Au chargement de la page : on crée les questions')
Array.from(fieldsets, fieldset => {
    
    //* Si c'est une partie textarea, on l'exclus
    if (fieldset.querySelector('legend').getAttribute('id') == 'avis') {
        console.log('IF question style "avis"');

        CreateAvisQuestionInfo(fieldset);
    //* Sinon on continue
    } else if (fieldset.querySelector('input').getAttribute('type') == 'range') {
        console.log('ELSE IF question style "range"');
        CreateRangeQuestionInfo(fieldset);
    } else {
        CreateRatioQuestionInfo(fieldset);  
        console.log('ELSE question syle "ratio"');
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
    