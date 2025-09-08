const routes = [
  {
    path: '/',
    component: () => import('src/layouts/MainLayout.vue'),
    children: [
      { 
        path: '', 
        component: () => import('pages/ListsPage.vue') 
      },
      {
        path: 'listas/:id',
        component: () => import('pages/ListsItemsPage.vue'),
        props: true
      }
    ],
  },

  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
]

export default routes
