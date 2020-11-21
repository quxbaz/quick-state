import {Store, Transform, Listener} from './types'
import {traverse, update} from './object-util'

function createStore (initState: any): Store {
  let _state = initState
  const _listeners: Listener[] = []

  // Calls listeners.
  function _publish (...args: Parameters<Listener>) {
    _listeners.forEach(fn => fn(...args))
  }

  // Gets the current store state.
  const getState = () => _state

  /*
    Merges a transform object into the store state. Calls listeners. Returns
    the transformed slice of state with respect to the `path` property in
    `transform`.

    ::TODO::
    - Handle the case where transform.map is a function. evalTransform.
    - Handle batched transforms.
    - Tests.
    - Run _publish after batch.
  */
  const commit = (transform) => {
    if (Array.isArray(transform))
      transform.forEach(commit)
      // state transform.map(commit)
    const {path, map} = transform
    const prevState = _state
    const nextState = update(_state, path, map)
    _publish(prevState, nextState, transform)
    _state = nextState
    if (path == null)
      return _state
    return traverse(_state, path)
  }

  // ::TODO:: This should return an unsub function.
  const subscribe = (listener) => {
    _listeners.push(listener)
  }

  return {
    getState,
    commit,
    subscribe,
  }
}

export default createStore
