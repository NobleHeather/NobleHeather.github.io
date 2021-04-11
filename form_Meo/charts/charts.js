// const config = {
//     type: "line",
//     data,
//     options: {},
// };

// const { Chart } = require("chart.js");

// const { Chart } = require("chart.js");

// var myChart = new Chart(document.getElementById("myChart"), config);

// var ctx = document.getElementById('myChart');
// var ctx = document.getElementById('myChart').getContext('2d');
// var ctx = $('#myChart');
// var ctx = 'myChart';

// var ctx = document.getElementById('myChart');
// var myChart = new Chart(ctx, {
//     type: 'bar',
//     data: {
//         labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
//         datasets: [{
//             label: '# of Votes',
//             data: [12, 19, 3, 5, 2, 3],
//             backgroundColor: [
//                 'rgba(255, 99, 132, 0.2)',
//                 'rgba(54, 162, 235, 0.2)',
//                 'rgba(255, 206, 86, 0.2)',
//                 'rgba(75, 192, 192, 0.2)',
//                 'rgba(153, 102, 255, 0.2)',
//                 'rgba(255, 159, 64, 0.2)'
//             ],
//             borderColor: [
//                 'rgba(255, 99, 132, 1)',
//                 'rgba(54, 162, 235, 1)',
//                 'rgba(255, 206, 86, 1)',
//                 'rgba(75, 192, 192, 1)',
//                 'rgba(153, 102, 255, 1)',
//                 'rgba(255, 159, 64, 1)'
//             ],
//             borderWidth: 1
//         }]
//     },
//     options: {
//         scales: {
//             y: {
//                 beginAtZero: true
//             }
//         }
//     }
// });

/********************************************/
//// JS DE MOUA

//* variables
let buttons = document.querySelectorAll('.question > .texte > button');
let textDiv = document.querySelectorAll('.question > .texte');
let graphDiv = document.querySelectorAll('.question > .graphDefault');
let graphUnderDiv = document.querySelectorAll('.question > .graphUnder');
// buttons[0].style.opacity = '0';
// textDiv[1].style.opacity = '0';
// graphDiv[2].style.opacity = '0';

//* fait apparaître le graph en modifiant le css
function showGraph(x) {
    textDiv[x].style.transform = "translateX(-50%)";
    buttons[x].style.display = "none";
    setTimeout(function() {
        textDiv[x].style.transform = "translateX(0)";
        textDiv[x].style.transition = "0ms";
        graphDiv[x].style.display = "flex";
    }, 1000)
    setTimeout(function() {
        graphDiv[x].style.opacity = "1";
        graphUnderDiv[x].style.opacity = "1";
        graphUnderDiv[(x+1)].style.opacity = "1"; //* à incrémenter selon le nb de graph cachés
    }, 1100)
}

//* Pour chaque bouton, on montre le graph qui correspond
for (let y = 0; y < buttons.length; y++) {
    (function(arg) {
        buttons[y].addEventListener('click', function() {
            showGraph(y);          
        }, false);
    })(y);
}

//* switch between graph 
let btnDoughnut = document.getElementById('doughnut');
let btnPie = document.getElementById('pie');
let doughnutDiv = document.getElementById('deux');
let pieDiv = document.getElementById('deuxBis');
btnDoughnut.addEventListener('click', function() {
    doughnutDiv.style.display = "none";
    pieDiv.style.display = "flex"
});
btnPie.addEventListener('click', function() {
    doughnutDiv.style.display = "flex";
    pieDiv.style.display = "none"
});

let btnScatter = document.getElementById('scatter');
let btnLine = document.getElementById('line');
let btnLineFill = document.getElementById('lineFill');

let ScatterDiv = document.getElementById('zero');
let lineDiv = document.getElementById('zeroBis');
let lineFillDiv = document.getElementById('zeroTer');

btnScatter.addEventListener('click', function() {
    ScatterDiv.style.display = "none";
    lineDiv.style.display = "flex";
    lineFillDiv.style.display = "none";
});
btnLine.addEventListener('click', function() {
    ScatterDiv.style.display = "none";
    lineDiv.style.display = "none";
    lineFillDiv.style.display = "flex";
});
btnLineFill.addEventListener('click', function() {
    ScatterDiv.style.display = "flex";
    lineDiv.style.display = "none";
    lineFillDiv.style.display = "none";
});

//* change ratio
let btnRatio = document.getElementById('ratio');
let btnRatioBack = document.getElementById('ratio1');
let barDiv = document.getElementById('un');
let barDivBack = document.getElementById('unBis');
btnRatio.addEventListener('click', function() {
    barDiv.style.display = "none";
    barDivBack.style.display = "flex";
});
btnRatioBack.addEventListener('click', function() {
    barDiv.style.display = "flex";
    barDivBack.style.display = "none";
});


// montrer/cacher légende
// let LegendDisplay = graph.options.plugins.legend.display;
// let display = graph.options.plugins.legend.display;
// function displayLegend() {
//     console.log('allo ?');
//     display = true;
// }

// fonctionne quand on ouvre et ferme la console //? why
// let btnShowLegend = document.querySelectorAll('.graph > button');
// btnShowLegend[0].addEventListener('click', function() {
//     showLegend();
//     // graph.options.plugins.title.text = 'allo';
//     // graph.options.plugins.legend.display = true;
//     // console.log('cliqué');
//     // console.log(graph.options.plugins.legend.display);
//     // console.log(graph.options.plugins.title.text);
// });
// function showLegend() {
//     graph.options.plugins.legend.display = true;
//     console.log(graph.options.plugins.legend.display);
// }
// console.log(graph.options.plugins.legend.display);

// console.log(graph.options.plugins.legend);

// function changeName(z) {
//     console.log('changeName');
//     z = 'new name';
//     console.log(z);
// }

// var original = Chart.defaults.global.legend.onClick;
// Chart.defaults.global.legend.onClick = function(e, legendItem) {
//   console.log('Allo ?');
//   original.call(this, e, legendItem);
// };

//// GRAPH

let ctx = document.querySelector('#monGraph'); // ctx = contexte

//* Graph ligne
let graph = new Chart(ctx, {
    type: 'line',
    data: {
        labels: ['Oui', 'Non', 'Je ne sais pas', '42', 'La réponse D', 'Obi wan Kenobi'],
        datasets: [{ // au pluriel car on peut avoir plusieurs courbes
            label: 'CLICK ME', // nom de la courbe
            data: [12, 19, 3, 5, 2, 3],
            borderColor: 'brown', //couleur de ligne pour type 'line'
            backgroundColor: ['salmon', 'lightblue', 'goldenrod', 'lightgreen', 'palevioletred', 'gold'], // plusieurs couleur de point/remplissage
        },
        {
            label: 'OR ME',
            data: [14, 8, 5, 3, 10, 22],
            borderColor: 'black', //couleur de ligne pour type 'line'
            backgroundColor: ['salmon', 'lightblue', 'goldenrod', 'lightgreen', 'palevioletred', 'gold'], // plusieurs couleur de point/remplissage
        }]
    },
    options: {
        elements: {
            point: {
                pointStyle: 'triangle', //styles possibles: star, rectRounded, triangle, crossRot...
                radius: 7,
                hoverRadius: 7
            }
        },
        scales: {
            y: {
                beginAtZero: true // pour que graph commence à 0 et pas valeur la  basse
            }
        },
        plugins: {
            title: {
                display: true,
                position: 'left',
                text: 'Titre à gauche en couleur',
                color: 'magenta',
            },
            legend: {
                title : {
                    display: true,
                    text: 'legende, alignée à droite',
                    font: {
                        weight: 'bold',
                        size: 15
                    } 
                },
                display: true,
                align: 'end',
                labels: {
                },
            }
        },
    },
})

let ctxTer = document.querySelector('#monGraphTer'); // ctx = contexte

//* Graph line bis
let graphTer = new Chart(ctxTer, {
    type: 'line',
    data: {
        labels: ['Oui', 'Non', 'Je ne sais pas', '42', 'La réponse D', 'Obi wan Kenobi'],
        datasets: [
        { // au pluriel car on peut avoir plusieurs courbes
            label: 'CLICK ME', // nom de la courbe
            data: [3, 8, 5, 3, 10, 22],
            borderColor: 'red', //couleur de ligne pour type 'line'
            fill : true,
            backgroundColor: 'pink',
        },
        {
            label: 'OR ME',
            data: [12, 19, 25, 13, 30, 26],
            borderColor: 'blue',
            fill : '-1', // -1 // 'origin'
            backgroundColor: 'cyan'
        }]
    },
    options: {
        elements: {
            line: {
                tension: 0.000001
            },
        },
        scales: {
            y: {
                beginAtZero: true // pour que graph commence à 0 et pas valeur la  basse
            }
        },
        plugins: {
            filler: {
                propagate: false
            },
            title: {
                display: true,
                position: 'left',
                text: 'Titre à gauche en couleur',
                color: 'magenta',
            },
            legend: {
                title : {
                    display: true,
                    text: 'Si courbes se chevauchent pas (min/max)',
                    font: {
                        weight: 'bold',
                        size: 15,
                    }, 
                    color: 'red'
                },
                display: true,
            }
        },
    },
})

let ctxBis = document.querySelector('#monGraphBis'); // ctx = contexte

//* Graph scatter
let graphBis = new Chart(ctxBis, {
    type: 'scatter',
    data: {
        labels: ['Oui', 'Non', 'Je ne sais pas', '42', 'La réponse D', 'Obi wan Kenobi'],
        datasets: [{ // au pluriel car on peut avoir plusieurs courbes
            label: 'CLICK ME', // nom de la courbe
            data: [12, 19, 3, 5, 2, 3],
            borderColor: 'red', //couleur de ligne pour type 'line'
            backgroundColor: 'pink', // une seule couleur de point/remplissage
        },
        {
            label: 'OR ME',
            data: [14, 8, 5, 3, 10, 22],
            borderColor: 'black', //couleur de ligne pour type 'line'
            backgroundColor: ['salmon', 'lightblue', 'goldenrod', 'lightgreen', 'palevioletred', 'gold'], // plusieurs couleur de point/remplissage
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true // pour que graph commence à 0 et pas valeur la  basse
            }
        },
        plugins: {
            title: {
                display: true,
                position: 'left',
                text: 'Titre à gauche en couleur',
                color: 'magenta',
            },
            legend: {
                title : {
                    display: true,
                    text: 'legende, alignée à droite',
                    font: {
                        weight: 'bold',
                        size: 15
                    } 
                },
                display: true,
                align: 'end',
                labels: {
                },
            }
        },
    },
})

let ctx1 = document.querySelector('#monGraph1'); // ctx = contexte

//* graph bar
let graph1 = new Chart(ctx1, {
    type: 'bar',
    data: {
        labels: ['Quelle pomme ?', 'ça me donne faim', 'Oui', 'Non', 'Peut-être', 'quoi encore ?'],
        datasets: [{
            label: 'Pomme bleue',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: ['red', 'blue', 'yellow', 'green', 'purple', 'orange']
        },
        {
            label: 'Pomme avec petite feuille',
            data: [14, 8, 5, 3, 10, 22],
            backgroundColor: ['salmon', 'lightblue', 'goldenrod', 'lightgreen', 'palevioletred', 'gold']
        }
    ]
    },
    options: {
        onClick() {
            console.log(graph1.data.datasets[0].label);
            // graph.options.plugins.legend.title = 'allo';
        },
        scales: {
            y: {
                beginAtZero: true
            }
        },
        plugins: {
            title: {
                display: true,
                position: 'top',
                text: 'Titre en haut + grand',
                font: {
                    size: 30
                }
            }
        },
    }
})

//* bar again (# ratio)
let ctx1Bis = document.querySelector('#monGraph1Bis'); // ctx = contexte

let graph1Bis = new Chart(ctx1Bis, {
    type: 'bar',
    data: {
        labels: ['Quelle pomme ?', 'ça me donne faim', 'Oui', 'Non', 'Peut-être', 'quoi encore ?'],
        datasets: [{
            label: 'Pomme bleue',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: ['red', 'blue', 'yellow', 'green', 'purple', 'orange']
        },
        {
            label: 'Pomme avec petite feuille',
            data: [14, 8, 5, 3, 10, 22],
            backgroundColor: ['salmon', 'lightblue', 'goldenrod', 'lightgreen', 'palevioletred', 'gold']
        }
    ]
    },
    options: {
        onClick() {
            console.log(graph1.data.datasets[0].label);
            // graph.options.plugins.legend.title = 'allo';
        },
        scales: {
            y: {
                beginAtZero: true
            }
        },
        plugins: {
            title: {
                display: true,
                position: 'top',
                text: 'Titre en haut + grand',
                font: {
                    size: 30
                }
            }
        },
    }
})

let ctx2 = document.querySelector('#monGraph2');

//* camembert
let graph2 = new Chart(ctx2, {
    type: 'pie',
    data: {
        labels: ['Oui', 'Non', 'Aucun idée', 'Quelle était la Q ?', 'Stéphanie de Monaco', 'Jocker'],
        datasets: [{
            label: 'Nombre de votes',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: ['red', 'blue', 'yellow', 'green', 'purple', 'orange']
        }]
    },
    options : {
        plugins: {
            title: {
                display: true,
                position: 'bottom',
                fullSize : false,
                text: 'Titre en bas aligné à droite',
                align: 'end'
            },
            legend: {
                title: {
                    display: true,
                    text: 'legende à droite, labels en couleur'
                },
                display: true,
                labels: {
                    color: 'green'
                },
                position: 'right'
            }
        }
    }
})
let ctx2bis = document.querySelector('#monGraph2bis');

//* pie
let graph2bis = new Chart(ctx2bis, {
    type: 'doughnut',
    data: {
        labels: ['Oui', 'Non', 'Aucun idée', 'Quelle était la Q ?', 'Stéphanie de Monaco', 'Jocker'],
        datasets: [{
            label: 'Nombre de votes',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: ['red', 'blue', 'yellow', 'green', 'purple', 'orange']
        }]
    },
    options : {
        plugins: {
            title: {
                display: true,
                position: 'bottom',
                fullSize : false,
                text: 'Titre en bas aligné à droite',
                align: 'end'
            },
            legend: {
                title: {
                    display: true,
                    text: 'legende à droite, labels en couleur'
                },
                display: true,
                labels: {
                    color: 'green'
                },
                position: 'right'
            }
        }
    }
})

let ctx3 = document.querySelector('#monGraph3');

//* radar
let graph3 = new Chart(ctx3, {
    type: 'radar',
    data: {
        labels: ['HOVER MY POINT ON THE GRAPH', 'Non', 'Aucun idée', 'Quelle était la Q ?', 'Stéphanie de Monaco', 'Oui'],
        font: {
            weight: 'bold',
            size: 10
        },
        datasets: [{
            label: 'F',
            data: [12, 19, 3, 5, 2, 3],
            // backgroundColor: ['red', 'blue', 'yellow', 'green', 'purple', 'orange']
            borderColor: 'purple',
            backgroundColor: 'rgba(75, 5, 71, 0.2)'
        },
        {
            label: 'M',
            data: [20, 3, 17, 9, 6, 0],
            // backgroundColor: ['red', 'blue', 'yellow', 'green', 'purple', 'orange']
            borderColor: 'red',
            backgroundColor: 'rgba(231, 17, 17, 0.2)'
        },
        {
            label: 'O',
            data: [2, 6, 8, 18, 12],
            // backgroundColor: ['red', 'blue', 'yellow', 'green', 'purple', 'orange']
            borderColor: 'orange',
            backgroundColor: 'rgba(245, 124, 11, 0.2)'
        }
    ]
    },
    options : {
        elements: {
            point: {
                pointStyle: 'rectRounded', //styles possibles: star, rectRounded, triangle, crossRot...
                radius: 3, // taille du point
                hoverRadius: 7
            },
            line: {
                borderWidth: 1,
            }
        },
        plugins: {
            title: {
                display: true,
                position: 'top',
                fullSize : false,
                text: 'Titre'
            },
            legend: {
                title: {
                    display: true,
                    text: 'legende'
                },
                display: true,
                labels: {
                    // color: 'green'
                },
                position: 'bottom'
            }
        }
    }
})
