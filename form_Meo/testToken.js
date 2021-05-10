let tokenAccess = document.getElementById('token');

// const Q = {
//     num : 1,
//     data : 5,
//     section: 'string'
// }

tokenAccess.addEventListener('click', function() {
    console.log('%c Admin acces', btn);
    if (confirm('Are you admin ?')) {
        console.log('admin');
        // PostQ(Q);
        GetAuth();
    } else {
        console.log('not admin');
    }
});

const GetAuth = async function() {
    const token =  JSON.parse(localStorage.getItem("tokenLS"));
    console.log(token);

    return await fetch(`${thisUrl}/api/admin`, {
        method: "GET", 
        headers: {
          "Content-Type": "application/json", 
          'Accept': "application/json",
          'Authorization': `bearer ${token}`
        },
        body: undefined,
    })
    .then(response => response.json())
    .then(json => {
        console.log('%c Réponse token: ', DB, json);
        // DisplayQuestion(json);
    })
    .catch((e) => console.log(e))
}










const PostQ = async function(Q) {
    console.log('%c POST TOKEN ', fct);

    const token =  JSON.parse(localStorage.getItem("tokenLS"));
    console.log(token);

        fetch(`${thisUrl}/api/admin`, {
        
        method: "POST",
        headers : {
            'Accept' : 'application/json',
            'Content-type': 'application/json',
            'Authorization': `bearer ${token}`
        },
        body: JSON.stringify(Q)
    })
    .then(response => response.json())
    .then(json => {
        console.log('%cDonnées renvoyées par la DB : ', DB, json, token);
        
    })
    .catch((e) => {
        console.log(e);
    })
}