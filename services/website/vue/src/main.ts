import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './router'
import i18n, { initI18n } from './logic/i18n'

// Import global styles
import '@libs/styles'

import App from './App.vue'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)
app.use(i18n)

// Initialize i18n
await initI18n()

app.mount('#app')
