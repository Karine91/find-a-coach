import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import BaseCard from './components/ui/BaseCard.vue'
import BaseButton from './components/ui/BaseButton.vue'
import BaseBadge from './components/ui/BaseBadge.vue'

const app = createApp(App)

app.use(router)
app.use(store)

app.component('BaseCard', BaseCard)
app.component('BaseButton', BaseButton)
app.component('BaseBadge', BaseBadge)

app.mount('#app')
