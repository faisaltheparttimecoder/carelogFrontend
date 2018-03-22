import tickets from '@/components/tickets/tickets'
import security from '@/components/security/rssreader'
import product from '@/components/products/products'
import lifecycle from '@/components/lifecycle/lifecycle'
import links from  '@/components/links/links'

export default [
  {
    path: '/tickets',
    component: tickets
  },{
    path: '/security',
    component: security
  },{
    path: '/products',
    component: product
  },{
    path: '/lifecycle',
    component: lifecycle
  },{
    path: '/links',
    component: links
  },
];
