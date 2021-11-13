import { App } from 'vue'
// @ts-ignore
import MonacoEditor from './MonacoEditor.tsx'
MonacoEditor.install = (app: App) => {
  app.component(MonacoEditor.name, MonacoEditor)
}

export default MonacoEditor
