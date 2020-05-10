import { join } from "path"
import { watch, readFile } from "fs"
import { promisify } from "util"
import { parseType, parseQuery, parseMutation } from "../parsers/json"
import { Type, Query, Mutation } from "../types/entities"
import writeType from "../writers/writeType"
import writeQuery from "../writers/writeQuery"
import writeMutation from "../writers/writeMutation"
import writeTypes from "../writers/writeTypes"
import writeQueries from "../writers/writeQueries"
import writeMutations from "../writers/writeMutations"
import { base } from "../config"

const watchTypes = async () => {
  watch(join(base, 'types'), async (event, file) => {
    console.log('types', {event, file})
    const source = (await promisify(readFile)(join(base, 'types', file))).toString()
    if (!/\.graphql$/.test(file)) {
      console.log('Skipping file: not a .graphql file', file)
    } else if (source) {
      let type: Type
      try {
        type = parseType(source)
        await writeType(type)
        await writeTypes()
      } catch (error) {
        console.log(error)
      }
    }
  })
}

const watchQueries = async () => {
  watch(join(base, 'queries'), async (event, file) => {
    console.log('queries', {event, file})
    const source = (await promisify(readFile)(join(base, 'queries', file))).toString()
    if (!/\.graphql$/.test(file)) {
      console.log('Skipping file: not a .graphql file', file)
    } else if (source) {
      let query: Query
      try {
        query = parseQuery(source)
        await writeQuery(query)
        await writeQueries()
      } catch (error) {
        console.log(error)
      }
    }
  })
}

const watchMutations = async () => {
  watch(join(base, 'mutations'), async (event, file) => {
    console.log('mutations', {event, file})
    const source = (await promisify(readFile)(join(base, 'mutations', file))).toString()
    if (!/\.graphql$/.test(file)) {
      console.log('Skipping file: not a .graphql file', file)
    } else if (source) {
      let mutation: Mutation
      try {
        mutation = parseMutation(source)
        await writeMutation(mutation)
        await writeMutations()
      } catch (error) {
        console.log(error)
      }
    }
  })
}

export default async () => {
  console.log('Watching...')
  await Promise.all([
    watchTypes(),
    watchQueries(),
    watchMutations(),
  ])
}
