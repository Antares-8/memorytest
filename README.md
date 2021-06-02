# memorytest

Ceci est une tentative de création d'un jeu de memory (retrouver les paires) selon les spécifiactions d'Oclock.

## Comment jouer ?

Le jeu est fonctionnel sur la branche master à partir du fichier index.html : il y a une barre de progression (2 minutes pour trouver toutes les paires), un message en cas de victoire ou d'échec. 
Le gros de cette partie du code se situe dans memory.js, fichier que je me suis efforcée de commenter.

Le préprocesseur Sass a été utilisé ainsi que la librairie jQuery. 

Et enfin, mon sens incroyable du design a permis d'arriver à un résultat que l'on peut sans hésiter qualifier d'abouti. <- _ceci était une phrase ironique_

## Et Côté back ?

Alors là ça se complique, je n'ai pas eu le temps de tout faire...
Sur la branche **BDD-connexion** se trouve la connexion à la base de donnée, comme son nom l'indique, et les requêtes créant la table, les champs et les données nécessaires à un affichage brut depuis le fichier index.php
Je me suis attachée à bien décrire la connexion à la base et le fichier SQL, comme demandé dans les spécifications.

Et il y a une dernière branche, **separateHTMLPHP**, sur laquelle j'ai commencé à transformer l'appli en utilisant de modèle MVC. 
Ce que j'ai fait : 
 - utiliser Composer pour installer les dépendances et la mise en place du point suivant
 - appliquer la norme PSR-4 : namespaces et autoloading
 - POO
 - architecture MVC
 
 Ce que je n'ai pas fait : 
 - câbler les fonctions JS avec le back
 - la fonction de sauvegarde des données dans le controller, ainsi qu'un formulaire pour entrer ses identifiants
 - les vues, faute de temps...
