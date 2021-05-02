//* Afficher les données
// localStorage.clear();
const GetData = async function() {
    // return await fetch('http://localhost:3000/api/question')
    return await fetch(`${thisUrl}/api/form`)
    // return await fetch('https://aphantasique-form.herokuapp.com/api/question')
    .then(response => response.json())
    .then(json => {
        console.log('Données en vrac (Form 0): ', json);
        DisplayQuestion(json);
    })
    .catch((e) => console.log(e))
}
GetData();

function DisplayQuestion(data) {

    let question0 = [];
    let question1 = [];
    let question2 = [];
    let question3 = [];
    let question4 = [];
    let question5 = [];
    let question6 = [];
    
    console.log(data[4])
    console.log(data[4].Num_Data[0])
    console.log(data[4].Num_Data[1])
    console.log(data[4].Num_Data[2])
    console.log(data[4].Num_Data[3])
    console.log(data[4].Num_Data[4])
    console.log(data[4].Num_Data[5])
    console.log(data[4].Num_Data[6])
    console.log(data[4].Num_Data[0].length)
    // console.log(data[4].Num_Data[].length)


    for (let i = 0; i < data[4].Num_Data.length; i++) {
        if (data[4].Num_Data[i].num = 0) {
            question0.push(data[4].Num_Data[i].data)
        } else if (data[4].Num_Data[i].num = 1) {
            question1.push(data[4].Num_Data[i].data)
        } else if (data[4].Num_Data[i].num = 2) {
            question2.push(data[4].Num_Data[i].data)
        } else if (data[4].Num_Data[i].num = 3) {
            question3.push(data[4].Num_Data[i].data)
        } else if (data[4].Num_Data[i].num = 4) {
            question4.push(data[4].Num_Data[i].data)
        } else if (data[4].Num_Data[i].num = 5) {
            question5.push(data[4].Num_Data[i].data)
        } else if (data[4].Num_Data[i].num = 6) {
            question6.push(data[4].Num_Data[i].data)
        }
    }
    console.log(question0, question1, question2, question3, question4, question5, question6);
    console.log(data[4].Num_Data.num);
    let datatab = []
    //* Classer par question
    
    
    for (let i = 0; i < data.length; i++) {
        datatab.push(data[i].Num_Data);
    }
    console.log('Données organisées (Num + data): ', datatab);
    console.log(datatab[0]);
    console.log(datatab[0][0]);
    console.log(datatab[0][0][0]);
    console.log(datatab[0][0][1]);
    for (let i = 0; i < datatab[0].length; i++) {
        if (datatab[0][0][i] = 0) {
            console.log(datatab[0][0][i])
            question0.push(datatab[0][0][1]);
        }
    }
    console.log(question0);
    
    const deleteForm = async function() {
        
        fetch(`${thisUrl}/api/form/608ee57114417b3adca695dd`, {
            method: "DELETE"
        })
        .then(response => response.json())
        .then(json => console.log(json));
    }
    // deleteForm();
    // for (let i = 0; i < datatab.length; i++) { 

    //     if (datatab[i][0] = 0) {
    //         question0.push(datatab[i][1]);
    //     } else if (datatab[i][0] = 1) {
    //         question0.push(datatab[i][1]);
    //     } else if (datatab[i][0] = 2) {
    //         question0.push(datatab[i][1]);
    //     } else if (datatab[i][0] = 3) {
    //         question0.push(datatab[i][1]);
    //     } else if (datatab[i][0] = 4) {
    //         question0.push(datatab[i][1]);
    //     } else if (datatab[i][0] = 5) {
    //         question0.push(datatab[i][1]);
    //     } else if (datatab[i][0] = 6) {
    //         question0.push(datatab[i][1]);
    //     }
    //     console.log(question0, question1, question2, question3, question4, question5, question6 )
    // }

    // console.log('Données organisées (Q1) -> section : ', data[0].section,
    // ', question numéro : ', data[0].num, ', question obligatoire ?', data[0].cat, 
    // 'datas : ', datatab);
}