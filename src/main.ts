import {createApp} from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
// @ts-ignore
import VueMarkdownEditor from '@kangc/v-md-editor';
import '@kangc/v-md-editor/lib/style/base-editor.css';
// @ts-ignore
import githubTheme from '@kangc/v-md-editor/lib/theme/github.js';
import '@kangc/v-md-editor/lib/theme/style/vuepress.css';

// Element-plus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

// @ts-ignore
import Prism from 'prismjs';

VueMarkdownEditor.use(githubTheme, {
    Prism,
});
const app = createApp(App);
app.use(store);
app.use(router);
app.use(VueMarkdownEditor);
app.use(ElementPlus);
app.mount('#app');

