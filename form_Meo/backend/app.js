const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const Question = require('./models/question');
const User = require('./models/user');
const Form = require('./models/form');
const fs = require('fs');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
// const PASS = require('./PASS'); //! a supprimer ensuite ! fait crasher Heroku
// mongoose.connect(`mongodb+srv://NobleHeather:${PASS}@cluster0.bfskp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,
mongoose.connect('mongodb+srv://NH:aphantForm@aphantasiqueform.tlab4.mongodb.net/AphantasiqueForm?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

const app = express();

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization, X-Auth-Token');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

// //* Code Méo
// app.use(function(req, res, next) {
//     res.header('Access-Control-Allow-Origin', '*');
//     res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
//     res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
//     // allow preflight
//     if (req.method === 'OPTIONS') {
//         res.send(200);
//     } else {
//         next();
//     }
// });

app.use(express.json());

//* post question ok !
app.post('/api/question', (req, res, next) => {
    delete req.body._id;
    const question = new Question({
      ...req.body
    });
    question.save()
      .then(() => res.status(201).json({ message: 'Datas enregistrés !', question : question}))
      .catch(error => res.status(400).json({ error }));
});

//* post form
app.post('/api/form', (req, res, next) => {
    delete req.body._id;
    const form = new Form({
      ...req.body
    });
    form.save()
      .then(() => res.status(201).json({ message: 'Form enregistré !', form : form}))
      .catch(error => res.status(400).json({ error }));
    });

function WriteMail(mail) {
    //* Créer un ficher texte de toutes les adresses mail (qui ne sort pas du serveur)
    let mailStream = fs.createWriteStream('mails.txt', {flags : 'a'});
    mailStream.write(mail);
    mailStream.end(', ');
}
//* User logup OK !
app.post('/api/user/logup', (req, res, next) => {

    //* hash mail
    bcrypt.hash(req.body.mail, 10)
    .then(hash => {
        const mail = hash;
        //* hash pass
        bcrypt.hash(req.body.password, 10)
        .then(hash => {
            const user = new User({
                pseudo: req.body.pseudo,
                mail: mail,
                password : hash,
            });
            user.save()
            .then(() => res.status(201).json({ message: 'User added !', user: user, pseudo : user.pseudo}))
            .catch(error => res.status(400).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));

    console.log(req.body.mail);

    setTimeout(function() {
        WriteMail(req.body.mail);
    }, 1000);
});
    
// // GET only one
// app.get('/api/article/:id', (req, res, next) => {
//     Thing.findOne({ _id: req.params.id })
//       .then(thing => res.status(200).json(thing))
//       .catch(error => res.status(404).json({ error }));
//   });

//* User login ok !
app.post('/api/user/login', (req, res, next) => { //? api.get & api/pass/:id
    User.findOne({ pseudo: req.body.pseudo })
      .then(user => {
        if (!user) {
            return res.status(401).json({ error: 'Utilisateur non trouvé !' });
        }
        bcrypt.compare(req.body.password, user.password)
        .then(valid => {
            if(!valid) {
                return res.status(401).json({ error: 'Mot de passe incorrect !'});
            }
            res.status(200).json({
                userId: user._id,
                token: jwt.sign(
                    { userId : user._id },
                    'RANDOM_TOKEN_SECRET',
                    { expiresIn : '1h' }
                ),
                pseudo: req.body.pseudo
            });
        })
        .catch(error => res.status(500).json({ error }));
      })
      .catch(error => res.status(500).json({ error }));

});

// MODIFIER
//* Possible de trouver via nom ?
// app.put('/api/article/:id', (req, res, next) => {
// Article.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
//     .then(() => res.status(200).json({ message: 'Article modifié !'}))
//     .catch(error => res.status(400).json({ error }));
// });

app.delete('/api/form/:id', (req, res, next) => {
    Form.deleteOne({ _id: req.params.id })
      .then(() => res.status(200).json({ message: 'Form supprimé !'}))
      .catch(error => res.status(400).json({ error }));
});

// GET
app.use('/api/question', (req, res, next) => {
    Question.find()
        .then(questions => res.status(200).json(questions))
        .catch(error => res.status(400).json({ error }));
});

app.use('/api/form', (req, res, next) => {
    Form.find()
        .then(questions => res.status(200).json(questions))
        .catch(error => res.status(400).json({ error }));
});

module.exports = app;