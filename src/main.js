import { createApp } from 'vue'
import './style.css'
import './assets/responsive.css'
import AOS from 'aos'
import 'aos/dist/aos.css'
import App from './App.vue'
import router from './router'

const app = createApp(App)
app.use(router)
app.mount('#app')

// Initialize Animation on Scroll
const isMobile = window.innerWidth <= 768;
AOS.init({
  duration: isMobile ? 500 : 800,
  once: true,
  offset: isMobile ? 0 : 100,
  easing: 'ease-out-cubic',
  disableMutationObserver: false,
  mirror: false,
})

