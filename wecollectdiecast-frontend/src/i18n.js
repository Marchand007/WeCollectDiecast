import { createApp } from 'vue';
import { createI18n } from 'vue-i18n';

const app = createApp();
app.use(createI18n);

import en from './locales/en.json';
import fr from './locales/fr.json';
import es from './locales/es.json';

const i18n = createI18n({
    locale: 'en',
    fallbackLocale: 'en',
    messages: {
        en,
        fr,
        es
    }
});

app.use(i18n);

export default i18n;