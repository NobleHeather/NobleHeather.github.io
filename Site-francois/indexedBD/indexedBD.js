// Create needed constants
const list = document.querySelector('ul');
const titleInput = document.querySelector('#title');
const bodyInput = document.querySelector('#body');
const form = document.querySelector('form');
const submitBtn = document.querySelector('form button');

// Objet db pour stocker la BDD ouverte
let db;

window.onload = function() {

    // Ouvrir la BDD; elle sera créée si elle n'existe pas déjà
    // (voir onupgradeneeded)
        // Cette ligne crée une requête request pour ouvrir la version 1 de 
        // la base de données appelée notes. Si elle n'existe pas déjà, 
        // on devra la créer via un gestionnaire d'événement.
    let request = window.indexedDB.open('notes', 1);

};

// la base de données n'a pas pu être ouverte avec succès
request.onerror = function() {
    console.log('Database failed to open');
  };
  
  // la base de données a été ouverte avec succès
  request.onsuccess = function() {
    console.log('Database opened successfully');
  
    // Stocke la base de données ouverte dans la variable db. On l'utilise par la suite
    db = request.result;
  
    // Exécute la fonction displayData() pour afficher les notes qui sont dans la BDD
    displayData();
  };

  // Spécifie les tables de la BDD si ce n'est pas déjà pas fait
request.onupgradeneeded = function(e) {
    // Récupère une référence à la BDD ouverte
    let db = e.target.result;
  
    // Crée un objectStore pour stocker nos notes (une table)
    // Avec un champ qui s'auto-incrémente comme clé
    let objectStore = db.createObjectStore('notes', { keyPath: 'id', autoIncrement:true });
  
    // Définit les champs que l'objectStore contient
    objectStore.createIndex('title', 'title', { unique: false });
    objectStore.createIndex('body', 'body', { unique: false });
  
    console.log('Database setup complete');
  };