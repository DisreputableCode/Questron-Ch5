<template>
  <q-page class="items-stretch row">
      <q-card class="col q-mt-md q-mb-sm q-mx-md">
        <div class="row">
          <div class="col-12 text-center">
            <h1>Confirm Power Off</h1>
            <h5>Press the button below to power down the system</h5>
            <div @touchstart="returnToSplash">
              <ch-btn
                :join="joins.powerOff"
                label="Power Off"
                color="red"
                size="xl"
                class="zoom-200 q-mt-lg"
              />
            </div>
          </div>
      </div>
    </q-card>
  </q-page>

</template>

<script>
import ChBtn from '../components/crestron/Button'

export default {
  components: {
    ChBtn
  },
  data () {
    return {
      joins: {
        powerOff: 52
      }
    }
  },
  methods: {
    returnToSplash () {
      this.$router.push('/')
    }
  }
}
</script>
