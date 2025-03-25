<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import { onMounted } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

export default {
  name: 'App',
  setup() {
    const store = useStore();
    const router = useRouter();

    onMounted(() => {
      const isLoggedIn = store.getters.isLoggedIn;

      if (isLoggedIn && (router.currentRoute.value.path === '/login' || router.currentRoute.value.path === '/signup')) {
        router.push('/');
      } else if (!isLoggedIn && router.currentRoute.value.path !== '/login' && router.currentRoute.value.path !== '/signup') {
        router.push('/login');
      }
    });

    return {};
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>