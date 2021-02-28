import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/vuetify'
import vuetify from './plugins/vuetify';

//뷰파이어 노드 모듈가져와서 Vue에 연결
import {rtdbPlugin} from 'vuefire'
Vue.use(rtdbPlugin);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  beforeCreate() {
    this.$store.dispatch("getMemberInfo");
  },
  vuetify,
  
  render: h => h(App)
}).$mount('#app')
