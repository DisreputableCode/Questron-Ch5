<template>
  <q-page class="items-stretch row">
      <q-card class="col q-mt-md q-mb-sm q-mx-md">
        <div class="row">
        <div class="col-1">
          <ch-vertical-slider
            label="Lecturn"
            :join="joins.lecturn"
            muteIcon="volume_up"
            mutedIcon="volume_off"
            height="31vh"
            buttons
            ramp
          />
        </div>
        <div class="col-1">
          <ch-vertical-slider
            label="Bluetooth"
            :join="joins.bluetooth"
            muteIcon="volume_up"
            mutedIcon="volume_off"
            height="31vh"
            buttons
            ramp
          />
          <div @touchstart="bluetoothNotify">
            <ch-btn
              label="Pair"
              :join="joins.bluetooth"
              fb-color="primary"
              style="margin: 10px 0px 0px 20px"
            />
          </div>
        </div>
      </div>
    </q-card>
  </q-page>

</template>

<script>
import ChVerticalSlider from '../components/crestron/VerticalSlider'
import ChBtn from '../components/crestron/Button'

export default {
  components: {
    ChVerticalSlider,
    ChBtn
  },
  data () {
    return {
      joins: {
        lecturn: 101,
        bluetooth: 102
      }
    }
  },
  methods: {
    bluetoothNotify () {
      this.$q.notify({
        type: 'positive',
        message: 'Bluetooth Pairing Started',
        caption: 'Look for "DEVICE NAME" in your device bluetooth settings',
        timeout: 5000
      })
    }
  }
}
</script>
