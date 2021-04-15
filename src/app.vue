<template>
  <div class="logo">
    <img alt="Vue logo" src="./assets/img/logo.png" />
    <h3>Vue3.0 Typescript Eslint SSR Starter</h3>
    <p>{{ time }}</p>
  </div>
  <nav>
    <router-link :to="{ name: 'index' }">Go to Home</router-link>
    <router-link :to="{ name: 'user' }">Go to User</router-link>
    <router-link :to="{ name: 'market' }">Go to Market</router-link>
  </nav>
  <hr />
  <div class="container">
    <router-view v-slot="{ Component }">
      <Suspense>
        <component :is="Component" />
      </Suspense>
    </router-view>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'App',
  data() {
    return {
      time: ''
    };
  },
  mounted() {
    window.setInterval(() => {
      this.time = new Date().toLocaleString();
    }, 1000);
  }
});
</script>
<style scoped>
.logo {
  text-align: center;
}
.container {
  padding: 10px 0;
}
nav {
  width: 500px;
  display: flex;
  justify-content: space-between;
  margin: 0 auto;
  padding: 20px 0;
  border-radius: 4px;
}
</style>
