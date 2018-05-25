import home from '@/components/home/main/main'
import engagement from '@/components/home/engagement/engagement'
import team from '@/components/home/team/team'
import achievement from '@/components/home/achievement/achievement'
import dashboard from '@/components/dashboard/dashboard'
import environment from '@/components/environment/environment'
import timeline from '@/components/timeline/timeline'
import tickets from '@/components/tickets/tickets'
import products from '@/components/products/products'
import security from '@/components/security/rss'
import lifecycle from '@/components/lifecycle/lifecycle'
import links from '@/components/links/links'
import resource from '@/components/resource/resource'

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
    path: '/achievement',
    component: achievement,
    name: 'achievement'
  }, {
    path: '/dashboard',
    component: dashboard,
    name: 'dashboard'
  }, {
    path: '/environment',
    component: environment,
    name: 'environment'
  }, {
    path: '/timeline',
    component: timeline,
    name: 'timeline'
  }, {
    path: '/tickets',
    component: tickets,
    name: 'tickets'
  }, {
    path: '/products',
    component: products,
    name: 'products'
  }, {
    path: '/security',
    component: security
  }, {
    path: '/lifecycle',
    component: lifecycle
  }, {
    path: '/links',
    component: links
  }, {
    path: '/resource',
    component: resource
  },
]
