import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'
import router from '@/router/router.js'
import PrimeVue from 'primevue/config'
import Aura from '@primevue/themes/aura'
import ToastService from 'primevue/toastservice'
import 'primeicons/primeicons.css'

const app = createApp(App)

app.use(createPinia())

app.use(router)

app.use(PrimeVue, {
  theme: {
    preset: Aura,
    options: {
      prefix: 'p',
      darkModeSelector: 'system',
      cssLayer: false,
    },
  },
})

app.use(ToastService)

app.mount('#app')
