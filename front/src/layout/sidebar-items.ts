import { SidebarItemInterface } from './sidebar-item.interface';

export let SidebarItems: SidebarItemInterface[] = [
    {
        title: 'Home',
        children: [
            {
                title: 'Home',
                route: 'home',
            },
        ]
    }
];