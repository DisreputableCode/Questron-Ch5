const routes = [
  {
    path: '/',
    component: () => import('pages/Index.vue')
  },
  {
    path: '/main',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: 'audio', component: () => import('pages/Audio.vue') },
      { path: 'video', component: () => import('pages/Video.vue') },
      { path: 'power', component: () => import('pages/Power.vue') }
    ]
  },
  {
    path: '/:pathMatch(.*)*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
