<?php

namespace TestMemory\Models;
// Les modèles correspondent aux tables dans la base de données.

use PDO;

class Scores 
{
    /**
     * Définition de la connexion à la base de donnée MySQL
     * @return Object $connection 
     */
    private function connection() {
        // On aura au préalable créé une base de données via l'interface phpMyAdmin

        // Variables de connexion à la base de données
        $server = "localhost";
        $username = "root";
        $password = "";
        $dbname = "memory";

        // On se connecte avec PDO.
        // PDO est une API qui permet de nous connecter à MySQL et de manipuler les données.
        // Pour se connecter, on instancie la classe PDO en passant les variables de connexion dans son constructeur.
            $connection = new PDO("mysql:host=$server;dbname=memory", $username, $password);

            // On définit le mode d'erreur de PDO : PDO::ATTR_ERRMODE sert à créer un rapport d'erreur, et avec PDO::ERRMODE_EXCEPTION, on lui précise qu'on souhaite qu'il émette une exception.
            $connection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            echo 'Connexion réussie <br />';

            return $connection;
    }


    /**
     * Affichage des scores
     * @return array $row
     */
    public function displayScores() {
        $connection = $this->connection();

        // Requête de récupération des scores. Pour le détail de l'explication de la requête, voir le fichier db.sql.
        $sql = 'SELECT * FROM scores ORDER BY id DESC LIMIT 5';
        // TODO afficher les meilleurs scores  

        // On affiche les derniers résultats enregistrés dans la base.
        $results = $connection->query($sql);
        // PDO::FETCH_ASSOC permet d'éviter d'avoir à boucler sur le tableau des résultats.
        while($row = $results->fetch(PDO::FETCH_ASSOC)) {

            return $row;
        }
        // On clôt la connexion à la fin du script
        $connection = null;
    }

    // TODO : ajouter une méthode d'ajout d'un score


}