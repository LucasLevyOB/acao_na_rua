import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPliginPersistedState from 'pinia-plugin-persistedstate'
import App from './App.vue'

import router from './router'

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import "@mdi/font/css/materialdesignicons.css";
import "@fortawesome/fontawesome-free/css/all.css";

const pinia = createPinia()
pinia.use(piniaPliginPersistedState)

const vuetify = createVuetify({
  components,
  directives,
})

const app = createApp(App)

app.use(router)
app.use(pinia)
app.use(vuetify)

app.mount('#app')
