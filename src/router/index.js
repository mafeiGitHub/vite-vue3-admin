import { createMemoryHistory, createRouter } from 'vue-router'


import Login from '@/views/login/index.vue';

const routes = [
  // { path: '/', component: HomeView },
  // { path: '/login', component: Login },
]

const router = createRouter({
  history: createMemoryHistory(),
  routes,
})