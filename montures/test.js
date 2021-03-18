//* remplacer virgule par point
function remplacer_virgule_par_point(decimal) {
	return parseFloat((decimal+"").replace(",","."));
}

//*return nombre de fois qu'un caractère [argument 1] apparaît dans chaîne [argument 2] NB : plus bas le prompt
function nbCaractere(caractere, inputUsager) {
	inputUsager2 = inputUsager.split(caractere); //? il se passe quoi là Oo"
	occurrence = inputUsager2.length-1; //? et là ?
	return occurrence;
}

//*Au click sur le bouton on change sa couleur et sa couleur de fond, puis on lance l'interaction utilisateur
const bouton = document.getElementById("bouton");
const paragraphe = document.getElementById("p");

bouton.addEventListener("click", function() {
	bouton.style.color = "#6D6D6D";
	bouton.style.background = "#BABABA";
	bouton.style.border = "2px solid #6D6D6D"
	bouton.style.cursor = "not-allowed";
	paragraphe.style.opacity = 1;

	let km = prompt('Indiquez la distance que vous voulez parcourir : ??? kilomètres');

	const prix = {
		licorne: 3,
		dragon: 5,
		canard_supersonique: 10
	};
			
	//*si l'utilisateur ferme la boite de dialogue ou écrit un espace ou 2 espaces
	switch(km) {
		//? pourquoi impossible de tester null avec if/else & typeof(km) ?
		case null : { 
			alert('Quoi ?! Dites-le carrément si vous avez un problème avec ma boutique !');
			break;
		}
		case ' ' : {
			alert('Plus fort, j\'ai rien entendu !');
			break;
		}
		case '  ' : {
			alert('Plus fort, j\'ai rien entendu !');
			break;
		}
		default : ////@Tristan :
			//*si l'utilisateur rentre des calculs
			let index = km.indexOf('+');
			let index2 = km.indexOf('-');
			let index3 = km.indexOf('*');
			let index4 = km.indexOf('/');
			if (nbCaractere('-', km) >= 2) { //*si contient au moins 2 '-'
				alert('Vous voulez pas aussi me dire ça en racine carré et puissance de 10, tant que vous y êtes ? Vous m\'avez pris pour une calculatrice ?');	
			} else if (index2 !== -1 && km.substring(0, 1) != '-'  //*si contient '-' mais pas en 1ère position
					   || index3 !== -1 || index4 !== -1 || index !== -1) {
				alert('Vous voulez pas aussi me dire ça en racine carré et puissance de 10, tant que vous y êtes ? Vous m\'avez pris pour une calculatrice ?');	
			} else {
				//* si l'utilisateur rentre un chiffre avec une virgule, on transforme avec un point
				km = remplacer_virgule_par_point(km);
				//* si l'utilisateur rentre des chiffres
				if (km > 50) {
					alert('Vous allez trop loin ! Prenez le train, merci.');
				} else if (km < 2 && km != 0 && km != null && km > 0) {
					alert('Allez-y à pied, c\'est mieux pour votre santé (et en plus ça rime)');
				} else if (km == 0) {
					alert('Vous prenez racine ?');	
				} else if (km == 42) { 
					alert('La distance exacte jusqu\'à la réponse absolue !');
					alert('Vous débloquez la fonction : "transplaner" => votre voyage ne vous coûte rien !');
				////@Johann :
				//*si c'est un chiffre négatif
				} else if (Math.sign(km) == -1) {  
					alert('Peut-être que vous pourriez aussi remonter dans le temps ? Jusqu\'à un moment précédant celui où vous avez commencé à me faire perdre le mien ?');
				//*si le nombre de km est correct, on passe au choix de monture
				} else if (km <= 50 && km >= 2 && km != 42) {
					let monture = prompt('Tapez le numéro de la monture choisie');
					switch(monture) {
					case '1' : {
						alert('Montant de votre voyage à dos de licorne : ' + prix.licorne * km + '€');
						break;
					}
					case '2' : {
						alert('Montant de votre voyage à dos de dragon : ' + prix.dragon * km + '€');
						break;
					}
					case '3' : {
						alert('Montant de votre voyage à dos de canard supersonique : ' + prix.canard_supersonique * km + '€');
						break;
					}
					case null : {
						alert('Dans certaines cultures c\'est très mal vu de changer d\'avis au milieu de la négociation. Juste pour info. J\'dis ça j\'dis rien.');
						break;
					}
					default : 
					//*si monture n'est pas un nombre
						if (isNaN(monture)) {
							alert('Un chiffre on a dit !');
						//*si monture est un autre nombre que les options proposées
						} else {
						alert('Merci de renseigner un numéro de monture valide (vous ne pouvez pas compter jusqu\'à 3 ?)');
						}
					}
				} else {
					alert('Merci de renseigner uniquement le chiffre (et de ne pas vous livrer sans raison à du vandalisme numérique)');
				}
			}
		//? où est l'indentation problématique ? On indente pas sous le default de switch ?
	}
});

