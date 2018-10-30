let tableau = document.getElementsByClassName("tableau");
document.getElementById("btnRejouer").addEventListener("click", rejouer);
let textVictoire = document.getElementById("textVictoire");
let jouerJoueur1 = true;
let jouerJoueur2 = false;
let classeJoueur1 = "cercle";
let classeJoueur2 = "croix";
let symbolejoueur1 = "O";
let symboleJoueur2 = "X";
let j1 = document.getElementsByClassName(classeJoueur1);
let j2 = document.getElementsByClassName(classeJoueur2);
let nbCellule;
let nomJoueur1;
let nomJoueur2;
let scoreJoueur1;
let scoreJoueur2;
let nbLigne;
let nbColonne;
let nbPartie = 0;

initJoueur1();
initJoueur2();
scoreJoueur1 = 0;
scoreJoueur2 = 0;
setScoreJoueur1();
setScoreJoueur2();



function rejouer() {
    resetChamp(); // appel de la methode plusieurs fois pour tout supprimer sinon il en reste pk ?
    
    //resetCellule();
    nbCellule = celluleTotal();
    tableau[0].addEventListener("click", ajoutElement);
    textVictoire.innerText = "";
    nbPartie++;
    jouerJoueur1 = true;
    jouerJoueur2 = false;
    resetClasse();
}

function resetChamp() {
    
    for (let i = 0; i < nbCellule; i++) {
        j1[i].textContent = "";
        j2[i].textContent = ""
    }
}
function resetClasse(){

    for (let i = 0; i < nbCellule; i++) {
        j1[i].className = "";
        j2[i].className = ""
    }
}



function start() {
    nbCellule = celluleTotal();
    tableau[0].addEventListener("click", ajoutElement);
    //textVictoire.innerText = "Tour de " + nomJoueur1;


}

function initJoueur1() {
    nomJoueur1 = window.prompt("Nom joueur1");
    document.getElementById("nomJoueur1").textContent = nomJoueur1;
}

function initJoueur2() {
    nomJoueur2 = window.prompt("Nom joueur2");
    document.getElementById("nomJoueur2").textContent = nomJoueur2;
}

function setScoreJoueur1() {
    document.getElementById("pointJoueur1").textContent = scoreJoueur1;
}

function setScoreJoueur2() {
    document.getElementById("pointJoueur2").textContent = scoreJoueur2;
}

function celluleTotal() {


    nbLigne = tableau[0].rows.length;
    nbColonne = tableau[0].rows[0].cells.length;
    return nbLigne * nbColonne;

}


function isEmpty(e) {

    if (e.className === "") {
        return true;
    }
    return false;
}

function victoireLigne(classe){

	for(let i =0;i<nbLigne;i++){
		let trouve =0;
    	for(let j = 0 ;j<nbColonne;j++){
        	if (tableau[0].rows[i].cells[j].className === classe){
            	trouve++;
            	if(trouve == nbLigne){
        			return true;
        		}
        		
        	}
        	
    	}
    	
	}
	return false;
}

function victoireColonne(classe){

	for(let i =0;i<nbLigne;i++){
		let trouve =0;
    	for(let j = 0 ;j<nbColonne;j++){
        	if (tableau[0].rows[j].cells[i].className === classe){
            	trouve++;
            	if(trouve == nbColonne){
        			return true;
        		}
        		
        	}
        	
    	}
    	
	}
	return false;
}

function victoireDiago1(classe){

	let trouve =0;
	for(let i =0;i<nbLigne;i++){
    	if(tableau[0].rows[i].cells[i].className == classe){
    		trouve++;
    		if(trouve == nbLigne){
    			return true;
    		}
    	}
	}
	return false;
}

function victoireDiago2(classe){

	let j = nbColonne - 1;
	let trouve = 0;
	for(let i = 0 ;i< nbColonne;i++){
		if(tableau[0].rows[i].cells[j].className == classe){
    		trouve++;
    		if(trouve == nbLigne){
    			return true;
    		}
    	}
    	j--;
	}
	
	return false;
}



function conditionDeVictoire(classe) {
    
    return (victoireColonne(classe) || 
    	victoireLigne(classe) 		|| 
    	victoireDiago1(classe) 		|| 
    	victoireDiago2(classe))
}
  

function rechercheGagnant(classe) {
    if (conditionDeVictoire(classe)) {
        return true;

    }
    return false;
}
function matchNul() {
    for(let i=0;i<nbLigne;i++){
        for(let j=0;j<nbColonne;j++){
            if(tableau[0].rows[i].cells[j].className === ""){
                return true;
            }
        }
    }
    return false;
}


function ajoutElement(event) {

    let cellule = event.target;

    if (jouerJoueur1 === true) {
        if(!matchNul()){
            textVictoire.innerText = "Match nul"
        }
        if (isEmpty(cellule)) {
            cellule.className = classeJoueur1;
            cellule.textContent = symbolejoueur1;
            if (rechercheGagnant(classeJoueur1)) {
                if(nbPartie %2 === 0){
                    textVictoire.innerText = "Victoire de " + nomJoueur1;
                    scoreJoueur1++;
                } else {
                    textVictoire.innerText = "Victoire de " + nomJoueur2;
                    scoreJoueur2++;
                }


                setScoreJoueur1();
                setScoreJoueur2();
                tableau[0].removeEventListener("click", ajoutElement);
            }
            jouerJoueur1 = false;
            jouerJoueur2 = true;

        }

    }
    if (jouerJoueur2 === true) {
        if(!matchNul()){
            textVictoire.innerText = "Match nul"
        }
        if (isEmpty(cellule)) {
            cellule.className = classeJoueur2;
            cellule.textContent = symboleJoueur2;
            if (rechercheGagnant(classeJoueur2)) {
                if(nbPartie %2 === 0){
                    textVictoire.innerText = "Victoire de " + nomJoueur2;
                    scoreJoueur2++;
                } else {
                    textVictoire.innerText = "Victoire de " + nomJoueur1;
                    scoreJoueur1++;
                }


                setScoreJoueur2();
                setScoreJoueur1();

                tableau[0].removeEventListener("click", ajoutElement);
            }
            jouerJoueur2 = false;
            jouerJoueur1 = true;

        }

    }


}


start();


