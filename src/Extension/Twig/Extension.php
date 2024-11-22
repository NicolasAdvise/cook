<?php
namespace App\Extension\Twig;

use Symfony\Component\HttpFoundation\RequestStack;
use Symfony\Component\HttpKernel\Bundle\Bundle;
use Symfony\Component\HttpKernel\KernelInterface;
use Twig\Extension\AbstractExtension;
use Twig\TwigFunction;
use Webeak\Bundle\EssentialBundle\Exception\UsageException;
use Webeak\Bundle\EssentialBundle\JavascriptBridge;
use Webeak\Bundle\EssentialBundle\ManifestLoader;
use Webeak\Component\Utils\ArrayUtils;

class Extension extends AbstractExtension
{
    private ?array $resolvedAssets = null;

    public function __construct(private readonly KernelInterface $kernel,
                                private readonly RequestStack $requestStack,
                                private readonly ManifestLoader $manifestLoader,
                                private readonly JavascriptBridge $javascriptBridge)
    {

    }

    /**
     * @inheritDoc
     */
    public function getFunctions(): array
    {
        return [
            new TwigFunction('vite_assets', [$this, 'getViteAssets'], ['is_safe' => ['html']]),
            new TwigFunction('dump_javascript_bridge', array($this, 'dumpJavascriptBridge'), ['is_safe' => ['html']]),
        ];
    }

    public function getViteAssets(string $type): string
    {
        if ($this->resolvedAssets === null) {
            $this->resolvedAssets = ['scripts' => '', 'styles' => ''];

            $manifestPath = $this->kernel->getProjectDir() . '/public/build/manifest.json';
            if (!file_exists($manifestPath)) {
                return '';
            }
            $manifest = $this->manifestLoader->load($manifestPath, $this->kernel->getEnvironment() !== 'dev');
            $scripts = [];
            foreach ($manifest->getScripts(['src/main.ts']) as $script) {
                $scripts[] = sprintf('<script type="module" src="%s"></script>', '/build/'.$script);
            }
            $this->resolvedAssets['scripts'] .= implode("\n", $scripts);

            $styles = [];
            foreach ($manifest->getStyles(['src/main.ts']) as $style) {
                $styles[] = sprintf('<link rel="stylesheet" media="screen"  href="%s"></link>', '/build/'.$style);
            }
            $this->resolvedAssets['styles'] .= implode("\n", $styles);
        }
        return ArrayUtils::getValue($this->resolvedAssets, $type, '');
    }

    /**
     * Returns data that should be sent to the client side.
     * You can populate these data using the "JavascriptBridge" service.
     *
     * @return string
     *
     * @throws
     */
    public function dumpJavascriptBridge(): string
    {
        $export = $this->javascriptBridge->export();
        if (array_key_exists('flashes', $export)) {
            throw new UsageException('The key "flashes" is reserved for Symfony flashes. Please use another name for your variable.');
        }
        $export['flashes'] = [];
        $request = $this->requestStack->getMainRequest();
        if ($request !== null) {
            $session = $request->getSession();
            if ($session->isStarted()) {
                $export['flashes'] = $session->getFlashBag()->all();
            }
        }
        $varName = ArrayUtils::getValue($_ENV, 'WB_ESSENTIAL_JS_BRIDGE_VAR_NAME', 'Symfony');
        return '<script type="text/javascript" id="wbsfb">(function(w){w.'.$varName.' = "' . base64_encode(json_encode($export)) . '"})(window);</script>';
    }
}
