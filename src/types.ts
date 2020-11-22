export type PlainObject = Record<string, any>
export type UpdateType = 'merge' | 'replace'

export interface Transform {
  type?: string,
  path: string[],
  updateType?: UpdateType,
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
