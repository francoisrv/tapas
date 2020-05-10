import { promisify } from "util"
import { readdir, readFile } from "fs"
import { join } from "path"
import * as json from "../parsers/json"
import writeType from "../writers/writeType"
import writeQuery from "../writers/writeQuery"
import writeMutation from "../writers/writeMutation"
import writeInput from "../writers/writeInput"
import writeEnum from "../writers/writeEnum"
import writeUnion from "../writers/writeUnion"
import writeTypes from "../writers/writeTypes"
import writeQueries from "../writers/writeQueries"
import writeMutations from "../writers/writeMutations"
import { base } from "../config"

const syncTypes = async () => {
  const files = await promisify(readdir)(join(base, 'schema/types'))
  const sources = await Promise.all(
    files.map(async file => (await promisify(readFile)(join(base, 'schema/types', file))).toString())
  )
  const types = sources.map(json.parseType)
  await Promise.all(types.map(writeType))
  await writeTypes()
}

const syncQueries = async () => {
  const files = await promisify(readdir)(join(base, 'schema/queries'))
  const sources = await Promise.all(
    files.map(async file => (await promisify(readFile)(join(base, 'schema/queries', file))).toString())
  )
  const queries = sources.map(json.parseQuery)
  await Promise.all(queries.map(writeQuery))
  await writeQueries()
}

const syncMutations = async () => {
  const files = await promisify(readdir)(join(base, 'schema/mutations'))
  const sources = await Promise.all(
    files.map(async file => (await promisify(readFile)(join(base, 'schema/mutations', file))).toString())
  )
  const mutations = sources.map(json.parseMutation)
  await Promise.all(mutations.map(writeMutation))
  await writeMutations()
}

const syncInputs = async () => {
  const files = await promisify(readdir)(join(base, 'schema/inputs'))
  const sources = await Promise.all(
    files.map(async file => (await promisify(readFile)(join(base, 'schema/inputs', file))).toString())
  )
  const inputs = sources.map(json.parseInput)
  await Promise.all(inputs.map(writeInput))
}

const syncEnums = async () => {
  const files = await promisify(readdir)(join(base, 'schema/enums'))
  const sources = await Promise.all(
    files.map(async file => (await promisify(readFile)(join(base, 'schema/enums', file))).toString())
  )
  const enums = sources.map(json.parseEnum)
  await Promise.all(enums.map(writeEnum))
}

const syncUnions = async () => {
  const files = await promisify(readdir)(join(base, 'schema/unions'))
  const sources = await Promise.all(
    files.map(async file => (await promisify(readFile)(join(base, 'schema/unions', file))).toString())
  )
  const unions = sources.map(json.parseUnion)
  await Promise.all(unions.map(writeUnion))
}

export default async () => {
  console.log('Syncing...')
  await Promise.all([
    syncTypes(),
    syncQueries(),
    syncMutations(),
    syncInputs(),
    syncEnums(),
    syncUnions(),
  ])
  console.log('All synced')
}
