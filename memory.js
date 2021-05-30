// Le fichier js contient toute la logique du jeu : c'est grâce aux fonctions suivantes que nous allons pouvoir jouer !

// Commençons par définir les constantes et les variables dont nous aurons besoin

const nbCards = 28;
// var nbDouble = 14;
const nbCardsMax = 18;

// J'ai repris l'image d'exemple où le jeu comporte 28 cartes donc 14 paires. Et on a 18 cartes donc potentiellement 36 paires, mais ça fait peut-être beaucoup pour retrouver les paires.
// Donc il faut choisir 14 cartes parmis les 18.
// On peut donc mélanger les 18 cartes pour avoir une distribution aléatoire, et choisir les 14 premières.
// On double ensuite ces 14 cartes pour avoir des paires et on remélange
function createBoardGame() {
    let cardsList = [];
    let keptCards = [];
    let pairs = [];

    for(let i = 0; i < nbCardsMax; i++) {
        let cardNumber = i + 1; // On incrémente de 1 le numéro de la carte car on itère à partir de 0 (alors que nous comptons à partir de 1...)
        cardsList.push(cardNumber); // on ajoute la carte dans le tableau : toutes nos cartes sont dans ce tableau
    }

    // On mélange ce tableau avec notre fonction de mélange
    cardsList = shuffle(cardsList);

    // On ne prend que les 14 premières cartes
    keptCards = cardsList.slice(0, 14);

    // On fait un double de ces 14 cartes
    pairs = keptCards.concat(keptCards);

    // On mélange le tableau des paires pour avoir un tirage aléatoire
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
        // on échange avec l'élément courant
        temp = array[element];
        array[element] = array[i];
        array[i] = temp;
    }

    return array;
}

// Pour créer le jeu, on peut utiliser une fonction anonyme  et jquery : 
$(function() {
    let boardGame = createBoardGame();
    // Remplissage du jeu avec les cartes choisies aléatoirement que l'on envoie dans la section principale du html.
    // A chaque rechargement de la page, les images sont différentes ;-)
    for(let i = 0; i < boardGame.length; i++) {
        $("<fruit>", {
            "id": "image" + (boardGame[i]),
            "class": "card"
        }).appendTo("section#main")
    };
});