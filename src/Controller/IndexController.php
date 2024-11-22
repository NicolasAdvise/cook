<?php
namespace App\Controller;

use Symfony\Component\HttpFoundation\Response;
use Webeak\Bundle\EssentialBundle\Annotation\Route;
use Webeak\Bundle\EssentialBundle\Controller\Controller;
use Webeak\Bundle\EssentialBundle\HttpFoundation\XssiSafeJsonResponse;
use Webeak\Bundle\EssentialBundle\JavascriptBridge;

class IndexController extends Controller
{
    #[Route('/', name: 'app_index')]
    public function index(): Response
    {
        return $this->render('index.html.twig');
    }
}
