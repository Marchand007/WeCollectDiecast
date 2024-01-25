import { createApp } from 'vue'

// Vuetify
import 'vuetify/styles';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as labsComponents from 'vuetify/labs/components'
import * as directives from 'vuetify/directives';
import { aliases, mdi } from 'vuetify/iconsets/mdi';

import App from './App.vue'
import router from './router'
const app = createApp(App)

const vuetify = createVuetify({
    components: {
        ...components,
        ...labsComponents,
    },
    directives,
    icons: {
        defaultSet: 'mdi',
        aliases,
        sets: {
            mdi
        }
    },
    breakpoint: {
        thresholds: {
            xs: 0,
            sm: 700,
            md: 960,
            lg: 1280,
        },
    },
});


app.use(vuetify);
app.use(router)

app.mount('#app')
