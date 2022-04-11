import {createApp} from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import * as echarts from 'echarts'
// @ts-ignore
import VueMarkdownEditor from '@kangc/v-md-editor';
import '@kangc/v-md-editor/lib/style/base-editor.css';
// @ts-ignore
import githubTheme from '@kangc/v-md-editor/lib/theme/github.js';
import '@kangc/v-md-editor/lib/theme/style/github.css';
import * as ElIcons from '@element-plus/icons'

// Element-plus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
//http(axios)
import axios from './http'
// 引入所有语言包
import hljs from 'highlight.js';

VueMarkdownEditor.use(githubTheme, {
    Hljs: hljs,
});

const app = createApp(App);
for (const name in ElIcons){
    app.component(name,(ElIcons as any)[name])
}
app.config.globalProperties.$axios = axios;
app.config.globalProperties.$echarts = echarts;
app.use(store);
app.use(router);
app.use(ElementPlus);
app.use(VueMarkdownEditor);
app.mount('#app');

