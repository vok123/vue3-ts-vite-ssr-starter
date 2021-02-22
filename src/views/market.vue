<template>
  <market-comp />
</template>

<script lang="ts">
import { defineAsyncComponent, defineComponent } from 'vue';

export default defineComponent({
  name: 'Markets',
  components: {
    marketComp: defineAsyncComponent(() => import('@/components/market/index.tsx').then(mod => mod.market))
  }
});
</script>
