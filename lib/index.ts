import Vue, { VueConstructor } from 'vue'
import { VueMarkit } from './Components'
import { EditorConfiguration } from './Editor'

export default {
  install(Vue: VueConstructor<Vue>) {
    Vue.component('vue-markit', VueMarkit)
  },
}

export {
  VueMarkit, //
  EditorConfiguration,
}
