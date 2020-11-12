import update from '../src/update'

describe('update()', () => {

  describe("Depth 0", () => {
    test("path=[] props=undefined", () => {
      const next = update({}, [], undefined)
      expect(next).toEqual({})
    })
    test("path=[] props=null", () => {
      const next = update({}, [], null)
      expect(next).toEqual({})
    })
    test("path=[] props=boolean", () => {
      const next = update({}, [], true)
      expect(next).toEqual({})
    })
    test("path=[] props=number", () => {
      const next = update({}, [], 42)
      expect(next).toEqual({})
    })
    test("path=[] props=string", () => {
      const next = update({}, [], 'string')
      expect(next).toEqual({})
    })
    test("path=[] props=array", () => {
      const next = update({}, [], [])
      expect(next).toEqual({})
    })
    test("path=[] props=object", () => {
      const next = update({}, [], {})
      expect(next).toEqual({})
    })
    test("path=[] props=Symbol", () => {
      const next = update({}, [], Symbol())
      expect(next).toEqual({})
    })
    test("path=[] props=Date", () => {
      const next = update({}, [], new Date())
      expect(next).toEqual({})
    })
    test("path=[] props={k: undefined}", () => {
      const next = update({}, [], {k: undefined})
      expect(next).toEqual({k: undefined})
    })
    test("path=[] props={k: null}", () => {
      const next = update({}, [], {k: null})
      expect(next).toEqual({k: null})
    })
    test("path=[] props={k: 0}", () => {
      const next = update({}, [], {k: 0})
      expect(next).toEqual({k: 0})
    })
    test("path=[] props={k: 'string'}", () => {
      const next = update({}, [], {k: 'string'})
      expect(next).toEqual({k: 'string'})
    })
    test("path=[] props={k: []}", () => {
      const next = update({}, [], {k: []})
      expect(next).toEqual({k: []})
    })
    test("path=[] props={k: {}}", () => {
      const next = update({}, [], {k: {}})
      expect(next).toEqual({k: {}})
    })
    test("path=[] props={a: {b: undefined}}", () => {
      const next = update({}, [], {a: {b: undefined}})
      expect(next).toEqual({a: {b: undefined}})
    })
    test("path=[] props={a: {b: null}}", () => {
      const next = update({}, [], {a: {b: undefined}})
      expect(next).toEqual({a: {b: undefined}})
    })
    test("path=[] props={a: {b: 0}}", () => {
      const next = update({}, [], {a: {b: undefined}})
      expect(next).toEqual({a: {b: undefined}})
    })
    test("path=[] props={a: {b: {}}}", () => {
      const next = update({}, [], {a: {b: {}}})
      expect(next).toEqual({a: {b: {}}})
    })
    test("path=[] props={a: {b: {c: undefined}}}", () => {
      const next = update({}, [], {a: {b: {c: undefined}}})
      expect(next).toEqual({a: {b: {c: undefined}}})
    })
    test("path=[] props={a: {b: {c: null}}}", () => {
      const next = update({}, [], {a: {b: {c: null}}})
      expect(next).toEqual({a: {b: {c: null}}})
    })
    test("path=[] props={a: {b: {c: 0}}}", () => {
      const next = update({}, [], {a: {b: {c: 0}}})
      expect(next).toEqual({a: {b: {c: 0}}})
    })
    test("path=[] props={a: {b: {c: 'string'}}}", () => {
      const next = update({}, [], {a: {b: {c: 'string'}}})
      expect(next).toEqual({a: {b: {c: 'string'}}})
    })
    test("path=[] props={a: {b: {c: {d: undefined}}}}", () => {
      const next = update({}, [], {a: {b: {c: {d: undefined}}}})
      expect(next).toEqual({a: {b: {c: {d: undefined}}}})
    })
    test("path=[] props={a: {b: {c: {d: null}}}}", () => {
      const next = update({}, [], {a: {b: {c: {d: null}}}})
      expect(next).toEqual({a: {b: {c: {d: null}}}})
    })
    test("path=[] props={a: {b: {c: {d: 0}}}}", () => {
      const next = update({}, [], {a: {b: {c: {d: 0}}}})
      expect(next).toEqual({a: {b: {c: {d: 0}}}})
    })
    test("path=[] props={a: {b: {c: {d: 'string'}}}}", () => {
      const next = update({}, [], {a: {b: {c: {d: 'string'}}}})
      expect(next).toEqual({a: {b: {c: {d: 'string'}}}})
    })
    test("path=[] props={a: {b: {c: {d: {}}}}}", () => {
      const next = update({}, [], {a: {b: {c: {d: {}}}}})
      expect(next).toEqual({a: {b: {c: {d: {}}}}})
    })
    test("path=[] props=undefined # With siblings", () => {
      const state = {a: {}, b: {}}
      const next = update(state, [], undefined)
      expect(next).toEqual({a: {}, b: {}})
    })
    test("path=[] props=null  # With siblings", () => {
      const state = {a: {}, b: {}}
      const next = update(state, [], null)
      expect(next).toEqual({a: {}, b: {}})
    })
  })

  describe("Depth 1", () => {
    test("path=[a] props=undefined", () => {
      const state = {a: {}, b: {}}
      const next = update(state, ['a'], undefined)
      expect(next).toEqual({a: undefined, b: {}})
    })
    test("path=[a] props=null", () => {
      const state = {a: {}, b: {}}
      const next = update(state, ['a'], null)
      expect(next).toEqual({a: null, b: {}})
    })
    test("path=[b] props=null", () => {
      const state = {a: {}, b: {}}
      const next = update(state, ['b'], null)
      expect(next).toEqual({a: {}, b: null})
    })
    test("path=[c] props=null", () => {
      const state = {a: {}, b: {}, c: {}}
      const next = update(state, ['c'], null)
      expect(next).toEqual({a: {}, b: {}, c: null})
    })
    test("path=[a] props=42", () => {
      const state = {a: {}, b: {}}
      const next = update(state, ['a'], 42)
      expect(next).toEqual({a: 42, b: {}})
    })
    test("path=[a] props={}", () => {
      const state = {a: {}, b: {}}
      const next = update(state, ['a'], {})
      expect(next).toEqual({a: {}, b: {}})
    })
    test("path=[a] props={x: null}", () => {
      const state = {a: {}, b: {}}
      const next = update(state, ['a'], {x: null})
      expect(next).toEqual({a: {x: null}, b: {}})
    })
    test("path=[a] props={x: {}}", () => {
      const state = {a: {}, b: {}}
      const next = update(state, ['a'], {x: {}})
      expect(next).toEqual({a: {x: {}}, b: {}})
    })
  })

  // describe("Depth 2", () => {
  //   test("['a', 'b'] props=undefined", () => {
  //     const state = {a: {b: {}}, x: {}}
  //     const next = update(state, ['a', 'b'], undefined)
  //     expect(next).toEqual({a: undefined, x: {}})
  //   })
  // })

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
