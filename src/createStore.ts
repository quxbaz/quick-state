/*
  createStore :: (initState: object) -> Store

  Creates a store instance with the following properties.

    getState :: () -> stateObject
    -- Returns the store state.

    commit :: (transform) -> void
    -- Commits a transform object and updates the store state.

    subscribe :: (listener) -> unsubFn
    -- Subscribe a listener that is called on commit. Returns a function you can
       call to unsubscribe the listener.
*/

import {Store, Transform, Listener} from './types'
import {traverse, update} from './object-util'

function createStore (initState: object): Store {
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
    _state = update(_state, path, props, transform.updateType)
  }

  // The store instance.
  return {
    // Internal state. Expose only for the purpose of testing.
    _state,
    _listeners,

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
      _publish(_state, prevState, transform)
    },

    subscribe (listener) {
      _listeners.push(listener)
      // Returns an unsub function, that returns the unsubbed listener.
      return () => _listeners.splice(_listeners.indexOf(listener), 1)[0]
    },
  }
}

export default createStore
