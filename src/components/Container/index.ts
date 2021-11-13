import {App} from 'vue'
import Container from './Container.vue'

Container.install = (app: App) => {
    app.component(Container.name, Container)
}

export default Container
