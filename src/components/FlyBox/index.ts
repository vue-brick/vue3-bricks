import {App} from 'vue'
import FlyBox from './FlyBox.vue'

FlyBox.install = (app: App) => {
    app.component(FlyBox.name, FlyBox)
}

export default FlyBox
