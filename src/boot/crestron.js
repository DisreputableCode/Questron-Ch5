import Vue from 'vue'
import * as CrComLib from '@crestron/ch5-crcomlib/build_bundles/cjs/cr-com-lib'

// register required components to window early
window.bridgeReceiveIntegerFromNative = CrComLib.bridgeReceiveIntegerFromNative
window.bridgeReceiveBooleanFromNative = CrComLib.bridgeReceiveBooleanFromNative
window.bridgeReceiveStringFromNative = CrComLib.bridgeReceiveStringFromNative
window.bridgeReceiveObjectFromNative = CrComLib.bridgeReceiveObjectFromNative

// register the crestron plugin to  the vue object
const CrestronPlugin = {
  install: function (Vue) {
    Object.defineProperty(Vue.prototype, '$crestron', { value: CrComLib })
  }
}
Vue.use(CrestronPlugin)
