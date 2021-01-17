/**
 * THIS FILE IS GENERATED AUTOMATICALLY.
 * DO NOT EDIT.
 *
 * You are probably looking on adding startup/initialization code.
 * Use "quasar new boot <name>" and add it there.
 * One boot file per concern. Then reference the file(s) in quasar.conf.js > boot:
 * boot: ['file', ...] // do not add ".js" extension to it.
 *
 * Boot files are your "main.js"
 **/



import '@quasar/extras/roboto-font/roboto-font.css'

import '@quasar/extras/material-icons/material-icons.css'



import '@quasar/extras/animate/bounce.css'

import '@quasar/extras/animate/flash.css'

import '@quasar/extras/animate/flip.css'

import '@quasar/extras/animate/headShake.css'

import '@quasar/extras/animate/heartBeat.css'

import '@quasar/extras/animate/hinge.css'

import '@quasar/extras/animate/jello.css'

import '@quasar/extras/animate/pulse.css'

import '@quasar/extras/animate/rubberBand.css'

import '@quasar/extras/animate/shake.css'

import '@quasar/extras/animate/shakeX.css'

import '@quasar/extras/animate/shakeY.css'

import '@quasar/extras/animate/swing.css'

import '@quasar/extras/animate/tada.css'

import '@quasar/extras/animate/wobble.css'

import '@quasar/extras/animate/backInDown.css'

import '@quasar/extras/animate/backInLeft.css'

import '@quasar/extras/animate/backInRight.css'

import '@quasar/extras/animate/backInUp.css'

import '@quasar/extras/animate/bounceIn.css'

import '@quasar/extras/animate/bounceInDown.css'

import '@quasar/extras/animate/bounceInLeft.css'

import '@quasar/extras/animate/bounceInRight.css'

import '@quasar/extras/animate/bounceInUp.css'

import '@quasar/extras/animate/fadeIn.css'

import '@quasar/extras/animate/fadeInBottomLeft.css'

import '@quasar/extras/animate/fadeInBottomRight.css'

import '@quasar/extras/animate/fadeInDown.css'

import '@quasar/extras/animate/fadeInDownBig.css'

import '@quasar/extras/animate/fadeInLeft.css'

import '@quasar/extras/animate/fadeInLeftBig.css'

import '@quasar/extras/animate/fadeInRight.css'

import '@quasar/extras/animate/fadeInRightBig.css'

import '@quasar/extras/animate/fadeInTopLeft.css'

import '@quasar/extras/animate/fadeInTopRight.css'

import '@quasar/extras/animate/fadeInUp.css'

import '@quasar/extras/animate/fadeInUpBig.css'

import '@quasar/extras/animate/flipInX.css'

import '@quasar/extras/animate/flipInY.css'

import '@quasar/extras/animate/jackInTheBox.css'

import '@quasar/extras/animate/lightSpeedInLeft.css'

import '@quasar/extras/animate/lightSpeedInRight.css'

import '@quasar/extras/animate/rollIn.css'

import '@quasar/extras/animate/rotateIn.css'

import '@quasar/extras/animate/rotateInDownLeft.css'

import '@quasar/extras/animate/rotateInDownRight.css'

import '@quasar/extras/animate/rotateInUpLeft.css'

import '@quasar/extras/animate/rotateInUpRight.css'

import '@quasar/extras/animate/slideInDown.css'

import '@quasar/extras/animate/slideInLeft.css'

import '@quasar/extras/animate/slideInRight.css'

import '@quasar/extras/animate/slideInUp.css'

import '@quasar/extras/animate/zoomIn.css'

import '@quasar/extras/animate/zoomInDown.css'

import '@quasar/extras/animate/zoomInLeft.css'

import '@quasar/extras/animate/zoomInRight.css'

import '@quasar/extras/animate/zoomInUp.css'

import '@quasar/extras/animate/backOutDown.css'

import '@quasar/extras/animate/backOutLeft.css'

import '@quasar/extras/animate/backOutRight.css'

import '@quasar/extras/animate/backOutUp.css'

import '@quasar/extras/animate/bounceOut.css'

import '@quasar/extras/animate/bounceOutDown.css'

import '@quasar/extras/animate/bounceOutLeft.css'

import '@quasar/extras/animate/bounceOutRight.css'

import '@quasar/extras/animate/bounceOutUp.css'

import '@quasar/extras/animate/fadeOut.css'

import '@quasar/extras/animate/fadeOutBottomLeft.css'

import '@quasar/extras/animate/fadeOutBottomRight.css'

import '@quasar/extras/animate/fadeOutDown.css'

import '@quasar/extras/animate/fadeOutDownBig.css'

import '@quasar/extras/animate/fadeOutLeft.css'

import '@quasar/extras/animate/fadeOutLeftBig.css'

import '@quasar/extras/animate/fadeOutRight.css'

import '@quasar/extras/animate/fadeOutRightBig.css'

import '@quasar/extras/animate/fadeOutTopLeft.css'

import '@quasar/extras/animate/fadeOutTopRight.css'

import '@quasar/extras/animate/fadeOutUp.css'

import '@quasar/extras/animate/fadeOutUpBig.css'

import '@quasar/extras/animate/flipOutX.css'

import '@quasar/extras/animate/flipOutY.css'

import '@quasar/extras/animate/lightSpeedOutLeft.css'

import '@quasar/extras/animate/lightSpeedOutRight.css'

import '@quasar/extras/animate/rollOut.css'

import '@quasar/extras/animate/rotateOut.css'

import '@quasar/extras/animate/rotateOutDownLeft.css'

import '@quasar/extras/animate/rotateOutDownRight.css'

import '@quasar/extras/animate/rotateOutUpLeft.css'

import '@quasar/extras/animate/rotateOutUpRight.css'

import '@quasar/extras/animate/slideOutDown.css'

import '@quasar/extras/animate/slideOutLeft.css'

import '@quasar/extras/animate/slideOutRight.css'

import '@quasar/extras/animate/slideOutUp.css'

import '@quasar/extras/animate/zoomOut.css'

import '@quasar/extras/animate/zoomOutDown.css'

import '@quasar/extras/animate/zoomOutLeft.css'

import '@quasar/extras/animate/zoomOutRight.css'

import '@quasar/extras/animate/zoomOutUp.css'


// We load Quasar stylesheet file
import 'quasar/dist/quasar.sass'




import 'src/css/app.sass'


import Vue from 'vue'
import createApp from './app.js'




import qboot_Bootcrestron from 'boot/crestron'

import qboot_Bootaxios from 'boot/axios'







Vue.config.devtools = true
Vue.config.productionTip = false



console.info('[Quasar] Running SPA.')





const publicPath = ``


async function start () {
  const { app, store, router } = await createApp()

  

  
  let hasRedirected = false
  const redirect = url => {
    hasRedirected = true
    const normalized = Object(url) === url
      ? router.resolve(url).route.fullPath
      : url

    window.location.href = normalized
  }

  const urlPath = window.location.href.replace(window.location.origin, '')
  const bootFiles = [qboot_Bootcrestron,qboot_Bootaxios]

  for (let i = 0; hasRedirected === false && i < bootFiles.length; i++) {
    if (typeof bootFiles[i] !== 'function') {
      continue
    }

    try {
      await bootFiles[i]({
        app,
        router,
        store,
        Vue,
        ssrContext: null,
        redirect,
        urlPath,
        publicPath
      })
    }
    catch (err) {
      if (err && err.url) {
        window.location.href = err.url
        return
      }

      console.error('[Quasar] boot error:', err)
      return
    }
  }

  if (hasRedirected === true) {
    return
  }
  

  

    

    

    
      new Vue(app)
    

    

    

  

}

start()
