import { VueMarkit } from './components'

export default {
  install(Vue) {
    Vue.component('vue-markit', VueMarkit)
  },
}

export {
  VueMarkit, //
}
