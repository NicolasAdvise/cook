import { ThemeWildcard, VueThemes } from "@banquette/vue-typescript";

VueThemes.Define('bt-form-select', {
    [ThemeWildcard]: [
        {
            match: '*',
            props: {
                i18n: {
                    empty           : 'Aucun élément disponible.',
                    noResults       : 'Aucun résultat n\'a été trouvé.<br/>Essayez de modifier votre recherche.',
                    searchMinLength : 'La recherche doit contenir au minimum %minLength% caractères.',
                },
            }
        }
    ]
});
