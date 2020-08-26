// docs: https://f3oall.github.io/awesome-notifications/docs/integrations/vue

import Vue from "vue"
import VueAWN from "vue-awesome-notifications"
import 'vue-awesome-notifications/dist/styles/style.scss'

// Your custom options
let options = {
  labels: {
    success: "Success",
    alert: "Error",
  }
}

export default ({ store }) => {
  Vue.use(VueAWN, options)
}
