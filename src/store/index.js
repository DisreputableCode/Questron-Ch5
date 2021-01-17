import Vue from 'vue'
import Vuex from 'vuex'

// import example from './module-example'

Vue.use(Vuex)

export default function (/* { ssrContext } */) {
  const Store = new Vuex.Store({
    modules: {
      // example
    }

    // enable strict mode (adds overhead!)
    // for dev mode only
    // strict: process.env.DEBUGGING
  })

  return Store
}
