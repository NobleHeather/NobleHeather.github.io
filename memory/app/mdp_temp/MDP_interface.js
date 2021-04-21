let mdp = document.getElementById('mdp');
let btnOk = document.getElementById('ok');

btnOk.addEventListener('click', function() {
    console.log(mdp.value);
    if (mdp.value == password) {
        document.location = './app/index.html';
    }
});
