import { env } from './config/env'
import { setupApp } from './config/setup-app'

setupApp().then(({ app }) => {
  app.listen(env.APP_PORT, () => {
    console.log(`Server listen at  http:localhost:${env.APP_PORT}`)
  })
})
