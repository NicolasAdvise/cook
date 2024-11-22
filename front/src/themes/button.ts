import { VueThemes, ThemeWildcard } from "@banquette/vue-typescript";

VueThemes.Define('bt-button', {
    [ThemeWildcard]: [
        {
            match: ['icon', 'square'],
            cssCode: `
                .inner {
                    padding-inline: 0.6em;
                }
            `
        },
        {
            match: 'admin',
            cssVars: {
                backgroundColor: 'var(--color-admin-500)',
                backgroundHoverColor: 'var(--color-admin-400)',
                backgroundFocusColor: 'var(--color-admin-400)',
                backgroundActiveColor: 'var(--color-admin-550)'
            },
        },
        {
            match: 'ireseau',
            cssVars: {
                backgroundColor: 'var(--color-ireseau-500)',
                backgroundHoverColor: 'var(--color-ireseau-400)',
                backgroundFocusColor: 'var(--color-ireseau-400)',
                backgroundActiveColor: 'var(--color-ireseau-550)'
            },
        },
        {
            match: 'portal',
            cssVars: {
                backgroundColor: 'var(--color-portal-500)',
                backgroundHoverColor: 'var(--color-portal-400)',
                backgroundFocusColor: 'var(--color-portal-400)',
                backgroundActiveColor: 'var(--color-portal-550)'
            },
        },
        {
            match: 'sso',
            cssVars: {
                backgroundColor: 'var(--color-sso-500)',
                backgroundHoverColor: 'var(--color-sso-400)',
                backgroundFocusColor: 'var(--color-sso-400)',
                backgroundActiveColor: 'var(--color-sso-550)'
            },
        },
    ]
});
