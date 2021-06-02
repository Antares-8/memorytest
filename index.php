<?php

// PSR-4
require_once __DIR__ . '/vendor/autoload.php';

use TestMemory\Controllers\MemoryController;

// On initialise la page
$init = new MemoryController;

// Définir quelles pages du jeu on affiche. Pour le moment on affiche le tableau de jeu.
$init->playing();

