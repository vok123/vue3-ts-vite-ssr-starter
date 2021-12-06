import { useStore } from '@/store';
import { defineComponent } from 'vue';
import '@/styles/market/index.scss';

export default defineComponent({
  name: 'Markets',
  async setup() {
    const store = useStore();
    await store.dispatch('market/getFruitList');
    const { fruitList } = store.state.market;

    return { fruitList };
  },
  render() {
    return (
      <div>
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
            {this.fruitList.map((item) => {
              return (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.name}</td>
                  <td>${item.price}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
});
