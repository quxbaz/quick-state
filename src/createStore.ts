import {Store} from './types'
import {traverse, update} from './object-util'

function createStore (initState: any): Store {
  let _state = initState
  return {
    // Gets the current store state.
    getState: () => _state,

    // Merges a transform object into the store state. Returns the transformed
    // slice of state respective of the `path` property in `transform`.
    commit: (transform) => {
      const {name, path, props} = transform
      _state = update(_state, path, props)
      return traverse(_state, path)
    }
  }
}

export default createStore
