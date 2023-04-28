<template>
  <ElConfigProvider>
    <div class="logo">
      <img alt="Vue logo" src="./assets/img/logo.png" />
      <h3>Vue3.0 Typescript Eslint SSR Starter</h3>
      <p class="c-#DB752D">{{ time }}</p>
    </div>
    <nav>
      <router-link :to="{ name: 'index' }">Go to Home</router-link>
      <router-link :to="{ name: 'user' }">Go to User</router-link>
      <router-link :to="{ name: 'market' }">Go to Market</router-link>
    </nav>
    <hr />
    <div class="container pt-12px pb-12px">
      <router-view v-slot="{ Component }">
        <Suspense>
          <component :is="Component" />
        </Suspense>
      </router-view>
    </div>
  </ElConfigProvider>
</template>

<script setup lang="ts">
import { ElConfigProvider } from 'element-plus';

const time = ref('');
onMounted(() => {
  setInterval(() => {
    time.value = new Date().toLocaleString();
  }, 1000);
});
</script>
<style scoped>
.logo {
  text-align: center;
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
