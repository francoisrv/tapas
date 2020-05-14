tapas
===

Utility to convert a graphql file into other files:

- typescript
- resolver
- client query/mutation

Useful to have your graphql files as the single source of truth.

## Quick start

```gql
# main.graphql
type Foo {
  score: Int !
}

type Query {
  getCode(name: String !): Foo !
}
```

From terminal:

```bash
tapas sync --source main.graphql
```

Creates the following files:

```ts
// main.ts
export interface Foo {
  score: number
}

export interface Query {
  getCode(_: any, vars: { name: string }): Promise<Foo>
}
```

```ts
// main.resolvers.ts
import { Query } from './main'

export const getCode: Query.getCode = async (_, vars) => {
  return null
}
```

```gql
# main.client.gql
query getCode(
  $name: String !
) {
  getCode(
    name: $name
  )
}
```