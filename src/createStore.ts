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
    let {path, props} = transform
    if (typeof props === 'function') {
      props = props(
        path.length === 0 ? _state : traverse(_state, path),
        _state
      )
    }
    _state = update(_state, path, props)
  }

  return {
    // Gets the current store state.
    getState: () => _state,

    /*
      Merges a transform object into the store state. Calls listeners. Returns
      the transformed slice of state with respect to the `path` property in `transform`.
    */
    commit (transform) {
      const prevState = _state
      if (Array.isArray(transform))
        transform.forEach(_commit)
      else
        _commit(transform)
      _publish(prevState, _state, transform)
    },

    subscribe (listener) {
      _listeners.push(listener)
      // Returns an unsub function, that returns the unsubbed listener.
      return () => _listeners.splice(_listeners.indexOf(listener), 1)[0]
    },
  }
}

export default createStore
