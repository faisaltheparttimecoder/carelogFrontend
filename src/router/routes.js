import dashboard from '@/components/dashboard/dashboard'
import tickets from '@/components/tickets/tickets'
import timeline from '@/components/timeline/timelinemain'
import security from '@/components/security/rssreader'
import product from '@/components/products/products'
import lifecycle from '@/components/lifecycle/lifecycle'
import links from '@/components/links/links'

export default [
  {
    path: '/',
    component: dashboard,
    name: 'home'
  }, {
    path: '/dashboard',
    component: dashboard,
    name: 'dashboard'
  }, {
    path: '/tickets',
    component: tickets,
    name: 'tickets'
  }, {
    path: '/timeline',
    component: timeline
  }, {
    path: '/security',
    component: security
  }, {
    path: '/products',
    component: product
  }, {
    path: '/lifecycle',
    component: lifecycle
  }, {
    path: '/links',
    component: links
  }
];
