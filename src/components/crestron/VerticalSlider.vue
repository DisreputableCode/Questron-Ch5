<template>
  <div>
    <div class="q-mt-lg q-ml-lg row text-center" style="width: 60px">
      <div class="col-12 zoom-120" v-if="buttons" @touchstart="incPress" @touchend="incRelease">
        <q-icon name="add" size="xl" :color="colour" />
      </div>
      <div
        class="col-12 items-center"
        v-touch-pan.vertical.prevent.mouse="updateValue"
        @touchstart="touchSlider"
        @touchend="releaseSlider"
      >
        <div
          ref="mainBar"
          :class="'bg-' + colour + ' q-my-md overflow-hidden'"
          :style="barStyle"
        >
          <div :class="'bg-' + trackColour" :style="overlayStyle"></div>
        </div>
      </div>
      <div class="col-12 zoom-120" v-if="buttons" @touchstart="decPress" @touchend="decRelease">
        <q-icon name="remove" size="xl" :color="colour" />
      </div>
      <div class="col-12 zoom-120" v-if="muteIcon" @touchstart="mutePress" @touchend="muteRelease">
        <q-icon :name="currentMuteIcon" :color="muted ? 'red' : colour" size="xl" />
      </div>
    </div>
    <div class="text-center text-h6" v-if="label">
      {{ label }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'ChVerticalSlider',
  data () {
    return {
      feedbackValue: 0, // current feedbakc value, affects height of the feedback div
      value: 0, // currently set value of the slider
      iconPressed: false, // variable to mark if an increment/decrement button is being held to facilitate ramp
      muted: false, // variable to store current mute state
      preMuteVal: 0, // variable to store the value prior to muting to enable snap back on unmute
      overlayHeight: '100%', // init overlay height until component is fully mounted and this will be calculated
      sliderTouch: false // track if slider is being touched to ensure smooth feedback
    }
  },
  props: {
    // height of bar - currently buttons/label height is added on top of this value
    // TODO: make bar height equal this value minus height of butttons
    height: {
      type: String,
      default: '250px'
    },
    // width of bar in pixels
    barWidth: {
      type: Number,
      default: 18
    },
    // if set to true, panel ignores processor value and tracks value locally.
    fakeFb: {
      type: Boolean,
      default: false
    },
    // analog join number
    join: {
      type: Number,
      required: true
    },
    // increment button digital join number
    //   if undefined, the panel will manage the increment internally, adjusting the value and sending raw analog value to processor
    //   default setup eliminates need for an analog ramp in simpl
    incJoin: {
      type: Number,
      default: undefined
    },
    // decrement button digital join number
    //   ramp prop must be set to true to show button
    //   if undefined, the panel will manage the decrement internally, adjusting the value and sending raw analog value to processor
    //   default setup eliminates need for an analog ramp in simpl
    decJoin: {
      type: Number,
      default: undefined
    },
    // mute button digital join number
    //   ramp prop must be set to true to show button
    //   if undefined, the panel will manage the mute internally, adjusting the value to 0 and sending analog value to processor
    //   default setup eliminates need for an analog ramp/toggle in simpl
    muteJoin: {
      type: Number,
      default: undefined
    },
    // optional text label, displayed under the slider
    label: {
      type: String,
      default: undefined
    },
    // sets the slider to read only (NOT CURRENTLY IMPLEMENTED)
    //  TODO: implement this function
    readonly: {
      type: Boolean,
      default: false
    },
    // color to use for the bar and accociated buttons
    colour: {
      type: String,
      default: 'blue'
    },
    // colour of the track underneath
    trackColour: {
      type: String,
      default: 'grey-3'
    },
    // icon to use for the mute buttton when not muted
    //  enter name of material icon
    muteIcon: {
      type: String,
      default: undefined
    },
    // icon to use for the mute buttton when muted
    //  enter name of material icon
    mutedIcon: {
      type: String,
      default: undefined
    },
    // set to true to show plus/minus buttons
    buttons: {
      type: Boolean,
      default: false
    },
    // set to false to remove ramp functionality (plus/minus buttons)
    ramp: {
      type: Boolean,
      default: false
    },
    // analog value to use as the maximum/100%
    max: {
      type: Number,
      default: 65535
    },
    // analog value to use as the minimum/0%
    min: {
      type: Number,
      default: 0
    },
    // set absolute value of slider from outside the element
    setLevel: {
      type: Number
    }
  },
  computed: {
    // generated style of the main bar div
    barStyle () {
      const margin = 31 - (this.barWidth / 2)
      return 'width: ' + this.barWidth + 'px; height: ' + this.height + '; margin-left: ' + margin + 'px'
    },
    // generated style of the overlay div
    overlayStyle () {
      return 'width: ' + this.barWidth + 'px; height: ' + this.overlayHeight
    },
    // generated mute icon
    currentMuteIcon () {
      if (this.muted && this.mutedIcon) return this.mutedIcon
      else return this.muteIcon
    }
  },
  methods: {
    // calculate the rendered pixel height of the bar
    visualHeight () {
      return this.$refs.mainBar.getBoundingClientRect().height
    },
    // scale the value from bar height in pixels to analog value to send to processor
    // calculation can be reversed
    scaleVal (val, reverse = false) {
      if (reverse) return (this.max - this.min) / this.visualHeight() * val
      else return this.visualHeight() / (this.max - this.min) * val
    },
    // set the value of the slider
    setValue (val, updateProc = true) {
      this.value = Math.min(Math.max(val, this.min), this.max)
      if (this.fakeFb) this.setFbValue(this.value) // if faking feedback, set the fbValue to new value
      if (updateProc) this.sendVal(this.value)
    },
    // set the feedback value of the slider, updating the slider
    setFbValue (val, updateProc = true) {
      this.feedbackValue = val
      // below check added to ensure value is updated to proc FB value if slider not being used
      // can't do this when sliding as FB updates interferes with sliding updates
      if (!this.fakeFb && !this.sliderTouch) this.setValue(val, updateProc)
      this.overlayHeight = (this.visualHeight() - this.scaleVal(this.feedbackValue)) + 'px'
    },
    // set the fb value to value if not already equal when user first touches slider
    touchSlider () {
      // if (this.feedbackValue !== this.value) this.value = this.feedbackValue
      this.sliderTouch = true
    },
    releaseSlider () {
      this.sliderTouch = false
    },
    // function to update the value/fb when user manually slides the slider
    updateValue ({ evt, ...info }) {
      const adj = this.scaleVal(info.delta.y, true) // get offset value
      this.setValue(this.value -= adj) // adjust the value by offset and set new value
    },
    // function to adjust the value using the plus minus buttons
    adjust (adjVal) {
      if (this.muted) this.mute() // unmute if currently muted
      this.iconPressed = true // mark button as pressed
      var precisionVal = this.value // clone value, use internal copy to allow higher resolution feedback while adjusting
      var timer = setInterval(() => {
        precisionVal += adjVal * ((this.max - this.min) / 1000) // adjust value each round
        this.setValue(Math.round(precisionVal)) // set the output value to the rounded value
        if (this.ramp) adjVal = Math.min(adjVal * 1.02, 10) // ramp speed of adjustment if button is held
        if (!this.iconPressed) { // if button has been released
          clearInterval(timer) // stop the adjustment
        }
      }, 10)
    },
    // function to call when the button is released - needed to stop the adjustment loop
    stopAdjust () {
      this.iconPressed = false
    },
    // handle mute presses
    mute () {
      if (this.muted) {
        this.setValue(this.preMuteVal) // if already muted, restore value to pre mute value
      } else {
        // if (this.feedbackValue !== this.value) this.value = this.feedbackValue // ensure feedback value is actual value before muting
        this.preMuteVal = this.value // store current value so we can return to this value on unmute
        this.setValue(0) // set value to 0
      }
      this.muted = !this.muted // toggle mute state
    },
    // handle increment presses
    incPress () {
      if (this.incJoin === undefined) {
        this.adjust(1) // adjust internally if no join defined
      } else {
        this.$crestron.publishEvent('boolean', String(this.incJoin), true) // pass press to proc if join defined
      }
    },
    // handle decrement presses
    decPress () {
      if (this.decJoin === undefined) {
        this.adjust(-1) // adjust internally if join not defined
      } else {
        this.$crestron.publishEvent('boolean', String(this.decJoin), true) // pass press to proc if join defined
      }
    },
    // handle increment release
    incRelease () {
      if (this.incJoin === undefined) {
        this.stopAdjust() // stop the adjustment loop if join not defined
      } else {
        this.$crestron.publishEvent('boolean', String(this.incJoin), false) // pass release to proc if join defined
      }
    },
    // handle decrement release
    decRelease () {
      if (this.decJoin === undefined) {
        this.stopAdjust() // stop the adjustment loop if join not defined
      } else {
        this.$crestron.publishEvent('boolean', String(this.decJoin), false) // pass release to proc if join defined
      }
    },
    // handle mute press
    mutePress () {
      if (this.muteJoin === undefined) {
        this.mute() // mute internally if join number not defined
      } else {
        this.$crestron.publishEvent('boolean', String(this.muteJoin), true) // pass press to proc if join defined
      }
    },
    // handle mute release
    muteRelease () {
      if (this.muteJoin !== undefined) {
        this.$crestron.publishEvent('boolean', String(this.muteJoin), false) // pass release to proc if join defined
      }
    },
    // send value to processor
    sendVal (val) {
      this.$crestron.publishEvent('n', String(this.join), val)
    }
  },
  watch: {
    // value: function (val) {
    //   this.sendVal(val)
    // },
    setLevel: function (val) {
      this.value = val
    }
  },
  mounted () {
    if (!this.fakeFb) {
      var that = this
      // subscribe the feedback value to the processor fb
      this.$crestron.subscribeState('number', String(this.join), function (value) {
        that.setFbValue(Number(value), false)
      })
    }
  },
  beforeDestroy () {
    // unsubscribe if element is unmounted from display
    if (!this.fakeFb) this.$crestron.unsubscribeState('number', String(this.join))
  }
}
</script>
