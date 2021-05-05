// graph camembert


console.log(fieldsets[0].querySelector('legend').textContent);
console.log(fieldsets[0].querySelector('label').textContent.trim());
console.log($`${fieldsets[0]} label`);


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

let colors = ['blue', 'green', 'red', 'purple', 'orange', 'pink', 'yellow', 'black', 'grey']

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

let ctxAll = document.querySelectorAll('canvas');
console.log(ctxAll);

//* camembert
// function DrawPie(data) {
setTimeout(function(){

    let graphF0Q1 = new Chart(ctxAll[0], {
        type: 'pie',
        data: {
            labels: infosGraph.labelsAll[0], // data-legend
            datasets: [{
                label: 'Nombre de réponses ?', // titre ?
                data: dataGraph[0], // data
                backgroundColor: infosGraph.colorTab[0]
            }]
        },
        options : {
            plugins: {
                title: {
                    display: true,
                    position: 'top',
                    fullSize : false,
                    text: infosGraph.titlesTab[0], // titre du graph
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
}, 2000)
// }