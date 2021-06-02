-- Ce fichier contient des requêtes SQL qui servent à créer la talbe des scores et à y insérer des données.
-- Le SQL est un langage (Structured Query Langage) permet la communcation entre un logiciel ou une application web et le SGBD. Le Système de Gestion des Bases de Données sert à stocker les données de façon organisée. 
-- Le SQL sert à lire, écrire, modifier, supprimer les données. 

-- Par mesure de précaution, on commence par éliminer la table scores si jamais elle était déjà créée.
DROP TABLE IF EXISTS `scores`;

-- L'avantage du SQL, c'est qu'il est assez naturel et compréhensible. Il fonctionne avec des mot-clés, écrits en majuscule, qui sont assez parlants ;), des mots parlants, ça vous parle ?
-- La requête CREATE TABLE sert donc à créer une table.
-- A l'intérieur de cette table, on crée des champs en définissant certains critères comme leur type (INT, VARCHAR, DATETIME...), le fait de savoir si ce champ peut-être null ou non...
-- Le champ 'id' servira de clé primaire : c'est le champ qui identifie de manière unique l'enregistrement d'une table. Il s'incrément automatiquement et ne peut pas être null
CREATE TABLE `scores` (
  `id` int unsigned NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `beginning_date` datetime NOT NULL,
  `ending_date` datetime NOT NULL,
  `username` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- La requête INSERT INTO insère des données dans la table mentionnée.
-- Les données sont définies après le mot-clé VALUES.
-- Il n'est pas nécessaire de mentionner les champs, on ne remplit que les valeurs des champs, DANS LE BON ORDRE, c'est-à-dire dans l'ordre dans lequel les champs ont été créés.
-- Ici on crée plusieurs enregistrements en même temps
INSERT INTO `scores` VALUES (1,'2021-06-01 20:20:20','2021-06-01 20:21:49','Dr House'),
                            (2,'2021-06-01 11:27:08','2020-10-17 11:27:35','Chewbacca'),
                            (3,'2021-06-01 16:55:56','2020-10-17 16:57:06','Ragnar Lodbrock'),
                            (4,'2021-06-01 23:03:41','2020-10-17 23:05:10','Steeve Rogers'),
                            (5,'2021-06-01 20:18:00','2020-10-17 20:19:00','Thanos'); -- toujours terminer les requêtes SQL avec un ;

-- Ce script peut être directement collé dans l'onglet SQL de phpMyAdmin, qui est une interface servant à manipuler les données. Les limites de l'outil étant qu'on n'est obligé de le faire "à la main", ce qui peut être fastidieux. 

-- J'en profite pour détailler la requête de récupération des données présente dans le fichier index.php : 'SELECT * FROM scores ORDER BY id DESC LIMIT 5';
-- Là encore, les mots-clé sont assez clairs : SELECT sert à sélectionner les données, l'étoile dit qu'on sélectionne toutes les données.
-- FROM montre d'où viennent les données sélectionnées, en l'occurrence de la table 'scores'.
-- ORDER BY sert à ordonner les données : ici on les organise par id. 
-- Ce qui suit le ORDER BY définit comment on ordonne les données : DESC = en ordre décroissant, et LIMIT donne le nombre d'enregistrement qu'on souhaite afficher, ici 5.

