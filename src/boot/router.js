import { boot } from 'quasar/wrappers'
import createRouter from 'src/router'

export default boot(({ app }) => {
  const router = createRouter()
  app.use(router)
})
