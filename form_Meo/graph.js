// graph camembert


// console.log(fieldsets[0].querySelector('legend strong').textContent);
// console.log(fieldsets[0].querySelector('label').textContent.trim());
// console.log($`${fieldsets[0]} label`);



//* Récupère labels et texte de questions dans le html
function GetLabels() {
    
    let labelsTab = []
    let titlesTab = []
    for (let i = 0; i < fieldsets.length; i++) {

        let labels = []
        for (let y = 0; y < fieldsets[i].querySelectorAll('label').length; y++) {
            labels.push(fieldsets[i].querySelectorAll('label')[y].textContent.trim())
        }

        titlesTab.push(fieldsets[i].querySelector('legend').textContent)

        console.log(labels)
        labelsTab.push(labels);
        
    }
    console.log(labelsTab);
    return {labelsTab : labelsTab, titlesTab : titlesTab};
}
// GetLabels();

//* choix des couleurs pour les graphs
let colors = ['blue', 'green', 'red', 'purple', 'orange', 'pink', 'yellow', 'black', 'grey']

//* Fabrique un tableau de couleur en fonction du nombre de couleur qu'on veut
function SetColors() {
    console.log(GetLabels());
    let labelsAll = GetLabels();
    console.log(labelsAll.labelsTab);
    console.log(labelsAll.titlesTab);
    // console.log(labelsAll[0]);
    // console.log(labelsAll[0][0]);
    // console.log(labelsAll[0].length);
    
    let colorTab = [[], [], [], [], [], [], []];
    for (let i = 0; i < labelsAll.labelsTab.length; i++) {
            // console.log(labelListe);
            
        for (let y = 0; y < labelsAll.labelsTab[i].length; y++) {
            colorTab[i].push(colors[y]);
        }
        
    }
    console.log(colorTab);
    console.log(labelsAll);
    return {colorTab : colorTab, labelsAll : labelsAll.labelsTab, titlesTab : labelsAll.titlesTab};
}
// SetColors();

let infosGraph = SetColors();
console.log(infosGraph);
console.log(infosGraph.colorTab);
console.log(infosGraph.labelsAll);
console.log(infosGraph.titlesTab);

//* camembert
// console.log(fieldsets[0].querySelector('legend strong').textContent);
//? NB : dataGraph dans getData

console.log(dataGraph); // all data
console.log(dataGraph[0]); //Q1


let dataGraphCompliledAll = [];

function formateDataForGraph() {

    //* Pour chaque question
    for (let y = 0; y < dataGraph.length; y++) { // length = 7
        console.log('y -> 7', y)
        const dataGraphCompliled = [];
        
        console.log('nb de label / Q', infosGraph.labelsAll[y].length)
        //* Crée un tableau de data
        //* dans lequel data[0] = nombre de '0' dans le tableau de toutes les réponses
        //* en fonction du nombre de label dans la question courante
        //! range n'a pas de labels ! faire en fonction de input
        for (let i = 0; i <  infosGraph.labelsAll[y].length; i++) {
            console.log('i -> nb de label', i)
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
        console.log(`all data for Q${y}`,dataGraphCompliled);
        //* On crée un tableau avec tous les tableaux précédents : nb de réponses/label/question
        dataGraphCompliledAll.push(dataGraphCompliled);
    }
    console.log('données de départ', dataGraph)
    console.log(`données formatées pour graph`, dataGraphCompliledAll);
    return dataGraphCompliledAll;
}


//* On laisse le temps à la base de données d'envoyer les données dans getData.js
//? Voir si on peut utiliser un truc async + élégant omg
setTimeout(function(){

    //* dans setTimeout car id créé avec JS
    let ctxAll = document.querySelectorAll('canvas');
    console.log(ctxAll);

    // console.log(fieldsets.querySelector('legend strong').textContent);
    console.log(fieldsets[0].querySelector('legend strong').textContent.replace(' ', ''));
    let namesAll = []
    for (let i = 0; i < fieldsets.length; i++) {
        console.log(fieldsets[i].querySelector('legend strong').textContent.replace(' ', ''));
        namesAll.push(fieldsets[i].querySelector('legend strong').textContent.replace(' ', ''));
    }
    console.log(namesAll);

    const dataCompiled = formateDataForGraph()
    console.log(dataCompiled);
    console.log(ctxAll[0], infosGraph.titlesTab[0], infosGraph.labelsAll[0], infosGraph.colorTab[0], dataCompiled[0]);
    for (let i = 0; i < 6; i++) { // < nb total de pie
        if (i != 1) {
            DrawPie(namesAll[i], ctxAll[i], infosGraph.titlesTab[i], infosGraph.labelsAll[i], infosGraph.colorTab[i], dataCompiled[i]);
        } else {
            // range
        }
    }

}, 3000)

//* Crée graph avec données rentrées en paramètres
function DrawPie(name, ctx, title, labels, colors, data) {

    name = new Chart(ctx, { //graphF0Q1
        type: 'pie',
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


