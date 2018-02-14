import Vue from 'vue'
import Router from 'vue-router'
import Auth from '@/components/Auth'
import Books from '@/components/Books'
import BookViewer from '@/components/BookViewer'
import Admin from '@/components/Admin'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/auth',
      name: 'Auth',
      component: Auth
    },
    {
      path: '/',
      name: 'Books',
      component: Books
    },
    {
      path: '/book/:uuid',
      name: 'BookViewer',
      component: BookViewer,
      props: true
    },
    {
      path: '/admin',
      name: 'Admin',
      component: Admin
    }
  ]
})

export default router
