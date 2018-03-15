import security from '@/components/security/rssReader'
import product from '@/components/products/products'
import lifecycle from '@/components/lifecycle/lifecycle'

export default [
  {
    path: '/security',
    component: security
  },{
    path: '/products',
    component: product
  },{
    path: '/lifecycle',
    component: lifecycle
  },
];
