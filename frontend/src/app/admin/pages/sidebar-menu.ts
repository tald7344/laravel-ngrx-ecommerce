export interface SidebarMenuItemsChildren {
    title?: string;
    link?: string;
    icon?: string;
    value?: string;
}
export interface SidebarMenuItems {
    title?: string;
    id?: string;
    budge?: string;
    budgeColor?: string;
    icon?: string;
    link?: string;
    children?: SidebarMenuItemsChildren[];

}
export const SIDEBAR_MENU_ITEM: SidebarMenuItems[] = [
    {
        title: 'Dashboard',
        icon: 'nav-icon fas fa-tachometer-alt',
        link: '/admin/dashboard',
    },
    {
        title: 'Admins',
        icon: 'nav-icon fa fa-users',
        children: [
            {
                title: 'Control Panel',
                link: '/admin/admins',
                icon: 'far fa-circle nav-icon',
            },
            {
                title: 'New Admin',
                link: '/admin/admins/add',
                icon: 'far fa-circle nav-icon',
            }
        ]
    },
    {
        title: 'Users',
        icon: 'nav-icon fa fa-users',
        children: [
            {
                title: 'Control Panel',
                link: '/admin/users',
                icon: 'far fa-circle nav-icon',
            },
            {
                title: 'New User',
                link: '/admin/users/add',
                icon: 'far fa-circle nav-icon',
            },
            {
                title: 'Company',
                link: '/admin/users/company',
                icon: 'far fa-circle nav-icon',
            },
        ]
    },
  {
    title: 'Countries',
    icon: 'nav-icon fas fa-flag',
    children: [
      {
        title: 'Control Panel',
        link: '/admin/countries',
        icon: 'far fa-circle nav-icon',
      },
      {
        title: 'New Country',
        link: '/admin/countries/add',
        icon: 'far fa-circle nav-icon',
      }
    ]
  },
  {
    title: 'Chat',
    icon: 'nav-icon fas fa-comments',
    link: '/admin/chat',
  },
    {
        title: 'Settings',
        icon: 'nav-icon fas fa-cogs',
        link: '/admin/settings',
    },
    {
        title: ' Widgets',
        icon: 'nav-icon fas fa-th',
        budge: 'New',
        budgeColor: 'danger',
        link: '/pages/widgets.html',
    },
    {
        title: 'Layout Options',
        icon: 'nav-icon fas fa-copy',
        budge: '6',
        budgeColor: 'info',
        children: [
            {
                title: 'Top Navigation',
                link: 'index.html',
                icon: 'far fa-circle nav-icon',
            },
            {
                title: 'Boxed',
                link: 'index2.html',
                icon: 'far fa-circle nav-icon',
            },
            {
                title: 'Fixed Sidebar',
                link: 'index3.html',
                icon: 'far fa-circle nav-icon',
            },
            {
                title: 'Fixed Navbar',
                link: 'index3.html',
                icon: 'far fa-circle nav-icon',
            },
            {
                title: 'Fixed Footer',
                link: 'index3.html',
                icon: 'far fa-circle nav-icon',
            },
            {
                title: 'Collapsed Sidebar',
                link: 'index3.html',
                icon: 'far fa-circle nav-icon',
            },
        ]
    },

];
