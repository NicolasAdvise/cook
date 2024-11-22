<?php

use App\Kernel;

require_once dirname(__DIR__).'/vendor/autoload_runtime.php';

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Credentials: true");
    header("Access-Control-Allow-Headers: content-type");
    exit(0);
}

return function (array $context) {


    return new Kernel($context['APP_ENV'], (bool) $context['APP_DEBUG']);
};

