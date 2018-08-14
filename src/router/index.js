import Vue from "vue";
import Router from "vue-router";
import Auth from "@/pages/auth";
import Books from "@/pages/books";
import Viewer from "@/pages/viewer";
import Admin from "@/pages/admin";
import AdminIndex from "@/pages/admin";
import AdminBooks from "@/pages/admin/books";
import AdminAuhors from "@/pages/admin/auhors";

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: "/",
      name: "Auth",
      component: Auth
    },
    {
      path: "/books",
      name: "Books",
      component: Books
    },
    {
      path: "/book/:uuid",
      name: "Viewer",
      component: Viewer,
      props: true
    },
    {
      path: "/admin",
      name: "Admin",
      component: Admin,
      children: [
        {
          path: "",
          name: "AdminIndex",
          component: AdminIndex
        },
        {
          path: "books",
          name: "AdminBooks",
          component: AdminBooks
        },
        {
          path: "authors",
          name: "AdminAuhors",
          component: AdminAuhors
        }
      ]
    }
  ]
});

export default router;
