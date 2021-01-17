<template>
  <q-page class="items-stretch row">
      <q-card class="col q-mt-md q-mb-sm q-mx-md">
        <div
          class="row"
          style="max-height: 50vh;"
        >
          <div class="col-11">
            <q-card-section>
              <q-splitter
                v-model="splitterModel"
                :limits="[19,19]"
              >
              <template v-slot:before>
                <q-tabs
                  v-model="source"
                  class="text-blue-5 zoom-150"
                  vertical
                  active-color="blue-14"
                  active-bg-color="blue-1"
                >
                  <q-tab
                    :alert="detected.pc ? 'green' : 'red'"
                    name="pc"
                    icon="computer"
                    label="Local PC"
                    style="height: 12vh"
                  />
                  <q-tab
                    :alert="detected.hdmi1 ? 'green' : 'red'"
                    name="presentation"
                    icon="settings_input_hdmi"
                    label="HDMI 1"
                    style="height: 12vh"
                  />
                  <q-tab
                    :alert="detected.hdmi2 ? 'green' : 'red'"
                    name="seats"
                    icon="settings_input_hdmi"
                    label="HDMI 2"
                    style="height: 12vh"
                  />
                  <q-tab
                    name="none"
                    icon="power_settings_new"
                    class="text-red"
                    label="Display Off"
                    style="height: 11vh"
                  />
                </q-tabs>
              </template>

              <template v-slot:after>
                <q-tab-panels
                  v-model="source"
                  swipeable
                  animated
                  vertical
                  class="text-body"
                  style="height: 70vh;"
                >
                  <q-tab-panel name="pc" class="zoom-200">
                    <div class="text-h4 q-mb-md">Local PC</div>
                    <div class="text-red q-mb-md" v-if="!detected.pc">(Not Connected)</div>
                      Use the wireless keyboard and mouse to control the PC.
                  </q-tab-panel>
                  <q-tab-panel name="presentation" class="zoom-200">
                    <div class="text-h4 q-mb-md">Presentation HDMI</div>
                    <div class="text-red q-mb-md" v-if="!detected.hdmi1">(Not Connected)</div>
                      Connect your device to the Lecturn HDMI Cable to present.
                  </q-tab-panel>
                  <q-tab-panel name="seats" class="zoom-200">
                    <div class="text-h4 q-mb-md">Seats HDMI</div>
                    <div class="text-red q-mb-md" v-if="!detected.hdmi2">(Not Connected)</div>
                      Connect your device to the HDMI input on the wall to present.
                  </q-tab-panel>
                  <q-tab-panel name="none" class="zoom-200">
                    <div class="text-h4 q-mb-lg">Display Off</div>
                      Select an input source on the left to power on the display.
                  </q-tab-panel>
                </q-tab-panels>
              </template>
            </q-splitter>
          </q-card-section>
        </div>
        <div class="col-1">
          <transition
            appear
            enter-active-class="animated fadeIn"
            leave-active-class="animated fadeOut"
          >
            <ch-vertical-slider
              :join="joins.videoVolume"
              muteIcon="volume_up"
              mutedIcon="volume_off"
              height="40vh"
              buttons
              ramp
              fake-fb
              v-if="source !== 'none'"
            />
          </transition>
        </div>
      </div>
    </q-card>
  </q-page>

</template>

<script>
import ChVerticalSlider from '../components/crestron/VerticalSlider'

export default {
  components: {
    ChVerticalSlider
  },
  data () {
    return {
      source: 'none',
      splitterModel: 19,
      joins: {
        pcSelect: 61,
        hdmi1Select: 62,
        hdmi2Select: 63,
        noneSelect: 64,
        pcDetected: 65,
        hdmi1Detected: 66,
        hdmi2Detected: 67,
        videoVolume: 103
      },
      detected: {
        pc: false,
        hdmi1: false,
        hdmi2: false
      }
    }
  },
  methods: {
    pulse (join) {
      var that = this
      this.$crestron.publishEvent('boolean', String(join), true)
      setTimeout(function () {
        that.$crestron.publishEvent('boolean', String(join), false)
      }, 200)
    }
  },
  watch: {
    source: function (value) {
      if (value === 'none') this.pulse(this.joins.noneSelect)
      else if (value === 'pc') this.pulse(this.joins.pcSelect)
      else if (value === 'presentation') this.pulse(this.joins.hdmi1Select)
      else if (value === 'seats') this.pulse(this.joins.hdmi2Select)
    }
  },
  mounted () {
    var that = this
    this.$crestron.subscribeState('boolean', String(that.joins.pcSelect), function (val) {
      if (val) that.source = 'pc'
    })
    this.$crestron.subscribeState('boolean', String(that.joins.hdmi1Select), function (val) {
      if (val) that.source = 'presentation'
    })
    this.$crestron.subscribeState('boolean', String(that.joins.hdmi2Select), function (val) {
      if (val) that.source = 'seats'
    })
    this.$crestron.subscribeState('boolean', String(that.joins.pcDetected), function (val) {
      that.detected.pc = val
    })
    this.$crestron.subscribeState('boolean', String(that.joins.hdmi1Detected), function (val) {
      that.detected.hdmi1 = val
    })
    this.$crestron.subscribeState('boolean', String(that.joins.hdmi2Detected), function (val) {
      that.detected.hdmi2 = val
    })
  },
  beforeDestroy () {
    this.$crestron.unsubscribeState('boolean', String(this.joins.pcSelect))
    this.$crestron.unsubscribeState('boolean', String(this.joins.hdmi1Select))
    this.$crestron.unsubscribeState('boolean', String(this.joins.hdmi2Select))
    this.$crestron.unsubscribeState('boolean', String(this.joins.pcDetected))
    this.$crestron.unsubscribeState('boolean', String(this.joins.hdmi1Detected))
    this.$crestron.unsubscribeState('boolean', String(this.joins.hdmi2Detected))
  }
}
</script>
