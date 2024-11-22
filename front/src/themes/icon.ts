import { VueThemes, ThemeWildcard } from "@banquette/vue-typescript";
import { VariantWildcard } from "@banquette/vue-typescript";

VueThemes.Define('bt-icon', {
    [ThemeWildcard]: [
        {
            match: VariantWildcard,
            props: {
                set: 'material'
            }
        },
        {
            match: 'xxs',
            props: {
                width: '.625em',
                height: '.625em',
            }
        },
        {
            match: 'xs',
            props: {
                width: '.75em',
                height: '.75em',
            }
        },
        {
            match: 'sm',
            props: {
                width: '.875em',
                height: '.875em',
            }
        },
        {
            match: 'md',
            props: {
                width: '1.125em',
                height: '1.125em',
            }
        },
        {
            match: 'lg',
            props: {
                width: '1.25em',
                height: '1.25em',
            }
        },
        {
            match: ['xl', {parent: {name: 'bt-alert', variant: 'icon-xl'}}],
            props: {
                width: '1.375em',
                height: '1.375em',
            }
        },
    ],
});
