BULMA
mobile first

<!--! texte -->
is-size-1 jusque 7
is-uppercase
is-italic
has-text-weight-bold
has-text-centered or right centered : ! sur les img aussi !
title
subtitle

<!--! placement -->
is-vcentered pour centrer dans le viewport !
sur 12 colonnes : columns > column is-2

<!--! responsive -->
is-something-something-desktop -tablet -mobile
! pas tous les éléments !
is-multiline pour que ça aille à la ligne
is-variable dans un container (//columns) pour que les trucs dedans bougent ?

<!--! couleur -->
has-text-primary warning danger success info dark light...
has-text-primary-dark/light pour varier
    -> + de couleur que bootstrap avec modifier
has-background-primary

<!--! marges -->
padding
py-1 jusqu'à 7
px-1 to 7
margin
my mx
mt mb pr pl...
nb marg negative bottom

<!--! buttons -->
is-loading fait un spinner dedans

NB : changer couleur pour l'ensemble d'un element (nav, msg) toggle différents styles (txt white...)

has-shadow

is-active pour toggle (créer javascript)
mettre les trucs dans .section + .container pour que ça soit responsive, centré etc



problème : 
nav se déplie pas correctement, idem pour tabs

A faire : 
- pagination
- voir s'il y a pas une partie du css qu'on peut faire avec Bulma
- voir détails de ça : https://bulma.io/bulma-start/

*******************************************************************

Idées : interface pour que J puisse essayer des couleurs

*********************************************************************

NB : 1 vulnerability dans le package :
" Manual Review                                  
             Some vulnerabilities require your attention to resolve             
                                                                                
          Visit https://go.npm.me/audit-guide for additional guidance           


  Low             Regular Expression Denial of Service                          

  Package         braces                                                        

  Patched in      >=2.3.1                                                       

  Dependency of   babel-cli [dev]                                               

  Path            babel-cli > chokidar > anymatch > micromatch > braces         

  More info       https://npmjs.com/advisories/786                              

found 1 low severity vulnerability in 596 scanned packages
  1 vulnerability requires manual review. See the full report for details."