<template>
  <q-layout view="hHh lpR fFf">

    <q-header elevated class="bg-grey-2 text-primary" height-hint="98">
      <q-toolbar>
        <q-toolbar-title>
          <img src="~assets/logo-sm.png" style="height: 40px; padding-top: 15px" contain >
          Questron Ch5 Template
        </q-toolbar-title>
      </q-toolbar>

      <q-tabs align="justify" class="text-black zoom-170">
        <q-route-tab to="/main/video" label="Video" icon="tv" />
        <q-route-tab to="/main/audio" label="Audio" icon="volume_up" />
        <q-route-tab to="/main/power" label="Turn Off" icon="power_settings_new" class="text-red" />
      </q-tabs>
    </q-header>

    <q-page-container>
      <transition
        appear
        enter-active-class="animated fadeInLeft"
      >
        <router-view :key="$route.path" />
      </transition>
    </q-page-container>

  </q-layout>
</template>

<script>

export default {
  name: 'MainLayout',
  components: { },
  data () {
    return {
      joins: {
        feedbackDetected: 71,
        coreOffline: 72,
        coreNotInit: 73,
        coreError: 74,
        coreIP: 10
      },
      // notify: false,
      feedback: false,
      coreIP: '0.0.0.0',
      coreNotify: undefined,
      core: {
        offline: false,
        uninit: false,
        error: false
      },
      detected: {
        pc: false,
        hdmi1: false,
        hdmi2: false
      }
    }
  },
  methods: {
    coreNotification: function () {
      if (this.coreNotify !== undefined) this.coreNotify()
      if (this.core.offline) {
        this.coreNotify = this.$q.notify({
          type: 'negative',
          message: 'QSC Core Offline!',
          caption: 'Unable to connect to core at ' + this.coreIP,
          timeout: 30000,
          position: 'bottom'
        })
      } else if (this.core.uninit) {
        this.coreNotify = this.$q.notify({
          type: 'negative',
          message: 'QSC Core Not Initialised',
          caption: 'Unable to initialise core at ' + this.coreIP,
          timeout: 30000,
          position: 'bottom'
        })
      } else if (this.core.error) {
        this.coreNotify = this.$q.notify({
          type: 'warning',
          message: 'QSC Core has an Error',
          caption: 'Contact your IT administrator if you experience audio issues.',
          timeout: 30000,
          actions: [
            { label: 'Dismiss', color: 'white', handler: () => { /* ... */ } }
          ],
          position: 'bottom'
        })
      }
    },
    feedbackNotification: function () {
      this.$q.notify({
        icon: 'hearing',
        type: 'negative',
        message: 'Feedback Detected!',
        caption: 'Consider turning down the microphones'

      })
    }
  },
  watch: {
    core: function () {
      this.coreNotification()
    },
    feedback: function (val) {
      if (val && this.notify) {
        this.feedbackNotification()
      }
    }
  },
  created () {
    var that = this
    this.$q.notify.setDefaults({
      position: 'top-right',
      timeout: 3000,
      classes: 'zoom-180'
    })
    this.$crestron.subscribeState('boolean', String(that.joins.feedbackDetected), function (val) {
      that.feedback = val
    })
    this.notify = true
    this.$crestron.subscribeState('boolean', String(that.joins.spashReturn), function (val) {
      if (val) {
        that.$router.push('/')
      }
    })
    this.$crestron.subscribeState('s', String(that.joins.coreIP), function (val) {
      if (val) that.coreIP = val
    })
    this.$crestron.subscribeState('boolean', String(that.joins.coreOffline), function (val) {
      that.core.offline = val
    })
    this.$crestron.subscribeState('boolean', String(that.joins.coreNotInit), function (val) {
      that.core.uninit = val
    })
    this.$crestron.subscribeState('boolean', String(that.joins.coreError), function (val) {
      that.core.error = val
    })

    this.$crestron.subscribeState('boolean', '51', function (val) {
      if (val) that.$router.push('/') // switch route to splash if cmd received from proc
    })

    this.coreNotification()
  },
  beforeDestroy () {
    if (this.coreNotify !== undefined) this.coreNotify()
    this.$crestron.unsubscribeState('boolean', String(this.joins.feedbackDetected))
    this.$crestron.unsubscribeState('boolean', String(this.joins.spashReturn))
    this.$crestron.unsubscribeState('s', String(this.joins.coreIP))
    this.$crestron.unsubscribeState('boolean', String(this.joins.coreOffline))
    this.$crestron.unsubscribeState('boolean', String(this.joins.coreNotInit))
    this.$crestron.unsubscribeState('boolean', String(this.joins.coreError))
    this.$crestron.unsubscribeState('boolean', '51')
  }
}
</script>
