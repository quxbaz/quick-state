export type PlainObject = Record<string, any>

export interface Transform {
  type?: string,
  path: string[],
  props: object | Function,
}

export type Listener = (state: object, prevState: object, transform: Transform | Transform[]) => any

export interface Store {
  _state: any,
  _listeners: Listener[],
  getState (): object,
  commit (transform: Transform | Transform[]): void,
  subscribe (listener: Listener): () => Listener,
}
