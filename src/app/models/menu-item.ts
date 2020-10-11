export interface MenuItem {
    label: string;
    icon: string;
    href: string;
    routerLink: string;
    alwaysShow: boolean;
    onlyForLogged: boolean;
    onlyForAdmin: boolean;
}
