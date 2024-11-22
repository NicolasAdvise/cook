import {ThemeWildcard, VueThemes} from "@banquette/vue-typescript";

VueThemes.Define('bt-alert', {
    [ThemeWildcard]: [
        {
            match: 'primary',
            props: {ttl: 3000, closable: true}
        },
        {
            match: 'secondary',
            props: {ttl: 3000, closable: true}
        },
        {
            match: 'warning',
            props: {ttl: 5000, closable: true}
        },
        {
            match: 'danger',
            props: {ttl: 8000, closable: true}
        },
        {
            match: 'success',
            props: {ttl: 3000, closable: true}
        },
        {
            match: 'invisible',
            cssVars: {
                backgroundColor: 'transparent',
                textColor: 'none'
            },
            cssCode: `& { padding: 0 }`
        },
        {
            match: 'infinite',
            props: {ttl: null}
        },
        {
            match: 'non-closable',
            props: {closable: false}
        }
    ]
});
