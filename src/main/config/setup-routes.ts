import { Router, type Express } from 'express'
import { readdirSync, statSync } from 'fs'
import { resolve } from 'path'
const router = Router()
const getAllFilesFromFoldersAndSubfolders = (
  path: string,
  files: string[] = [],
): string[] => {
  const filenames = readdirSync(path)
  for (const file of filenames) {
    const stats = statSync(resolve(path, file))
    if (stats.isDirectory()) {
      getAllFilesFromFoldersAndSubfolders(resolve(path, file), files)
    } else {
      files.push(resolve(path, file))
    }
  }
  return files
}
export const setupRoutes = async (express: Express) => {
  express.use('/api', router)
  const files = getAllFilesFromFoldersAndSubfolders(
    resolve(__dirname, '..', 'routes'),
  )
  for (const file of files) {
    const route = await import(file)
    route.default(router)
  }
}
