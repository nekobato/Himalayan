import Vue from 'vue'
import Router from 'vue-router'
import Books from '@/components/Books'
import BookViewer from '@/components/BookViewer'
import Admin from '@/components/Admin'

Vue.use(Router)

export default new Router({
  routes: [
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
