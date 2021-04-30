<!-- !! changer la variable dans TEMPvarFetch avant commit ! -->
<!-- !! changer mongoose.connect avant commit Heroku ! -->

A faire : 
    Section 0 du questionnaire : souvenirs visuels

    centrer les div charts

    Systématiser capture des ranges

    PB : les data de form sont mixtes, mettre le text area tout seul dans un coin ?

    NB : quand c'est un button, recharge la page

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