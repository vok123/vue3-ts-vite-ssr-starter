import { ElLoading } from "element-plus/types/loading";
import { ElMessageBox } from "element-plus/types/message-box";
import { ElNotification } from "element-plus/types/notification";
import { RouteRecordRaw } from "vue-router";
import { IRootStore } from "../store";

export interface IAsyncDataContext {
  route: RouteRecordRaw;
  store: IRootStore
}
declare module '@vue/runtime-core' {
  interface ComponentCustomOptions {
    asyncData?(context: IAsyncDataContext): Promise<any>;
  }

  interface ComponentCustomProperties {
    $loading: ElLoading;
    $message: ElMessageBox;
    $alert: ElMessageBox;
    $confirm: ElMessageBox;
    $prompt: ElMessageBox;
    $notify: ElNotification;
  }
}