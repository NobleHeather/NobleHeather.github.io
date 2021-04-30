const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const Question = require('./models/question');
const User = require('./models/user');
const fs = require('fs');
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://NobleHeather:<PASS></PASS>@cluster0.bfskp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
// mongoose.connect('mongodb+srv://NH:<PASS>@aphantasiqueform.tlab4.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

const app = express();

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

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

//* User logup OK !
app.post('/api/user/logup', (req, res, next) => {
    //* Créer un ficher texte de toutes les adresses mail (qui ne sort pas du serveur)
    let mailStream = fs.createWriteStream('mails.txt', {flags : 'a'});
    mailStream.write(req.body.mail);
    mailStream.end(', ');
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
            .then(() => res.status(201).json({ message: 'User added !', user: user}))
            .catch(error => res.status(400).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
});
    
// GET only one
app.get('/api/article/:id', (req, res, next) => {
    Thing.findOne({ _id: req.params.id })
      .then(thing => res.status(200).json(thing))
      .catch(error => res.status(404).json({ error }));
  });

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
                token: 'TOKEN'
            });
        })
        .catch(error => res.status(500).json({ error }));
      })
      .catch(error => res.status(500).json({ error }));

});

// MODIFIER
//* Possible de trouver via nom ?
app.put('/api/article/:id', (req, res, next) => {
Article.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Article modifié !'}))
    .catch(error => res.status(400).json({ error }));
});

app.delete('/api/article/:id', (req, res, next) => {
    Article.deleteOne({ _id: req.params.id })
      .then(() => res.status(200).json({ message: 'Article supprimé !'}))
      .catch(error => res.status(400).json({ error }));
});

// GET
app.use('/api/question', (req, res, next) => {
    Question.find()
        .then(questions => res.status(200).json(questions))
        .catch(error => res.status(400).json({ error }));
});

module.exports = app;