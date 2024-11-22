
export const application = {
    Admin: 'admin',
    Portal: 'portal',
    IReseau: 'ireseau',
    Sso: 'sso'
} as const;

export type Application = typeof application[keyof typeof application];
