const routes: TRouteItemGroupProps = [
  {
    path: '/',
    component: 'home',
    title: '路由一',
  },
  {
    path: '/about',
    component: 'about',
    title: '路由二',
  },
  {
    path: '/*',
    component: '404',
    component_from: 'common',
    title: '404',
    isHidden: true,
  },
]

export default routes
