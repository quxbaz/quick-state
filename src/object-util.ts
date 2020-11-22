import {PlainObject, UpdateType} from './types'

const isObject = (value: any) => (
  Object.prototype.toString.call(value) === '[object Object]'
)

/*
  Traverse into an object given a path and return the value
  at that path.
*/
function traverse (object: PlainObject, path: string[]): any {
  if (path.length === 0 || object === undefined)
    return undefined
  const head = path[0]
  if (path.length === 1)
    return object[head]
  return traverse(object[head], path.slice(1))
}

/*
  Updates an object's value at a path and returns a new object.

  The most important state/store related function. It merges transform objects
  into the store state at the given `path`.

  It works by recursively traversing into `object` by reading each element of
  the `path` array.

  When the function has drilled down to the full `path`, it applies `props` to
  the value at that point.

  If `props` is an object, it will merge with the existing state. Otherwise, if
  `props` is a primitive or array, it will replace the existing state.

  `updateType` value is 'merge' by default. If you want to replace the state at
  `path`, pass in 'replace' instead. This parameter is only relevant when the
  value at `path` is an object. Arrays are always replaced.
*/
type Update = (object: PlainObject, path: string[], props: any, updateType?: UpdateType) => PlainObject
const update: Update = (object, path, props, updateType = 'merge') => {

  if (path.length === 0) {
    // Warning: You are dynamically creating a top-level namespace. Normally you
    // would define this in your initial state object. The only way you would
    // encounter this is if you passed `[]` as `path`.
    if (updateType === 'replace') {
      // Replace the value at `path` with `props`.
      return props
    } else {
      // Merge the existing value at `path` with `props`.
      return isObject(props) ? {...object, ...props} : {...object}
    }
  }

  const head = path[0]

  if (path.length === 1) {
    // The BASE CONDITION. You've fully traversed `object` by way of evaluating
    // each element in `path`. Updates the value at the destination.
    if (updateType === 'replace') {
      // Replace the value at `path` with `props`.
      return {...object, [head]: props}
    } else {
      // Merge the existing value at `path` with `props`.
      return {...object, [head]: isObject(props) ? {...object[head], ...props} : props}
    }
  }

  return {
    ...object,
    [head]: {
      // The RECURSIVE STEP. Spread the current properties and traverse into the
      // head of `path`.
      ...update(
        object[head],
        path.slice(1),
        props,
        updateType,
      ),
    },
  }

}

export {
  traverse,
  update,
}
