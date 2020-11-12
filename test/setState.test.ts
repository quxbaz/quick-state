import update from '../src/update'

describe('update()', () => {

  describe("Root merge", () => {
    test("undefined", () => {
      const nextState = update({}, [], undefined)
      expect(nextState).toEqual({})
    })
    test("null", () => {
      const nextState = update({}, [], null)
      expect(nextState).toEqual({})
    })
    test("boolean", () => {
      const nextState = update({}, [], true)
      expect(nextState).toEqual({})
    })
    test("number", () => {
      const nextState = update({}, [], 42)
      expect(nextState).toEqual({})
    })
    test("string", () => {
      const nextState = update({}, [], 'string')
      expect(nextState).toEqual({})
    })
    test("array", () => {
      const nextState = update({}, [], [])
      expect(nextState).toEqual({})
    })
    test("object", () => {
      const nextState = update({}, [], {})
      expect(nextState).toEqual({})
    })
    test("Symbol", () => {
      const nextState = update({}, [], Symbol())
      expect(nextState).toEqual({})
    })
    test("Date", () => {
      const nextState = update({}, [], new Date())
      expect(nextState).toEqual({})
    })
    test("{k: undefined}", () => {
      const nextState = update({}, [], {k: undefined})
      expect(nextState).toEqual({k: undefined})
    })
    test("{k: null}", () => {
      const nextState = update({}, [], {k: null})
      expect(nextState).toEqual({k: null})
    })
    test("{k: 0}", () => {
      const nextState = update({}, [], {k: 0})
      expect(nextState).toEqual({k: 0})
    })
    test("{k: 'string'}", () => {
      const nextState = update({}, [], {k: 'string'})
      expect(nextState).toEqual({k: 'string'})
    })
    test("{k: []}", () => {
      const nextState = update({}, [], {k: []})
      expect(nextState).toEqual({k: []})
    })
    test("{k: {}}", () => {
      const nextState = update({}, [], {k: {}})
      expect(nextState).toEqual({k: {}})
    })
    test("{a: {b: undefined}}", () => {
      const nextState = update({}, [], {a: {b: undefined}})
      expect(nextState).toEqual({a: {b: undefined}})
    })
    test("{a: {b: null}}", () => {
      const nextState = update({}, [], {a: {b: undefined}})
      expect(nextState).toEqual({a: {b: undefined}})
    })
    test("{a: {b: 0}}", () => {
      const nextState = update({}, [], {a: {b: undefined}})
      expect(nextState).toEqual({a: {b: undefined}})
    })
    test("{a: {b: {}}}", () => {
      const nextState = update({}, [], {a: {b: {}}})
      expect(nextState).toEqual({a: {b: {}}})
    })
    test("{a: {b: {c: undefined}}}", () => {
      const nextState = update({}, [], {a: {b: {c: undefined}}})
      expect(nextState).toEqual({a: {b: {c: undefined}}})
    })
    test("{a: {b: {c: null}}}", () => {
      const nextState = update({}, [], {a: {b: {c: null}}})
      expect(nextState).toEqual({a: {b: {c: null}}})
    })
    test("{a: {b: {c: 0}}}", () => {
      const nextState = update({}, [], {a: {b: {c: 0}}})
      expect(nextState).toEqual({a: {b: {c: 0}}})
    })
    test("{a: {b: {c: 'string'}}}", () => {
      const nextState = update({}, [], {a: {b: {c: 'string'}}})
      expect(nextState).toEqual({a: {b: {c: 'string'}}})
    })
    test("{a: {b: {c: {d: undefined}}}}", () => {
      const nextState = update({}, [], {a: {b: {c: {d: undefined}}}})
      expect(nextState).toEqual({a: {b: {c: {d: undefined}}}})
    })
    test("{a: {b: {c: {d: null}}}}", () => {
      const nextState = update({}, [], {a: {b: {c: {d: null}}}})
      expect(nextState).toEqual({a: {b: {c: {d: null}}}})
    })
    test("{a: {b: {c: {d: 0}}}}", () => {
      const nextState = update({}, [], {a: {b: {c: {d: 0}}}})
      expect(nextState).toEqual({a: {b: {c: {d: 0}}}})
    })
    test("{a: {b: {c: {d: 'string'}}}}", () => {
      const nextState = update({}, [], {a: {b: {c: {d: 'string'}}}})
      expect(nextState).toEqual({a: {b: {c: {d: 'string'}}}})
    })
    test("{a: {b: {c: {d: {}}}}}", () => {
      const nextState = update({}, [], {a: {b: {c: {d: {}}}}})
      expect(nextState).toEqual({a: {b: {c: {d: {}}}}})
    })
  })

  describe("Sibling update - Depth 1", () => {
    test("jk", () => {
      expect(1).toEqual(1)
    })
    // test("Nested merge", () => {
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
    // })
  })


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
