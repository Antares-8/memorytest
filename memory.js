// Le fichier js contient toute la logique du jeu : c'est grâce aux fonctions suivantes que nous allons pouvoir jouer !

// Commençons par définir les constantes et les variables dont nous aurons besoin.
const nbCards = 28; // Nombre de cartes sur le plateau de jeu.
const nbPairs = 14; // Nombre de paires à trouver pour gagner la partie.
const nbCardsMax = 18; // Nombre maximal de cartes que nous avons AVANT de charger le plateau de jeu.
const face = "verso"; // La carte est soit recto, soit verso. Au départ du jeu, elle est face cachée, donc verso.
const displayTime = 750; // Temps d'affichage des cartes une fois retournées et en cas d'échec à trouver une paire.
var nbPairsFound = 0; // Nombre de paires trouvées à l'instant T par le joueur.
var boardGame = []; // Tableau des cartes présentes sur le plateau de jeu.
var pick = []; // Cartes retournées par le joueur.
var durationGame = 2; // Temps de jeu en minutes.
var scores = []; // Tableau des scores. Le score étant lié au temps que dure une partie, on va utiliser l'objet Date pour avoir le début et la fin du jeu.

// J'ai repris l'image d'exemple où le jeu comporte 28 cartes donc 14 paires. Et on a 18 cartes donc potentiellement 36 paires, mais ça fait peut-être beaucoup pour retrouver les paires.
// Il faut donc choisir 14 cartes parmi les 18.
// On peut donc mélanger les 18 cartes pour avoir une distribution aléatoire, et choisir les 14 premières.
// On double ensuite ces 14 cartes pour avoir des paires et on re-mélange.
function createBoardGame() {
    let cardsList = [];
    let keptCards = [];
    let pairs = [];

    for(let i = 0; i < nbCardsMax; i++) {
        let cardNumber = i + 1; // On incrémente de 1 le numéro de la carte car on itère à partir de 0 (alors que nous comptons à partir de 1...)
        cardsList.push(cardNumber); // on ajoute la carte dans le tableau : toutes nos cartes sont dans ce tableau.
    }

    // On mélange ce tableau avec notre fonction de mélange.
    cardsList = shuffle(cardsList);

    // On ne prend que les 14 premières cartes.
    keptCards = cardsList.slice(0, 14);

    // On fait un double de ces 14 cartes.
    pairs = keptCards.concat(keptCards);

    // On mélange le tableau des paires pour avoir un tirage aléatoire.
    pairs = shuffle(pairs);
    return pairs;
}

// Il faut que les cartes soient mélangées sous peine d'avoir toujours le même tableau de jeu...
// J'avoue, je me suis fait aider par un pro de l'algo, ce que je ne suis pas...
function shuffle(array) { 
    var element = array.length, temp, i;
    // Tant qu'il y a des éléments dans le tableau
    while (element) {
        //floor arrondit au plus grand entier inférieur au nombre entre parenthèses. Random donne un nombre aléatoire parmi les éléments restants.
        i = Math.floor(Math.random() * element--); 
        // on échange avec l'élément courant.
        temp = array[element];
        array[element] = array[i];
        array[i] = temp;
    }
    return array;
}

// Pour créer le jeu, on peut utiliser une fonction anonyme et jquery : 
$(function() {
    boardGame = createBoardGame();
    // Remplissage du jeu avec les cartes choisies aléatoirement que l'on envoie dans la section principale du HTML.
    // A chaque rechargement de la page, les images sont différentes ;-)
    for(let i = 0; i < boardGame.length; i++) {
        let image = "recto" + boardGame[i];
        let card = $("<fruit>", {
            "id": i,
            "class": "card ".concat(face, " ", image)
        })
        // On lance les actions de jeu au click sur la carte
        card.on("click", action);
        // Ajout de la carte dans le HTML
        card.appendTo("section#main");
    };
    // Affichage et lancement du timer
    timer();
    startTimer();
});

// Nous avons besoin d'un compteur de temps avec barre de progression pour déterminer la fin de la partie et donc le gain ou la perte de celle-ci.
function timer() {
    // Ici nous voulons simplement afficher le timer avec le temps à 0, la valeur maximale étant 100.
    let progress = $("<progress>", {
        "class": "progressBar",
        max: 100,
        value: 0,
    });
    progress.appendTo("section#time");
}

// Incrémentation de ce timer = augmenter une variable d'une valeur donnée, ici 1.
var addTime = (function() {
    let count = 0;
    return function() { count += 1; return count; };
})();


function startTimer() {
    scores.push(new Date());
    let milliseconds = durationGame * 60 * 1000; // Durée de la partie en millisecondes, nécessaire pour utiliser Interval.
    // Définition de l'arrêt du jeu
    setTimeout(function() {
        // Quand on dépasse la valeur maximale (100), le jeu s'arrête et la partie est perdue.
        $("section#time progress.progressBar").attr(
            "value", 100);
        //Du coup, on arrête la progression de la barre.
        clearInterval(game);
        alert("QUEL DOMMAAAAGE, c'est perdu...")
        console.log("score : ", scores);
    }, milliseconds)

    // Mise à jour de la barre de défilement tant que le timer n'est pas à 100.
    let game = setInterval(function() {
        $("section#time progress.progressBar").attr(
            "value", addTime);
    }, 1200) // 1200 est une valeur en millisecondes : on met à jour la progression de la barre toutes les secondes.
}

// On doit pouvoir retourner les cartes au clic sur l'une d'elle. La carte est identifiée par un id. 
// Le plateau est chargé avec les cartes côté verso, on change la classe de la carte pour afficher le recto.
function returnCard(id) {
    let element = $("fruit#" + id);
    if (element.hasClass("recto")) {
        element.removeClass("recto");
        element.addClass("verso");
    } else {
        element.removeClass("verso");
        element.addClass("recto");
    }
}

// Déroulé du jeu : liste des actions à effectuer en fonction des cartes piochées.
function action(event) {
    // On récupère l'id de la carte choisie, on l'ajoute au tableau de la pioche.
    let cardNumber = event.target.id;
    pick.push(cardNumber); 
    returnCard(cardNumber); // on affiche la carte en la retournant.

    // Il faut avoir les 2 cartes pour faire la comparaison des cartes.
    if (pick.length > 1) {
        if (sameCards()) {
            // Les cartes retournées sont identiques : on incrémente le nombre de paires trouvées.
            nbPairsFound++;
            // Si le nombre de paires trouvées est supérieur ou égal au nombre de paires existant sur le plateau, on a gagné !
            if (nbPairsFound >= nbPairs) {
                scores.push(new Date());
                console.log("score : ", scores);
                alert("BRAVOOOO, c'est gagné !");
            }
        } else {
            // Les cartes sont différentes, on les laisse affichées quelques secondes et on les retourne côté verso.
             setTimeout(returnCard, displayTime, pick[0]);
             setTimeout(returnCard, displayTime, pick[1]);
        };
        // On n'oublie pas de vider le tableau de la pioche pour le prochain tour !
        pick = [];
    }
}

// Une fois les 2 cartes retournées, on les compare et on renvoie un booléen puisqu'il n'y a que 2 résultats possibles ;-)
function sameCards() {
    // On ajoute les cartes piochées par le joueur dans le tableau pick[], qui contient au maximum 2 éléments. Ce sont les numéros des cartes.
    let id1 = pick[0];
    let id2 = pick[1];
    // Il faut rattacher le numéro des cartes au tableau des fruits (boardGame[]). 
    let fruit1 = boardGame[id1];
    let fruit2 = boardGame[id2];

    if (fruit1 == fruit2) {
        return true;
    } else {
        return false;
    }
}