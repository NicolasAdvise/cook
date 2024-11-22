import { VueThemes, ThemeWildcard } from "@banquette/vue-typescript";
import { VariantWildcard } from "@banquette/vue-typescript";

VueThemes.Define('bt-popover-confirm', {
    [ThemeWildcard]: [
        {
            match: VariantWildcard,
            props: {
                message: 'Êtes-vous sûr ?',
                confirmText: 'Oui',
                cancelText: 'Non, annuler'
            }
        }
    ]
});
