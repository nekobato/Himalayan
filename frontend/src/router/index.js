import Vue from 'vue'
import Router from 'vue-router'
import Auth from '@/components/Auth'
import Books from '@/components/Books'
import BookViewer from '@/components/BookViewer'
import Admin from '@/components/Admin'
import AdminIndex from '@/components/AdminIndex'
import AdminBooks from '@/components/AdminBooks'
import AdminAuhors from '@/components/AdminAuhors'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'Auth',
      component: Auth
    },
    {
      path: '/books',
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
      component: Admin,
      children: [{
        path: '',
        name: 'AdminIndex',
        component: AdminIndex
      },
      {
        path: 'books',
        name: 'AdminBooks',
        component: AdminBooks
      },
      {
        path: 'authors',
        name: 'AdminAuhors',
        component: AdminAuhors
      }]
    }
  ]
})

export default router
