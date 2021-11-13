import {App} from 'vue'
import VueEchart from './VueEchart.vue'

VueEchart.install = (app: App) => {
    app.component(VueEchart.name, VueEchart)
}

export default VueEchart
