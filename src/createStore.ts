import {Store, Listener} from './types'
import {traverse, update} from './object-util'

function createStore (initState: any): Store {
  let _state = initState
  const _listeners: Listener[] = []

  // Calls listeners.
  function _publish (...args: Parameters<Listener>) {
    _listeners.forEach(fn => fn(...args))
  }

  return {
    // Gets the current store state.
    getState: () => _state,

    /*
      Merges a transform object into the store state. Calls listeners. Returns
      the transformed slice of state with respect to the `path` property in
      `transform`.

      ::TODO::
      - Handle the case where transform.props is a function. evalTransform.
      - Handle batched transforms.
      - Tests.
      - Should _publish run after batch or each transform?
    */
    commit: (transform) => {
      const {path, props} = transform
      const prevState = _state
      _state = update(_state, path, props)  // The next state.
      _publish(prevState, _state, transform)
      return traverse(_state, path)
    },

    // ::TODO:: This should return an unsub function.
    subscribe (listener) {
      _listeners.push(listener)
    },
  }
}

export default createStore
