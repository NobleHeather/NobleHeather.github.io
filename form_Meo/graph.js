// graph camembert

let ctxAll = document.querySelectorAll('canvas');
console.log(ctxAll);

// async function DrawGraph() {
//     let dataGraph = await DisplayQuestion();
//     console.log(dataGraph);

//     DrawPie(dataGraph[0]); //? capturer labels et titre aussi ?
// }
// DrawGraph();

//* camembert
// function DrawPie(data) {
setTimeout(function(){

    let graphF0Q1 = new Chart(ctxAll[0], {
        type: 'pie',
        data: {
            labels: ['Je le reconnaitrai mais là je ne peux pas le voir', 'Je vois un visage flou', 'Je vois un visage ni flou, ni net', 'Je vois un visage net'],
            datasets: [{
                label: 'Visualisation d\'un visage',
                data: dataGraph[0],
                backgroundColor: ['blue', 'yellow', 'purple', 'orange']
            }]
        },
        options : {
            plugins: {
                title: {
                    display: true,
                    position: 'top',
                    fullSize : false,
                    text: 'Question 1',
                    align: 'start'
                },
                legend: {
                    // title: {
                    //     display: true,
                    //     text: 'Legende'
                    // },
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