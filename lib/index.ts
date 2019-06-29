import { VueMarkit } from './Components'
import Vue, { VueConstructor } from 'vue'

export default {
  install(Vue: VueConstructor<Vue>) {
    Vue.component('vue-markit', VueMarkit)
  },
}

export {
  VueMarkit, //
}
