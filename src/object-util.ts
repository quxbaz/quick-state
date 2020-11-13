import {Path, PlainObject} from './types'

const isObject = (value: any) => (
  Object.prototype.toString.call(value) === '[object Object]'
)

function traverse (object: PlainObject, path: Path) {

}

/*
  Updates an object's value at a path and returns a new object.

  The most important state/store related function. It merges
  transform objects into the store state at the given `path`.

  It works by recursively traversing into `object` by reading each
  element of the `path` array.

  When the function has drilled down to the full `path`, it applies
  `props` to the value at that point.

  If `props` is an object, it will merge with the existing
  state. Otherwise, if `props` is a primitive or array, it will
  replace the existing state.
*/
function update (object: PlainObject, path: Path, props: any): PlainObject {

  if (path.length === 0) {
    // Warning: You are dynamically creating a top-level
    // namespace. Normally you would define this in your initial state
    // object. The only way you would encounter this is if you passed
    // `[]` as `path`.
    return isObject(props) ? {...object, ...props} : {...object}
  }

  const head = path[0]

  if (path.length === 1) {
    // The BASE CONDITION. You've fully traversed `object` by way of
    // evaluating each element in `path`. Updates the value at the
    // destination.
    return {
      ...object,
      [head]: isObject(props) ? {...object[head], ...props} : props,
    }
  }

  // The RECURSIVE STEP. Spread the current properties and traverse
  // into the head of `path`.
  return {
    ...object,
    [head]: {
      ...update(
        object[head],
        path.slice(1),
        props
      ),
    },
  }

}

export {
  traverse,
  update,
}
