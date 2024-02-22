import { createRouter, createWebHistory } from 'vue-router';
import PostList from './components/PostList.vue';
// import PostDetails from './components/PostDetails.vue';

const routes = [
  { path: '/', component: PostList },
  // { path: '/post/:id', component: PostDetails },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
