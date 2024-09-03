import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { far } from '@fortawesome/free-regular-svg-icons'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'
import Toast, { type PluginOptions, POSITION } from 'vue-toastification'
import VueLazyload from 'vue-lazyload'
import '@fontsource-variable/urbanist'
import 'vue-toastification/dist/index.css'

import App from './App.vue'
import router from './router'

const app = createApp(App)

const options: PluginOptions = {
  position: POSITION.BOTTOM_RIGHT
}

library.add(far, fas, fab)
app.use(createPinia())
app.use(router)
app.use(Toast, options)
app.use(VueLazyload, {
  loading: 'lazy-load.jpg',  
  error: 'lazy-load.jpg', 
})
app.component('fa-icon', FontAwesomeIcon)

app.mount('#app')
