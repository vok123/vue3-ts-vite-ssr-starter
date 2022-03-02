import { ElSwitch } from 'element-plus';
import 'element-plus/theme-chalk/el-switch.css';

export default defineComponent({
  name: 'Index',
  setup() {
    const isActive = ref(false);

    return () => (
      <div class="index">
        <ElSwitch v-model={isActive.value} active-color="#13ce66" inactive-color="#ff4949">
          switch
        </ElSwitch>
      </div>
    );
  }
});
