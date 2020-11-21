export type PlainObject = Record<string, any>

export interface Transform {
  name?: string,
  path?: string[],
  map?: Function | object,
}

export type Listener = (prevState: any, nextState: any, transform: Transform) => any

export interface Store {
  getState (): any,
  commit (transform: Transform): any,
  subscribe (listener: Listener): void,
}
