import { ThemeWildcard, VueThemes } from "@banquette/vue-typescript";

VueThemes.Define('bt-tag', {
    [ThemeWildcard]: [
        {
            match: ['info', 'en-cours', 'primary', 'GET', 'sent', 'good'],
            cssVars: {
                borderColor: 'var(--bt-color-blue-500)',
                textColor: 'var(--bt-color-blue-500)',
                backgroundColor: 'var(--bt-color-blue-50)',
            }
        },
        {
            match: ['succes-partiel', 'warning', 'POST', 'PUT', 'failed-temporary', 'medium', 'bad'],
            cssVars: {
                borderColor: 'var(--bt-color-orange-500)',
                textColor: 'var(--bt-color-orange-500)',
                backgroundColor: 'var(--bt-color-orange-50)',
            }
        },
        {
            match: ['danger', 'error', 'echec', 'emergency', 'critical', 'alert', 'failed', 'DELETE', 'very-bad'],
            cssVars: {
                borderColor: 'var(--bt-color-red-500)',
                textColor: 'var(--bt-color-red-500)',
                backgroundColor: 'var(--bt-color-red-50)',
            }
        },
        {
            match: ['gray', 'tres-faible', 'faible', 'autre', 'queued', 'unknown'],
            cssVars: {
                borderColor: 'var(--bt-color-gray-200)',
                textColor: 'var(--bt-color-gray-650)',
                backgroundColor: 'var(--bt-color-gray-50)',
            }
        },
        {
            match: ['debug'],
            cssVars: {
                borderColor: 'var(--bt-color-gray-400)',
                textColor: 'var(--bt-color-gray-750)',
                backgroundColor: 'var(--bt-color-gray-150)',
            }
        },
        {
            match: ['success', 'succes', 'notice', 'opened', 'very-good'],
            cssVars: {
                borderColor: 'var(--bt-color-green-500)',
                textColor: 'var(--bt-color-green-750)',
                backgroundColor: 'var(--bt-color-green-100)',
            }
        },
        {
            match: ['ireseau', 'i-reseau'],
            cssVars: {
                borderColor: '#1a3d90',
                textColor: '#1a3d90',
                backgroundColor: '#89a1e5',
            }
        },
        {
            match: ['portal'],
            cssVars: {
                borderColor: '#08babe',
                textColor: '#08babe',
                backgroundColor: '#c5feff',
            }
        },
        {
            match: ['sso'],
            cssVars: {
                borderColor: '#3d4c5a',
                textColor: '#3d4c5a',
                backgroundColor: '#abb1bb',
            }
        },

        /**
         * Size
         */
        {
            match: 'xs',
            cssVars: {fontSize: '0.6rem'}
        },
        {
            match: 'sm',
            cssVars: {fontSize: '0.70rem'}
        },
        {
            match: 'md',
            cssVars: {fontSize: '1.0rem'}
        },
        {
            match: 'lg',
            cssVars: {fontSize: '1.25rem'}
        },
        {
            match: 'xl',
            cssVars: {fontSize: '1.5rem'}
        },
    ]
});
