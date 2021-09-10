export interface ManiMenuItemsChildren {
    title?: string;
    link?: string;
    icon?: string;
    value?: string;
}
export interface ManiMenuItems {
    title?: string;
    id?: string;
    budge?: string;
    budgeColor?: string;
    icon?: string;
    link?: string;
    children?: ManiMenuItemsChildren[];

}
export const MAIN_MENU_ITEM: ManiMenuItems[] = [
    {
        title: 'Home',
        icon: 'nav-icon fas fa-tachometer-alt',
        link: '/',
    },
    {
        title: 'Shop',
        link: '/products',
        children: [
            {
                title: 'Shop Category',
                link: '/products/categories'
            },
            {
                title: 'Product Details',
                link: '/products/products-details'
            },
            {
                title: 'Shopping Cart',
                link: '/products/cart'
            }
        ]
    },
    {
        title: 'Blog',
        children:[
            {
                title: 'Blog',
                link: '/blog'
            },
            {
                title: 'Blog Details',
                link: '/blog/details'
            }
        ]
    },
    {
        title: 'Pages',
        children: [
            {
                title: 'Login',
                link: '/login'
            },
            {
                title: 'Trackings',
                link: '/trackings'
            }
        ]
    },
    {
        title: 'Contact',
        link: '/contacts',
    }
];
