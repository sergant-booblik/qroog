import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'

// Import styles
import '@libs/styles'

// Import and initialize i18n
import i18n, { initI18n } from './logic/i18n'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)
app.use(i18n)

// Initialize i18n
await initI18n()

app.mount('#app')
