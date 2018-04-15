import home from '@/components/main/main'
import engagement from '@/components/engagement/engagement'
import team from '@/components/team/team'
import dashboard from '@/components/dashboard/dashboard'
import tickets from '@/components/tickets/tickets'
import timeline from '@/components/timeline/timelinemain'
import environment from '@/components/environment/environment'
import security from '@/components/security/rssreader'
import product from '@/components/products/products'
import lifecycle from '@/components/lifecycle/lifecycle'
import links from '@/components/links/links'

export default [
  {
    path: '/',
    component: home,
    name: 'home'
  }, {
    path: '/engagement',
    component: engagement,
    name: 'engagement'
  }, {
    path: '/team',
    component: team,
    name: 'team'
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
    path: '/environment',
    component: environment
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
