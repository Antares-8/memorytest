<?php 

namespace TestMemory\Controllers;

use TestMemory\Models\Scores;

class MemoryController
{
    public function getScores() {
        $scores = new Scores();
        $lastScores = $scores->displayScores();

        // TODO Gestion du pseudo

        // Affichage des scores
        if ($lastScores) {
            // TODO boucler sur scores et afficher
        }

        require(__DIR__ . '/../Views/Main.php');
    }

    public function playing() {

        
        require(__DIR__ . '/../Views/Main.php');
    }

}


