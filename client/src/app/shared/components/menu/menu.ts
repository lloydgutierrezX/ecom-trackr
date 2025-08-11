export const MENU_ITEMS = [
  {
    label: 'Dashboard',
    icon: 'circle-gauge',
    route: '/dashboard'
  },
  {
    label: 'Transactions',
    icon: 'hand-coins',
    route: '/transactions'
  },
  {
    label: 'Payments',
    icon: 'banknote-arrow-down',
    route: '/payments'
  },
  {
    label: 'Management',
    icon: 'settings',
    children: [
      {
        label: 'Categories',
        icon: 'blocks',
        route: 'management/categories'
      },
      {
        label: 'Client',
        icon: 'user-cog',
        route: 'management/clients'
      },
      {
        label: 'Items',
        icon: 'box',
        route: 'management/items'
      }
    ]
  }
]