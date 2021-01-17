# Questron Ch5
Quasar Framework with integrated Crestron Ch5 support and custom components.

![Demo Screencast](demo.gif)

## Intro
As a Crestron Programmer who knows a little VueJS, Crestron Ch5 was an exciting prospect. Unfortunately, I'm not particularly fond of Anguar, and the Crestron Ch5 Components are quite unattractive. I like the styling offered by Quasar, so wanted to build my own library to take advantage of these components.

This is a work in progress, and I'll be building new components as required for projects. I also welcome contributions and suggestions.

This repository is essentially a demo app that can be customised as required for your project.

## Local Development
Use Chrome for local development, and Emulate a touch device. The components use touch directives extensively, and may not work properly when in "desktop" (using a mouse).

https://developers.google.com/web/tools/chrome-devtools/device-mode


## TODO
- [x] Complete Button API Docs
- [x] Complete Vertical Slider API Docs
- [ ] Add Horizontal slider component
- [ ] Add form input component
- [ ] Add router (page flip) functionality to Button
- [ ] Encapsulate tab panels into a component.


## Questron Custom Component API
### Button
A simple button with a join prop to connect to crestron join number.

| Prop | Type | Description|
| ---- | ---- | ---------- |
| join | Number | Crestron Digital join number. Required. |
| color | String | Button Colour (See Quasar color docs) |
| fb-color | String | Button Color when processor feedback is high |
| block | Boolean | Creates a "Bootstrap Block" button (full width) |

Following props linked to q-btn API.
https://quasar.dev/vue-components/button

| Prop | Type |
| ---- | ---- |
| label | String |
| icon | String |
| textColor | String |
| size | String |
| padding | String |
| align | String |
| glossy | Boolean |
| stack | Boolean |
| round | Boolean |
| rounded | Boolean |
| outline | Boolean |
| disable | Boolean |

### Vertical Slider
A customisable Vertical slider element that outputs an analog value. Includes increment, decrement and mute buttons (if required), and also takes care of the value adjustment - no need to use a ramp module in the Simpl program!
Default is to listen to feedback on the same join number, or can just use internal value if required.

| Prop | Type | Description|
| ---- | ---- | ---------- |
| join | Number | Crestron Analog join number. Required. |
| inc-join | Number | Crestron Digital join number for the plus button. If undefined, the panel will take care of the ramp up function. |
| dec-join | Number | Crestron Digital join number for the minus button. If undefined, the panel will take care of the ramp down function. |
| mute-join | Number | Crestron Digital join number for the mute button. If undefined, the panel will take care of the mute function. |
| label | String | Label to place underneath slider. |
| height | String | Height of the bar (NOTE: currently does not take button height into account, just the bar itself). Accepts any CSS height value (e.g. 100px, 70vh etc.). Default: 250px. |
| barWidth | Number | Width of the bar (in pixels). Default 18. |
| fake-fb | Boolean | If set, the bar will use the internal value for feedback display (not from processor) |
| readonly | Boolean | If set, the slider will be read only |
| color | String | Quasar color for the active part of the bar. Default is 'blue'. |
| track-color | String | Quasar color for the inactive part of the bar. Default is 'grey-3'. |
| buttons | Boolean | If set the Plus/Minus buttons will be displayed. |
| mute-icon | String | Material Design icon to use for the mute button when not muted. If undefined, the mute button will not be displayed. |
| muted-icon | String | Material Design icon to use for the mute button when muted. Does nothing if mute-icon is undefined. |
| ramp | Boolean | If set, the plus/minus buttons will ramp the speed of change the longer the button is held. |
| max | Number | Analog value of the slider when at 100%. Default is 65535. |
| min | Number | Analog value for the slider when at 0%. Default is 0. |
| set-level | Number | When changed from outside the component, will set the level of the slider. |


## Getting Started
### Install the dependencies
```bash
npm install
```

### Start the app in development mode (hot-code reloading, error reporting, etc.)
```bash
quasar dev
```

### Build the app for production/archive for deployment to touchpanel
```bash
npm run build
```

### Send built project to touchpanel
```bash
npm run send <PANEL_IP_ADDRESS/HOSTNAME>
```
