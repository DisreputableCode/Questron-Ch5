<template>
  <q-layout>
    <q-page-container>
      <q-page class="flex flex-center">
        <q-img
          alt="logo"
          src="~assets/logo.png"
          @touchstart="press"
          @touchend="release"
          style="height: 700px; padding-top: 15px"
          contain
        />
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  name: 'PageIndex',
  methods: {
    press: function () {
      this.$crestron.publishEvent('boolean', '50', true) // push event to proc when main screen pressed
      this.$router.push('/main/video')
    },
    release: function () {
      this.$crestron.publishEvent('boolean', '50', false) // push event to proc when main screen released
    }
  },
  mounted () {
    var that = this
    that.$crestron.subscribeState('boolean', '50', function (val) {
      if (val) that.$router.push('/main/video') // switch route to main page once proc pushes command
    })
  },
  beforeDestroy () {
    this.$crestron.publishEvent('boolean', '50', false) // be sure to reset button press to low if screen switches before button released
    this.$crestron.unsubscribeState('boolean', '50') // unsubscribe watcher
  }
}
</script>
