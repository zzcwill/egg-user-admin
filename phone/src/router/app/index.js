const demo = () => import('@/views/test/Demo.vue')
const appRoute = [
  {
    path: '*',
    redirect: '/404'
  },
	{
    path: '/404',
    redirect: '/userLogin'
  },
  {
    path: '/demo',
    name: 'demo',
    component: demo
	}
]

export default appRoute
