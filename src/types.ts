export interface Kind {
  kind: string
  nesting: number
  required: boolean
  nestingRequired: boolean[]
}

export interface Named {
  name: string
}

export interface Argument extends Named {
  kind: Kind
}

export interface Directive extends Named {
}

export interface Field extends Named {
  kind: Kind
  arguments: Argument[]
}

export interface Type extends Named {
  fields: Field[]
  directives: Directive[]
}

export interface Query extends Field {

}

export interface Mutation extends Field {

}

export interface InputField extends Named {
  kind: Kind
}

export interface Input extends Named {
  fields: InputField[]
  directives: Directive[]
}

export interface Enum extends Named {
  values: Array<string | number>
}

export interface Union extends Named {
  values: any[]
}