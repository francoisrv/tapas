import { promisify } from "util"
import { readdir, readFile } from "fs"
import { join } from "path"
import { parseType } from "./json"

export default async (_ctx: null) => {
  const base = join(__dirname, '../../schema/types')
  const files = await promisify(readdir)(base)
  const sources = await Promise.all(
    files.map(async file => (await promisify(readFile)(join(base, file))).toString())
  )
  const types = sources.map(parseType)
  return types
}
