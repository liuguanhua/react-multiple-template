const routes: TRouteItemGroupProps = [
  {
    path: '/',
    component: 'home',
    title: 'Home',
  },
  {
    path: '/about',
    component: 'about',
    title: 'About',
  },
  {
    path: '/hello',
    component: 'hello',
    title: 'Hello',
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
