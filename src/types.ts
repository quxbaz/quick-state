export type PlainObject = Record<string, any>

export interface Transform {
  name?: string,
  path?: string[],
  props?: Function | object,
}

export type Listener = (prevState: any, nextState: any, transform: Transform | Transform[]) => any

export interface Store {
  getState (): any,
  commit (transform: Transform | Transform[]): any,
  subscribe (listener: Listener): void,
}
