// describe('Basic tests', () => {
//   test("one", () => {
//     expect(1).toBe(1)
//   })
// })

const isObject = (value: any) => typeof value === 'object' && value.toString() === '[object Object]'

function mergeStateAtPath (object:any, path:any, state:any): any {

  // Error if accessing a non-existent path. New function. Use this or it'll get messy.
  // Error or require special flag if creating a new path.

  // You've arrived at the destination path.
  if (path.length === 0) {
    // Warn: Dynamically creating new top-level namespace. should declare a static namespace in
    // initial state to store argument
    // return isObject(state) ? {...object, ...state} : state
    return {...object, ...state}
  }

  const head = path[0]

  if (path.length === 1) {
    return {
      ...object,
      [head]: isObject(state) ? {...object[head], ...state} : state,
    }
  }

  return {
    ...object,
    [head]: {
      // ...object[head],
      ...mergeStateAtPath(
        object[head],
        path.slice(1),
        state
      ),
    },
  }

}

describe('mergeStateAtPath', () => {
  test("Basic merge", () => {
    const state: any = {
      lists: {
        '0': {id: '0', title: 'Title 0', length: 10},
        '1': {id: '1', title: 'Title 1', length: 20},
      },
      notes: {
        a: {id: 'a', text: 'Note A'},
        b: {id: 'b', text: 'Note B'},
      },
    }

    // const actual = mergeStateAtPath(
    //   state,
    //   ['lists', '0'],
    //   {title: 'New Title'}
    // )

    // const actual = mergeStateAtPath(
    //   state,
    //   ['lists', '0', 'title'],
    //   'TITLE 0'
    // )

    // const actual = mergeStateAtPath(
    //   state,
    //   ['lists', '0'],
    //   42
    // )

    // const actual = mergeStateAtPath(
    //   state,
    //   ['lists'],
    //   84
    // )

    // const actual = mergeStateAtPath(
    //   state,
    //   [],
    //   'new-path'
    // )

    // const actual = mergeStateAtPath(
    //   state,
    //   [],
    //   {'new-path': {'new': 'path'}}
    // )

    const actual = mergeStateAtPath(
      state,
      ['notes', 'c'],
      {id: 'c', text: 'Note C'}
    )

    // const actual = mergeStateAtPath(
    //   state,
    //   ['notes', 'c'],
    //   'c'
    // )

    console.log(actual)

    // const expected = {list: {id: '0', title: 'New Title', length: 10}}
    // expect(actual).toEqual(expected)

  })
})
