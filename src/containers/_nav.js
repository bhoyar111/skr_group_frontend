import React from 'react';
import CIcon from '@coreui/icons-react';

    const _nav = [
    {
        _tag: 'CSidebarNavItem',
        name: 'Dashboard',
        to: '/dashboard',
        icon: <CIcon name="cil-speedometer" customClasses="c-sidebar-nav-icon"/>,
        badge: {
        color: 'info',
        text: 'NEW',
        }
    },

    // For General setting Sidebar
    // {
    //     _tag: 'CSidebarNavDropdown',
    //     name: 'General Setting',
    //     route: '',
    //     icon: 'cil-chart-pie',
    //     _children: [
    //         {
    //             _tag: 'CSidebarNavItem',
    //             name: 'Profile',
    //             to: `/profile`,
    //         },
    //         {
    //             _tag: 'CSidebarNavItem',
    //             name: 'Change password',
    //             to: '/changepassword',
    //         },
    //     ],
    // },

    // For System setting Sidebar
    {
        _tag: 'CSidebarNavDropdown',
        name: 'System Setting',
        route: '/auserlisting',
        icon: 'cil-star',
        _children: [
            {
                _tag: 'CSidebarNavItem',
                name: 'User',
                to: '/users',
            },
            {
              _tag: 'CSidebarNavItem',
              name: 'Role',
              to: '/roles',
          },
        ],
    },

    // For Farmer
    {
      _tag: 'CSidebarNavItem',
      name: 'Farmer',
      to: '/farmers',
      icon: 'cil-chart-pie',
      badge: {
      color: 'info',
      }
    },

    // For Crops
    {
        _tag: 'CSidebarNavDropdown',
        name: 'Crops',
        route: '/bscroplisting',
        icon: 'cil-puzzle',
        _children: [
            {
                _tag: 'CSidebarNavItem',
                name: 'Crop Type',
                to: '/crops',
            },
            {
                _tag: 'CSidebarNavItem',
                name: 'Crop',
                to: '/sub_crops',
            }
        ],
    },

    // For Our Products
    {
      _tag: 'CSidebarNavItem',
      name: 'Our Products',
      to: '/product_categories',
      icon: 'cil-cursor',
      badge: {
      color: 'info',
      }
    },

    // For Dealer
    {
      _tag: 'CSidebarNavItem',
      name: 'Locate Dealer',
      to: '/dealers',
      icon: 'cil-calculator',
      badge: {
      color: 'info',
      }
    },

    // For Video
    {
      _tag: 'CSidebarNavItem',
      name: 'Videos',
      to: '/videos',
      icon: 'cil-cursor',
      badge: {
      color: 'info',
      }
    },

     // For Ask The Expert
     {
      _tag: 'CSidebarNavItem',
      name: 'Ask The Expert',
      to: '/asktheexperts',
      icon: 'cil-chart-pie',
      badge: {
      color: 'info',
      }
    },

    // For Banner
    {
      _tag: 'CSidebarNavItem',
      name: 'Banners',
      to: '/banners',
      icon: 'cil-calculator',
      badge: {
      color: 'info',
      }
    },

     // For All Master
     {
        _tag: 'CSidebarNavDropdown',
        name: 'All Master',
        route: '',
        icon: 'cil-ban',
        _children: [

            {
              _tag: 'CSidebarNavItem',
              name: 'Country',
              to: '/countries',
            },
            {
                _tag: 'CSidebarNavItem',
                name: 'State',
                to: '/states',
            },
            {
              _tag: 'CSidebarNavItem',
              name: 'City',
              to: '/cities',
            },

        ],
    },

    // {
    //     _tag: 'CSidebarNavItem',
    //     name: 'Charts',
    //     to: '/charts',
    //     icon: 'cil-chart-pie'
    // },
    // {
    //     _tag: 'CSidebarNavDropdown',
    //     name: 'Icons',
    //     route: '/icons',
    //     icon: 'cil-star',
    //     _children: [
    //     {
    //         _tag: 'CSidebarNavItem',
    //         name: 'CoreUI Free',
    //         to: '/icons/coreui-icons',
    //         badge: {
    //         color: 'success',
    //         text: 'NEW',
    //         },
    //     },
    //     {
    //         _tag: 'CSidebarNavItem',
    //         name: 'CoreUI Flags',
    //         to: '/icons/flags',
    //     },
    //     {
    //         _tag: 'CSidebarNavItem',
    //         name: 'CoreUI Brands',
    //         to: '/icons/brands',
    //     },
    //     ],
    // },
    // {
    //     _tag: 'CSidebarNavDropdown',
    //     name: 'Notifications',
    //     route: '/notifications',
    //     icon: 'cil-bell',
    //     _children: [
    //     {
    //         _tag: 'CSidebarNavItem',
    //         name: 'Alerts',
    //         to: '/notifications/alerts',
    //     },
    //     {
    //         _tag: 'CSidebarNavItem',
    //         name: 'Badges',
    //         to: '/notifications/badges',
    //     },
    //     {
    //         _tag: 'CSidebarNavItem',
    //         name: 'Modal',
    //         to: '/notifications/modals',
    //     },
    //     {
    //         _tag: 'CSidebarNavItem',
    //         name: 'Toaster',
    //         to: '/notifications/toaster'
    //     }
    //     ]
    // },
    // {
    //     _tag: 'CSidebarNavItem',
    //     name: 'Widgets',
    //     to: '/widgets',
    //     icon: 'cil-calculator',
    //     badge: {
    //     color: 'info',
    //     text: 'NEW',
    //     },
    // },
    // {
    //     _tag: 'CSidebarNavDivider'
    // },
    // {
    //     _tag: 'CSidebarNavTitle',
    //     _children: ['Extras'],
    // },
    // {
    //     _tag: 'CSidebarNavDropdown',
    //     name: 'Pages',
    //     route: '/pages',
    //     icon: 'cil-star',
    //     _children: [
    //     {
    //         _tag: 'CSidebarNavItem',
    //         name: 'Login',
    //         to: '/login',
    //     },
    //     {
    //         _tag: 'CSidebarNavItem',
    //         name: 'Register',
    //         to: '/register',
    //     },
    //     {
    //         _tag: 'CSidebarNavItem',
    //         name: 'Error 404',
    //         to: '/404',
    //     },
    //     {
    //         _tag: 'CSidebarNavItem',
    //         name: 'Error 500',
    //         to: '/500',
    //     },
    //     ],
    // },
    // {
    //     _tag: 'CSidebarNavItem',
    //     name: 'Disabled',
    //     icon: 'cil-ban',
    //     badge: {
    //     color: 'secondary',
    //     text: 'NEW',
    //     },
    //     addLinkClass: 'c-disabled',
    //     'disabled': true
    // },
    // {
    //     _tag: 'CSidebarNavDivider',
    //     className: 'm-2'
    // },
    // {
    //     _tag: 'CSidebarNavTitle',
    //     _children: ['Labels']
    // },
    // {
    //     _tag: 'CSidebarNavItem',
    //     name: 'Label danger',
    //     to: '',
    //     icon: {
    //     name: 'cil-star',
    //     className: 'text-danger'
    //     },
    //     label: true
    // },
    // {
    //     _tag: 'CSidebarNavItem',
    //     name: 'Label info',
    //     to: '',
    //     icon: {
    //     name: 'cil-star',
    //     className: 'text-info'
    //     },
    //     label: true
    // },
    // {
    //     _tag: 'CSidebarNavItem',
    //     name: 'Label warning',
    //     to: '',
    //     icon: {
    //     name: 'cil-star',
    //     className: 'text-warning'
    //     },
    //     label: true
    // },
    // {
    //     _tag: 'CSidebarNavDivider',
    //     className: 'm-2'
    // }
]
// }

export default _nav
