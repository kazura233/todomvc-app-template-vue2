import Vue from 'vue'
import App from './App'
import 'todomvc-common/base'
import 'todomvc-common/base.css'
import 'todomvc-app-css/index.css'

Vue.config.productionTip = false

new Vue({
  render: (h) => h(App),
}).$mount('#app')
