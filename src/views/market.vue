<template>
  <h2>FruitList</h2>
  <table class="table">
    <thead>
      <tr>
        <th>ID</th>
        <th>Name</th>
        <th>Price</th>
      </tr>
    </thead>

    <tbody>
      <tr v-for="item in fruitList" :key="item.id">
        <td>{{ item.id }}</td>
        <td>{{ item.name }}</td>
        <td>${{ item.price }}</td>
      </tr>
    </tbody>
  </table>
  <h3>element-plus table</h3>
  <el-table row-key="id" :data="fruitList" style="width: 70%;margin: 30px auto;">
    <el-table-column align="center" prop="id" label="ID" />
    <el-table-column align="center" prop="name" label="Name" />
    <el-table-column align="center" label="Price">
      <template #default="{ row }">
        ${{ row.price }}
      </template>
    </el-table-column>
  </el-table>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Market',
  asyncData({ store }) {
    return store.dispatch('market/getFruitList');
  },
  computed: {
    fruitList() {
      return this.$store.state.market.fruitList;
    }
  }
});
</script>

<style lang="scss" scoped>
h2 {
  padding-top: 10px;
}
.table {
  width: 70%;
  margin: 30px auto;
  td {
    text-align: center;
    padding: 8px 15px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.03);
  }
}
</style>
