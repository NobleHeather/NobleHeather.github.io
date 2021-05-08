<!-- !! changer la variable dans TEMPvarFetch avant commit ! -->
<!-- !! changer mongoose.connect avant commit Heroku ! -->
<!-- ?ça marche pas : est-ce le bon compte heroku ? les bonnes adresses fetch ? la bonne base de donnée ? -->


A faire : 

    08/05/21 : fonctionne seulement en local, tempVarFetch = localhost
<!--!  NB : remettre/enlever transparent sur loginInUp l7 -->
<!--!!! postQuestion -> postForm : localstorage.clear temp -->

    <!--* MSG : 05/05/21 test pour manip data : dataset x -->

    A la fin du form, on vide local storage des questions, faire autrement quand il y aura plusieurs form

    mettre msg d'err en console sur fond noir

    log up vérifie juste que tous les champs sont remplis

    revoir design des msg d'err

    pb : textarea info récup on change : update progression à chaque fois + plusieurs fois dans local storage

    pb : si peu de data => pas de graph

    montrer les btn show graph si l'utilisateur se reconnecte + tard (dans disable Q ?)

    capture de range en fonction de si fieldset "avis" a une classe "avis col-12" :
    si on vire text-area pour questionnaire final, remplacer ça (graph.js -> GetLabels)

    revoir tout le circuit pour graph range

    <!-- ça fait bcp de camemberts, alterner avec pie -->

    range : ajouter option value 0 dans le html et voir comment ça réagit dans le JS

    nommer les canvas avec 'pie' ou 'line' ou 'barre' pour pouvoir faire de boucles en fonction du nb de ces noms là

    <!-- range n'a pas de label, recalculer organisation des données pour graph à partir de input -->

    dans partie nommage : faire aussi les id des graph et a + div graph si pas déjà fait

    Section 0 du questionnaire : souvenirs visuels

    <!-- lier pseudo à form avant envoi -->

    btn show graph en opacity 0 et pas display none : on peut cliquer dessus même si invisible

    Empêcher le form de s'envoyer 2 fois quand on reclick sur le bouton
    <!-- Empêcher le form de s'envoyer si tout n'est pas répondu -->

    si on appuie sur entrée ça capte pas les inputs du form connexion
    ajouter genre & age dans form
    centrer les div charts

    déconnexion après 1h fonctionne pas (quand on ferme l'onglet)

    TRANSITIONS : barre de progression, apparition charts

    filtrer fichier mail pour doublons

    <!-- (NB : ne pas laisser trainer de local storage clear :) -->
    <!-- function writeMail backend reload the page (et donc on perd le salut personnalisé)
    même avec un délai on n'enchaine pas inscription et connexion 
    Si on actualise la page, on perd info de connexion -->

    faire un bouton déconnexion

    laisser les réponses cochées qd on disable Q

    Systématiser capture des ranges

    PB model backend form: les data de form sont mixtes, mettre le text area tout seul dans un coin ?

    <!-- NB : quand c'est un button, recharge la page NON c'était cette saloperie de fichier mail -->

    Err terminal : DeprecationWarning: collection.ensureIndex is deprecated. Use createIndexes instead

      mode: 'no-cors' ??

      favicon (heather ?)

CAS PREVUS ET TESTES : 

inscription : ??? -> renvoie sur login si ok
login : err pseudo, err pass, actualisation en plein milieu (si err wifi ou onglet fermé par err)
le local storage garde 1h le login ensuite il faut se reconnecter

30/04 compte rendu :

CHARTS :
- Format :
    - radio -> camembert
    - range -> barres
    - checkbox (plusieurs) -> radar
    - checkbox (une) -> barre horizontale avec %
- Pas d'indication de où se situe l'utilisateur (idée à garder pour charts de profil + tard)
<!-- - Nuage de mots ? non -->

FRONTEND : 
- Utiliser local storage pour stocker temporairement les données du l'utilisateur et lui permettre de reprendre le questionnaire + tard (+ son niveau de progression pour la barre)
- Possible de voir le graph à chaque question, une fois la question validée (bouton valider fait apparaître bouton accès au graph)
- Envoi à la DB par section, une fois toute la section complétée
- Désactiver la question une fois que l'utilisateur a validé sa réponse et vu le graph : btn voir le graph désactive la réponse & btn en bas de section pour envoi DB (si choisit de pas voir le graph, laisser question active jusqu'à envoie DB)


FORMULAIRE
- Faire les sections dans l'ordre de préférence
- Section 0 obligatoire + menu des sections
- Pour chaque section : btn section suivante + revenir au menu (encourager utilisateur à ne pas revenir au menu)
- Faire une barre horizontale % pour complétion du formulaire
- header avec titre + pseudo et barre de complétion

BACKEND :
<!-- - Fichier texte dans le serveur pour stocker adresses mails pour relancer les gens * OK -->
- User :
    <!-- - Lier pseudo à réponse : ajouter pseudo dans le modèle de question ? ou juste dans modèle de section ? -->
    <!-- - Ajouter sexe (F M Other), Age (select) -->
- Question :
    <!-- - stocker données sous forme de number et pas string (en json place idem mais prévoir si on passe ensuite en SQL) -->
<!-- - Faire un modèle de section, avec : num section, num Q + data, pseudo -->

EN SUSPENS :
- Toutes les questions obligatoires ? Si oui virer le cat du modèle de question
- Version anglaise en attente de traduction