import {Store, Transform, Listener} from './types'
import {traverse, update} from './object-util'

function createStore (initState: any): Store {
  let _state = initState
  const _listeners: Listener[] = []

  // Calls listeners.
  function _publish (...args: Parameters<Listener>) {
    _listeners.forEach(fn => fn(...args))
  }

  // Updates the store state.
  function _commit (transform: Transform) {
    _state = update(_state, transform.path, transform.map)
  }

  return {
    // Gets the current store state.
    getState: () => _state,

    /*
      Merges a transform object into the store state. Calls listeners. Returns
      the transformed slice of state with respect to the `path` property in
      `transform`.

      ::TODO::
      - Handle the case where transform.map is a function. evalTransform.
    */
    commit (transform) {
      const prevState = _state
      if (Array.isArray(transform))
        transform.forEach(_commit)
      _commit(transform)
      _publish(prevState, _state, transform)
    },

    // ::TODO:: This should return an unsub function.
    subscribe (listener) {
      _listeners.push(listener)
    },
  }
}

export default createStore
