import {Key, PlainObject} from './types'

const isObject = (value: any) => (
  typeof value === 'object' && value.toString() === '[object Object]'
)

/*
  The most important state/store related function. It merges
  transforms into the store state at the given `path`.

  It works by recursively traversing into `object` by reading each
  element of the `path` array.

  When the function has drilled down to the full `path`, it applies
  `state` to the value at that point.

  If `state` is an object, it will merge with the existing
  state. Otherwise, if `state` is a primitive or array, it will
  replace the existing state.
*/
function update (object: PlainObject, path: Key[], state: any): PlainObject {

  if (path.length === 0) {
    // Warning: You are dynamically creating a top-level namespace. Normally you
    // would define this in your initial state object.
    return {...object, ...state}
  }

  const head: Key = path[0]

  if (path.length === 1) {
    // The base condition. You've finally traversed `object` by way of
    // evaluating each element in `path`. Update the value at the
    // destination.
    return {
      ...object,
      [head]: isObject(state) ? {...object[head], ...state} : state,
    }
  }

  // The recursive step. Spread the current properties and traverse
  // into the head of `path`.
  return {
    ...object,
    [head]: {
      ...update(
        object[head],
        path.slice(1),
        state
      ),
    },
  }

}

export default update
