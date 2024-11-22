import { VueThemes, ThemeWildcard } from "@banquette/vue-typescript";
import { VariantWildcard } from "@banquette/vue-typescript";

VueThemes.Define('bt-popover', {
    [ThemeWildcard]: [
        {
            match: VariantWildcard,
            props: {
                showDelay: 0,
                hideDelay: 0
            }
        }
    ]
});
