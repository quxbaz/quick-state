export type PlainObject = Record<string, any>
export type Path = string[]

export interface Transform {
  name?: string,
  path: string[],
  props: any,
}

export interface Store {
  getState (): any,
  commit (transform: Transform): any,
}
