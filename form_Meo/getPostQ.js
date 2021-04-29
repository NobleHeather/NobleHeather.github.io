//* QUESTIONS

//* Dans chaque section (ici : représentation visuelle, section 2)
// $('#representationVisuelle fieldset')
// console.log($('#representationVisuelle fieldset').length);

//* Dans la section 1 représentation visuelle
for (let x = 0; x < $('#representationVisuelle fieldset').length; x++) {
    //* On nomme chaque fieldset avec un numéro de question
    //* NB : c'est une class et pas un id car on a des id "hidden" pour les toggle btn
    $(`#representationVisuelle fieldset${x}`).addClass('class', `question${x}`);
    // console.log(x, $(`#representationVisuelle fieldset${x}`).attr());
    //* On nomme les inputs et les labels en fonction du numéro de question
    for (let i = 0; i < $(`#representationVisuelle fieldset${x} input`).length; i++) {
        $(`#question1 input:eq(${i})`).attr('id', `q${i}`);
        $(`#question1 label:eq(${i})`).attr('for', `q${i}`);
    }
}

console.log($('#representationVisuelle fieldset:eq(0)'));
console.log($('#representationVisuelle fieldset:eq(1)'));
console.log($('#representationVisuelle fieldset:eq(0) input:eq(0)'));
console.log($('#representationVisuelle fieldset:eq(0) label:eq(0)'));


//* Nommer les inputs et labels
console.log($('fieldset'))

console.log($('#question1 input'));
// console.log($('#question1 input:eq(1)'));
// console.log($('#question1 label:eq(1)'));
