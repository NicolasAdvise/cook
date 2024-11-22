
type SidebarRouteItemInterface = {
    route: string;
    roles?: string[];
} & BaseItem;

type SidebarUrlItemInterface = {
    url: string;
    roles?: string[];
} & BaseItem;

type BaseItem = {
    title: string;
    children?: SidebarItemInterface[];
};

export type SidebarItemInterface = BaseItem | SidebarRouteItemInterface | SidebarUrlItemInterface;
