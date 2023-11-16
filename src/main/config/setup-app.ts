import express, { json } from 'express'

import { setupRoutes } from './setup-routes'
export const setupApp = async () => {
  const app = express()
  app.use(json())
  await setupRoutes(app)
  return { app }
}
