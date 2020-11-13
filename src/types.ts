export type Key = string | number
export type PlainObject = Record<Key, any>

export interface Transform {
  name?: string,
  path: string[],
  props: any,
}

export interface Store {
  getState (): any,
  commit (transform: Transform): any,
}
