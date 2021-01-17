<template>
  <q-btn
    :color="colorCalc"
    :text-color="textColor"
    :label="label"
    :glossy="glossy"
    :icon="icon"
    :stack="stack"
    :round="round"
    :rounded="rounded"
    :outline="outline"
    :align="align"
    :size="size"
    :padding="padding"
    :class="classCalc"
    :disable="disable"

    @touchstart="press"
    @touchend="release"
  />
</template>

<script>
export default {
  name: 'ChButton',
  data () {
    return {
      feedbackValue: false
    }
  },
  props: {
    // digital join number
    join: {
      type: Number,
      required: true
    },
    // set color to display if FB from proc is high (if not set, fb is essentially disabled)
    fbColor: String,
    // add block to api (like bootstrap)
    block: {
      type: Boolean,
      default: false
    },

    // Join Quasar button api via props
    label: String,
    icon: String,
    color: String,
    textColor: String,
    size: String,
    padding: String,
    align: String,
    glossy: Boolean,
    stack: Boolean,
    round: Boolean,
    rounded: Boolean,
    outline: Boolean,
    disable: Boolean
  },
  methods: {
    press: function () {
      this.$crestron.publishEvent('boolean', String(this.join), true) // pass value on to processor
    },
    release: function () {
      this.$crestron.publishEvent('boolean', String(this.join), false) // pass value on to processor
    }
  },
  computed: {
    colorCalc () {
      if (this.fbColor && this.feedbackValue) return this.fbColor
      else return this.color
    },
    // generate classes to add to button
    classCalc () {
      var classes = []

      if (this.block) classes.push('full-width')

      return classes.join(' ')
    }
  },
  created () {
    if (this.fbColor) {
      var that = this
      // subscribe the feedback value to the processor fb
      this.$crestron.subscribeState('boolean', String(that.join), function (value) {
        that.feedbackValue = value
      })
    }
  },
  beforeDestroy () {
    // unsubscribe if element is destroyed
    if (this.fbColor) this.$crestron.unsubscribeState('boolean', String(this.join))
  }
}
</script>
