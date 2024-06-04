import { boot } from 'quasar/wrappers'
import { CrComLib } from '@crestron/ch5-crcomlib/build_bundles/cjs/cr-com-lib'

// Register required components to window early
window.bridgeReceiveIntegerFromNative = CrComLib.bridgeReceiveIntegerFromNative
window.bridgeReceiveBooleanFromNative = CrComLib.bridgeReceiveBooleanFromNative
window.bridgeReceiveStringFromNative = CrComLib.bridgeReceiveStringFromNative
window.bridgeReceiveObjectFromNative = CrComLib.bridgeReceiveObjectFromNative

const CrestronPlugin = {
  install (app) {
    app.config.globalProperties.$crestron = CrComLib
  }
}

export default boot(({ app }) => {
  app.use(CrestronPlugin)
})
