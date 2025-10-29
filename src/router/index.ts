// router/index.js
import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';

const routes = [
  {
    path: '/',
    redirect: '/folder/Inicio'
  },
  {
    path: '/folder/:id',
    component: () => import ('../views/Home.vue'),
  },
  {
    path: '/gender',
    component: () => import ('../views/GenderPredictor.vue'),
  },
  {
    path: '/age',
    component: () => import ('../views/AgePredictor.vue'),
  },
  {
    path: '/universities',
    component: () => import ('../views/Universities.vue'),
  },
  {
    path: '/weather',
    component: () => import ('../views/Weather.vue'),
  },
  {
    path: '/pokemon',
    component: () => import ('../views/Pokemon.vue'),
  },
  {
    path: '/wordpress-news',
    component: () => import ('../views/WordpressNews.vue'),
  },
  {
    path: '/about',
    component: () => import ('../views/About.vue'),
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

export default router;