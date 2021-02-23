import { useStore } from '@/store';
import { defineComponent } from 'vue';
import '@/scss/market.scss';

export const market = defineComponent({
  name: 'MarketJsx',
  async setup() {
    const store = useStore();
    await store.dispatch('market/getFruitList');
    const { fruitList } = store.state.market;

    return () => (
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
            {fruitList.map((item) => {
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
