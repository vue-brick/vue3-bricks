import { App } from 'vue'
import IndexFeature from './indexFeature.vue'
IndexFeature.install = (app: App) => {
  app.component(IndexFeature.name, IndexFeature)
}

export default IndexFeature
