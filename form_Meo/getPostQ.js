//* QUESTIONS

    //* NOMMAGE DES CHAMPS
// (ça n'a l'air de rien là comme ça mais il m'a fallu autant de temps que si je les avais
// nommés un par un dans le html donc je suis même pas sûre que ça soit rentable,
// t'as intérêt à faire un formulaire 2.0 et même un 3.0)

//! Que va faire ce bout de code quand il n'y aura pas de label juste après input ? (cas des range)
//* Dans la section 1 représentation visuelle, en fonction du nombre de fieldset
for (let x = 0; x < $('#representationVisuelle fieldset').length; x++) {

    //* On nomme chaque fieldset avec un numéro de question
    //todo NB : c'est une class et pas un id car on a des id "hidden" pour les toggle btn //Du coup j'ai mis les truc toggle dans des div
    $(`#representationVisuelle fieldset:eq(${x})`).attr('id', `question${x}`);

    //* On nomme les inputs et les labels de ce fieldset en fonction du numéro de question
    for (let i = 0; i < $(`#question${x} input`).length; i++) {
        $(`#question${x} input:eq(${i})`).attr('id', `q${x}.${i}`);
        $(`#question${x} input:eq(${i}) + label`).attr('for', `q${x}.${i}`);
    }
}

