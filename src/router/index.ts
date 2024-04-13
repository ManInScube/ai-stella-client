import LoginView from '../views/LoginView.vue';
import ChatView from '../views/ChatView.vue';
import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '../store/auth';


const routes = [
      {
        path: "/",
        name: "login",
        component: LoginView,
      },
      {
        path: "/chat",
        name: 'chat',
        component: ChatView,
      }
];

  const router = createRouter({
    history: createWebHistory(),
    routes,
  })

  router.beforeEach(async (to, from)=>{
    const storeAuth = useAuthStore();

    if(!storeAuth.isAuthenticated && to.name !== 'login'){
        return {name: 'login'}
    }
  })
  
export default router;