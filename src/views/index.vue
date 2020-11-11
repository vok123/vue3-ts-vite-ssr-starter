<template>
  <div class="index">
    Index Page
    <el-switch v-model="value" active-color="#13ce66" inactive-color="#ff4949">switch</el-switch>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Index',
  data() {
    return {
      value: false
    };
  }
});
</script>
