// graph camembert


// console.log(fieldsets[0].querySelector('legend strong').textContent);
// console.log(fieldsets[0].querySelector('label').textContent.trim());
// console.log($`${fieldsets[0]} label`);



//* Récupère labels et texte de questions dans le html
function GetLabels() {
    console.log('%c GET LABELS ', fct);
    console.log('%cRécupère les textes des labels et des questions dans html', exp)
    
    let labelsTab = []
    let inputsTab = [] //pour range
    let titlesTab = []
    //* Pour chaque question
    for (let i = 0; i < fieldsets.length; i++) {

        let labels = [];
        let inputs = []; //pour range
        // console.log(fieldsets[i]);
        //* En fonction du nombre de labels
        for (let y = 0; y < fieldsets[i].querySelectorAll('label').length; y++) {

            // console.log(fieldsets[i].getAttribute('class') == 'avis col-12');
            //* Si un seul label et que ce n'est pas avis
            if (fieldsets[i].querySelectorAll('label').length <= 1 && fieldsets[i].getAttribute('class') != 'avis col-12') { // range

                // console.log(fieldsets[i].querySelector('input').getAttribute('class') == 'form-range')
                // if (fieldsets[i].querySelector('input').getAttribute('class')) {
                // console.log(fieldsets[i].querySelectorAll('option'))

                //* On capture toutes les options dans un tableau (on s'en fout du contenu on veut juste la longeur du tableau après)
                let nbOptionsRange = fieldsets[i].querySelectorAll('option')
                inputs.push(nbOptionsRange);
                // console.log(inputs)
                    //  labels.push(fieldsets[i].querySelectorAll('label')[y].textContent.trim())
                // }
            //* Si c'est une question ratio
            } else {
                //* on capture les labels
                labels.push(fieldsets[i].querySelectorAll('label')[y].textContent.trim())
            }
        }

        titlesTab.push(fieldsets[i].querySelector('legend').textContent)

        // console.log(labels)
        // console.log(inputs)
        labelsTab.push(labels);
        inputsTab.push(inputs);
        
    }
    console.log('%ctab de tous les labels', vrb, labelsTab);
    console.log('%ctab de tous les inputs', vrb, inputsTab);
    console.log('%ctab de tous les titres', vrb, titlesTab);
    // // const onlyNumbers = things.filter(thing => {
    // //       return typeof thing === 'number';
    // //     });
    // //     console.log(onlyNumbers);
    // let inputRange = inputsTab.filter(input => {
    //     console.log(input);
    //     // return input[0].getAttribute('class') == 'form-range';
    //     // if (input.length <= 1 && input.length != undefined) {

    //     // }
    //     return input.length <= 1 && input[0] != undefined

    // });
    // console.log(inputRange);
    return {labelsTab : labelsTab, titlesTab : titlesTab, inputsTab : inputsTab};
}
// GetLabels();

//* choix des couleurs pour les graphs
let colors = ['rgb(65, 63, 189)', 'rgb(21, 224, 157)', '#ffc107', 'rgb(241, 141, 11)', 'rgb(5, 221, 70)', 'rgb(9, 110, 22)', 'rgb(129, 9, 9)', 'rgb(184, 6, 6)', 'rgb(117, 2, 112)', 'rgb(196, 11, 186)']

//* Fabrique un tableau de couleur en fonction du nombre de couleur qu'on veut
function SetColors() {
    console.log('%c SET COLORS ', fct);
    console.log('%cEn fonction du nombre de label de la question, remplit un tableau avec le bon nombre de couleurs', exp)

    // console.log(GetLabels());
    let labelsAll = GetLabels();
    // console.log(labelsAll.labelsTab);
    // console.log(labelsAll.inputsTab);
    // console.log(labelsAll.titlesTab);
    
    
    let colorTab = [[], [], [], [], [], [], []];
    // console.log(labelsAll.labelsTab[i].length);
    
    for (let i = 0; i < labelsAll.labelsTab.length; i++) {
            // console.log(labelsAll.labelsTab[i]);
        if (labelsAll.labelsTab[i].length < 1) { // range
            //? pourquoi pas la même structure labelsAll.inputsTab / labelsAll.labelsTab ?
            for (let y = 0; y < (labelsAll.inputsTab[i][0].length + 1); y++) { 
                // console.log(i)
                // console.log(labelsAll.inputsTab[i][0])
                // console.log(labelsAll.inputsTab[i][0].length)
                colorTab[i].push(colors[y]);
            }
        } else { // pie
            for (let y = 0; y < labelsAll.labelsTab[i].length; y++) {
                colorTab[i].push(colors[y]);
            }
        }
        
    }
    console.log('%cvar colorTab', vrb, colorTab);
    console.log('%cvar labelsAll', vrb, labelsAll);
    return {colorTab : colorTab, labelsAll : labelsAll.labelsTab, inputsAll : labelsAll.inputsTab,  titlesTab : labelsAll.titlesTab, };
}
// SetColors();

let infosGraph = SetColors();
// console.log(infosGraph);
// console.log(infosGraph.colorTab);
// console.log(infosGraph.labelsAll);
// console.log(infosGraph.inputsAll[1]);
// console.log(infosGraph.inputsAll[1][0].length);
// console.log(infosGraph.titlesTab);

//* camembert
// console.log(fieldsets[0].querySelector('legend strong').textContent);
//? NB : dataGraph dans getData

//* console.log(dataGraph); // all data
//* console.log(dataGraph[0]); //Q1


let dataGraphCompliledAll = [];

function formateDataForGraph() {
    console.log('%c FORMATE DATA FOR GRAPH ', fct);
    console.log('%cTrie les données et fabrique des variables pour remplir les graph', exp);

    //* Pour chaque question
    for (let y = 0; y < dataGraph.length; y++) { // length = 7
        // console.log('y -> 7', y)
        const dataGraphCompliled = [];
        
        console.log('nb de label dans Q courante', infosGraph.labelsAll[y].length)
        //* Crée un tableau de data
        //* dans lequel data[0] = nombre de '0' dans le tableau de toutes les réponses
        //* en fonction du nombre de label dans la question courante
        //! range n'a pas de labels ! faire en fonction de input
        if (infosGraph.labelsAll[y].length < 1) {
            console.log('IF graph RANGE');
            // console.log(y);
            // if range
            //* + 1 car option 0 pas dans la liste des values, peut-être à changer
            for (let i = 0; i <  (infosGraph.inputsAll[y][0].length + 1); i++) {
                // console.log(infosGraph.inputsAll[y].length)
                // console.log('i -> nb de input', i)
                
                //* On filtre par label
                dataGraph[y].filter(x => {
                    //* Si pas de réponse pour ce label -> -1
                    if (x!=i) {
                        return -1;
                    //* Sinon: nb de réponses pour ce label
                    } else {
                        return x==i
                    }
                }).length //* filter crée un tableau de toutes les réponses donc [1, 1, 1, 1...] pour réponse 1, .length permet d'avoir nb de case dans le tableau donc nb de 1
    
                //* On crée un tableau avec tous les nb de réponses/label [4, 5, 2] = 4 rep 1, 5 rep 2, 2 rep 3...
                dataGraphCompliled.push(dataGraph[y].filter(x => x==i).length);
            }
        } else {
            // if pie
            console.log('ELSE graph PIE')
            for (let i = 0; i <  infosGraph.labelsAll[y].length; i++) {
                // console.log('i -> nb de label', i)
                // console.log(`nb de ${i} :`, dataGraph[0].filter(x => x==i).length);
                // console.log('allo ?')
                //* On filtre par label
                dataGraph[y].filter(x => {
                    //* Si pas de réponse pour ce label -> -1
                    if (x!=i) {
                        return -1;
                    //* Sinon: nb de réponses pour ce label
                    } else {
                        return x==i
                    }
                }).length //* filter crée un tableau de toutes les réponses donc [1, 1, 1, 1...] pour réponse 1, .length permet d'avoir nb de case dans le tableau donc nb de 1
    
                //* On crée un tableau avec tous les nb de réponses/label [4, 5, 2] = 4 rep 1, 5 rep 2, 2 rep 3...
                dataGraphCompliled.push(dataGraph[y].filter(x => x==i).length);
            }
        }
        console.log(`all data for Q${y} :`, dataGraphCompliled);
        //* On crée un tableau avec tous les tableaux précédents : nb de réponses/label/question
        dataGraphCompliledAll.push(dataGraphCompliled);
    }
    console.log('%cZONE DE COMPARAISON', test);
    console.log('%cdonnées de départ :', vrb, dataGraph)
    console.log(`%cdonnées formatées pour graph:`, vrb, dataGraphCompliledAll);
    return dataGraphCompliledAll;
}


//* On laisse le temps à la base de données d'envoyer les données dans getData.js
//? Voir si on peut utiliser un truc async + élégant omg
setTimeout(function(){

    console.log('%c SET TIMEOUT ', fct);
    console.log('%cAvec un délai pour être sûr d\'avoir reçu les données de la DB, on lance la création des graph', exp);
    //* dans setTimeout car id créé avec JS
    let ctxAll = document.querySelectorAll('canvas');
    // console.log(ctxAll);

    // console.log(fieldsets.querySelector('legend strong').textContent);
    // console.log(fieldsets[0].querySelector('legend strong').textContent.replace(' ', ''));
    //* On stock un titre raccourci
    let namesAll = []
    for (let i = 0; i < fieldsets.length; i++) {
        // console.log(fieldsets[i].querySelector('legend strong').textContent.replace(' ', ''));
        namesAll.push(fieldsets[i].querySelector('legend strong').textContent.replace(' ', ''));
    }
    console.log('%cvar namesAll (titre court)', vrb, namesAll);

    const dataCompiled = formateDataForGraph()
    console.log('%cvar dataCompiled (all data formated for graph)', vrb, dataCompiled);
    // console.log(ctxAll[0], infosGraph.titlesTab[0], infosGraph.labelsAll[0], infosGraph.colorTab[0], dataCompiled[0]);
    for (let i = 0; i < 6; i++) { // < nb total de graph
        if (i != 1) {
            console.log('IF ce n\'est pas la question range');
            // console.log(namesAll[i], ctxAll[i], infosGraph.titlesTab[i], infosGraph.labelsAll[i], infosGraph.colorTab[i], dataCompiled[i]);
            if (i % 2 == 0) {
                console.log('IF pair : pie');
                DrawPie(namesAll[i], ctxAll[i], infosGraph.titlesTab[i], infosGraph.labelsAll[i], infosGraph.colorTab[i], dataCompiled[i], 'pie');
            } else {
                console.log('ELSE impair : doughnut');
                DrawPie(namesAll[i], ctxAll[i], infosGraph.titlesTab[i], infosGraph.labelsAll[i], infosGraph.colorTab[i], dataCompiled[i], 'doughnut');
            }
        } else {
            console.log('ELSE c\'est la Q1 : bar')
            // console.log('draw me a bar ?')
            // console.log(namesAll[i], ctxAll[i], infosGraph.titlesTab[i], infosGraph.labelsAll[i], infosGraph.colorTab[i], dataCompiled[i]);
            DrawBar(namesAll[i], ctxAll[i], infosGraph.titlesTab[i], infosGraph.labelsAll[i], infosGraph.colorTab[i], dataCompiled[i]);
        }
    }

}, 3000)

//* Crée graph avec données rentrées en paramètres
function DrawPie(name, ctx, title, labels, colors, data, type) {
    console.log('%c DRAW PIE ', fct);
    console.log('%cFabrique un graph pie avec chart.js', exp);

    name = new Chart(ctx, { //graphF0Q1
        type: type,
        data: {
            labels: labels, // data-legend
            datasets: [{
                label: 'Nombre de réponses ?', // titre ?
                data: data, // data
                backgroundColor: colors //colors
            }]
        },
        options : {
            plugins: {
                title: {
                    display: true,
                    position: 'top',
                    fullSize : false,
                    text: title, // titre du graph
                    align: 'start'
                },
                legend: {
                    title: {
                        display: true,
                        text: 'Legende'
                    },
                    display: true,
                    labels: {
                        color: 'black'
                    },
                    position: 'bottom'
                }
            }
        }
    })
}

function DrawBar(name, ctx, title, labels, colors, data) {
// console.log(name, ctx, title, labels, colors, data);
    console.log('%c DRAW BAR ', fct);
    console.log('%cFabrique un graph bar avec chart.js', exp);
    labels = data;
// console.log(labels);
    name = new Chart(ctx, { //graphF0Q1
        type: 'bar',
        data: {
            labels: labels, // data-legend
            datasets: [{
                label: 'Nombre de réponses ?', // titre ?
                data: data, // data
                backgroundColor: colors //colors
            }]
        },
        options : {
            scales: {
                y: {
                    beginAtZero: true
                }
            },
            plugins: {
                title: {
                    display: true,
                    position: 'top',
                    fullSize : false,
                    text: title, // titre du graph
                    align: 'start'
                },
                legend: {
                    title: {
                        display: true,
                        text: 'Legende'
                    },
                    display: true,
                    labels: {
                        color: 'black'
                    },
                    position: 'bottom'
                }
            }
        }
    })
}
