import update from '../src/update'

describe('update', () => {

  test("Root merge undefined.", () => {
    const nextState = update({}, [], undefined)
    expect(nextState).toEqual({})
  })

  test("Root merge null.", () => {
    const nextState = update({}, [], null)
    expect(nextState).toEqual({})
  })

  test("Root merge boolean.", () => {
    const nextState = update({}, [], true)
    expect(nextState).toEqual({})
  })

  test("Root merge number.", () => {
    const nextState = update({}, [], 42)
    expect(nextState).toEqual({})
  })

  test("Root merge string.", () => {
    const nextState = update({}, [], 'string')
    expect(nextState).toEqual({})
  })

  test("Root merge array.", () => {
    const nextState = update({}, [], [])
    expect(nextState).toEqual({})
  })

  test("Root merge empty object.", () => {
    const nextState = update({}, [], {})
    expect(nextState).toEqual({})
  })

  test("Root merge symbol.", () => {
    const nextState = update({}, [], Symbol())
    expect(nextState).toEqual({})
  })

  test("Root merge date.", () => {
    const nextState = update({}, [], new Date())
    expect(nextState).toEqual({})
  })

  test("Root merge non-empty object.", () => {
    const nextState = update({}, [], {foo: undefined})
    expect(nextState).toEqual({foo: undefined})
  })

  // ::RESUME::
  // test("Root merge non-empty object.", () => {
  //   const nextState = update({}, [], {foo: undefined})
  //   expect(nextState).toEqual({foo: undefined})
  // })

  // test("Basic merge", () => {
  //   const state: any = {
  //     lists: {
  //       '0': {id: '0', title: 'Title 0', length: 10},
  //       '1': {id: '1', title: 'Title 1', length: 20},
  //     },
  //     notes: {
  //       a: {id: 'a', text: 'Note A'},
  //       b: {id: 'b', text: 'Note B'},
  //     },
  //   }

  //   // const actual = update(
  //   //   state,
  //   //   ['lists', '0'],
  //   //   {title: 'New Title'}
  //   // )

  //   // const actual = update(
  //   //   state,
  //   //   ['lists', '0', 'title'],
  //   //   'TITLE 0'
  //   // )

  //   // const actual = update(
  //   //   state,
  //   //   ['lists', '0'],
  //   //   42
  //   // )

  //   // const actual = update(
  //   //   state,
  //   //   ['lists'],
  //   //   84
  //   // )

  //   // const actual = update(
  //   //   state,
  //   //   [],
  //   //   'new-path'
  //   // )

  //   // const actual = update(
  //   //   state,
  //   //   [],
  //   //   {'new-path': {'new': 'path'}}
  //   // )

  //   const actual = update(
  //     state,
  //     ['notes', 'c'],
  //     {id: 'c', text: 'Note C'}
  //   )

  //   // const actual = update(
  //   //   state,
  //   //   ['notes', 'c'],
  //   //   'c'
  //   // )

  //   // const expected = {list: {id: '0', title: 'New Title', length: 10}}
  //   // expect(actual).toEqual(expected)

  // })
})
