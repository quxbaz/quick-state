import update from '../src/update'

describe('update()', () => {

  describe("Returns new object", () => {
    test("Depth=0", () => {
      const state = {}
      const next = update(state, [], null)
      expect(next).toEqual({})
      expect(next).not.toBe(state)
    })
    test("Depth=0", () => {
      const state = {a: 1}
      const next = update(state, [], null)
      expect(next).toEqual({a: 1})
      expect(next).not.toBe(state)
    })
    test("Depth=0", () => {
      const state = {a: {}}
      const next = update(state, [], null)
      expect(next).toEqual({a: {}})
      expect(next).not.toBe(state)
    })
    test("Depth=0 Children=2", () => {
      const state = {a: 1, b: 2}
      const next = update(state, [], null)
      expect(next).toEqual({a: 1, b: 2})
      expect(next).not.toBe(state)
    })
    test("Depth=0 Children=3", () => {
      const state = {a: 1, b: 2, c: 3}
      const next = update(state, [], null)
      expect(next).toEqual({a: 1, b: 2, c: 3})
      expect(next).not.toBe(state)
    })
    test("Depth=1", () => {
      const state = {a: {}}
      const next = update(state, [], null)
      expect(next).toEqual(state)
      expect(next).not.toBe(state)
      expect(next.a).toBe(state.a)
    })
    test("Depth=1", () => {
      const state = {a: {}}
      const next = update(state, ['a'], {})
      expect(next).toEqual(state)
      expect(next).not.toBe(state)
      expect(next.a).not.toBe(state.a)
    })
    test("Depth=2", () => {
      const state = {a: {b: {}}}
      const next = update(state, [], null)
      expect(next).toEqual(state)
      expect(next).not.toBe(state)
      expect(next.a).toBe(state.a)
      expect(next.a.b).toBe(state.a.b)
    })
    test("Depth=2", () => {
      const state = {a: {b: {}}}
      const next = update(state, ['a'], state.a)
      expect(next).toEqual(state)
      expect(next).not.toBe(state)
      expect(next.a).not.toBe(state.a)
      expect(next.a.b).toBe(state.a.b)
    })
    test("Depth=2", () => {
      const state = {a: {b: {}}}
      const next = update(state, ['a', 'b'], state.a.b)
      expect(next).toEqual(state)
      expect(next).not.toBe(state)
      expect(next.a).not.toBe(state.a)
      /*
        This one is a little funny. Even though we set:
          state[a][b] = c
        The end result does not pass reference equality because we end
        up destructuring the empty object in update(). Most likely
        this will affect nothing because `props` will always take some
        value. If it comes to the case where we need to alter this
        behavior and return the same object that was passed, that's
        fine.
      */
      expect(next.a.b).not.toBe(state.a.b)
    })
    test("Depth=2 -- With children at root", () => {
      const state = {a: {b: {}}, x: {}}
      const next = update(state, ['a'], state.a)
      expect(next).toEqual(state)
      expect(next).not.toBe(state)
      expect(next.a).not.toBe(state.a)
      expect(next.a.b).toBe(state.a.b)
      expect(next.x).toBe(state.x)
    })
    test("Depth=2 -- With children at root", () => {
      const state = {a: {b: {}}, x: {}, y: {}}
      const next = update(state, ['a'], state.a)
      expect(next).toEqual(state)
      expect(next).not.toBe(state)
      expect(next.a).not.toBe(state.a)
      expect(next.a.b).toBe(state.a.b)
      expect(next.x).toBe(state.x)
      expect(next.y).toBe(state.y)
    })

    // test("Depth=2", () => {
    //   const state = {a: {b: {}}}
    //   const next = update(state, [], null)
    //   expect(next).toEqual(state)
    //   expect(next).not.toBe(state)
    //   expect(next.a).toBe(state.a)
    //   expect(next.a.b).toBe(state.a.b)
    // })

  })

  describe("Depth=0", () => {
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
    test("path=[] props=undefined  -- With siblings", () => {
      const state = {a: {}, b: {}}
      const next = update(state, [], undefined)
      expect(next).toEqual({a: {}, b: {}})
    })
    test("path=[] props=null  -- With siblings", () => {
      const state = {a: {}, b: {}}
      const next = update(state, [], null)
      expect(next).toEqual({a: {}, b: {}})
    })
  })

  describe("Depth=1", () => {
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

  describe("Depth=2", () => {
    test("path=['a', 'b'] props=undefined", () => {
      const state = {a: {b: {}}, x: {}}
      const next = update(state, ['a', 'b'], undefined)
      expect(next).toEqual({a: {b: undefined}, x: {}})
    })
    test("path=['a', 'b'] props=null", () => {
      const state = {a: {b: {}}, x: {}}
      const next = update(state, ['a', 'b'], null)
      expect(next).toEqual({a: {b: null}, x: {}})
    })
    test("path=['a', 'b'] props=42", () => {
      const state = {a: {b: {}}, x: {}}
      const next = update(state, ['a', 'b'], 42)
      expect(next).toEqual({a: {b: 42}, x: {}})
    })
    test("path=['a', 'b'] props={}", () => {
      const state = {a: {b: {}}, x: {}}
      const next = update(state, ['a', 'b'], {})
      expect(next).toEqual({a: {b: {}}, x: {}})
    })
    test("path=['a', 'b'] props='string'", () => {
      const state = {a: {b: {}}, x: {}}
      const next = update(state, ['a', 'b'], 'string')
      expect(next).toEqual({a: {b: 'string'}, x: {}})
    })
    test("path=['a', 'b'] props=null  -- With depth 2 sibling", () => {
      const state = {a: {b: {}, c: {}}, x: {}}
      const next = update(state, ['a', 'b'], null)
      expect(next).toEqual({a: {b: null, c: {}}, x: {}})
    })
    test("path=['a', 'b'] props=null  -- With existing state", () => {
      const state = {a: {b: {0: 'zero', 1: 'one'}}, x: {}}
      const next = update(state, ['a', 'b'], null)
      expect(next).toEqual({a: {b: null}, x: {}})
    })
    test("path=['a', 'b'] props={0: 'zero', 1: 'one'}  -- Props same as existing state", () => {
      const state = {a: {b: {0: 'zero', 1: 'one'}}, x: {}}
      const next = update(state, ['a', 'b'], {0: 'zero', 1: 'one'})
      expect(next).toEqual({a: {b: {0: 'zero', 1: 'one'}}, x: {}})
    })
    test("path=['a', 'b'] props={0: 'ZERO'}", () => {
      const state = {a: {b: {0: 'zero', 1: 'one'}}, x: {}}
      const next = update(state, ['a', 'b'], {0: 'ZERO'})
      expect(next).toEqual({a: {b: {0: 'ZERO', 1: 'one'}}, x: {}})
    })
    test("path=['a', 'b'] props={1: 'ONE'}", () => {
      const state = {a: {b: {0: 'zero', 1: 'one'}}, x: {}}
      const next = update(state, ['a', 'b'], {1: 'ONE'})
      expect(next).toEqual({a: {b: {0: 'zero', 1: 'ONE'}}, x: {}})
    })
    test("path=['a', 'b'] props={0: 'ZERO', 1: 'ONE'}", () => {
      const state = {a: {b: {0: 'zero', 1: 'one'}}, x: {}}
      const next = update(state, ['a', 'b'], {0: 'ZERO', 1: 'ONE'})
      expect(next).toEqual({a: {b: {0: 'ZERO', 1: 'ONE'}}, x: {}})
    })
  })

  describe("Arrays are overwritten, not merged", () => {

    test("[] -> []", () => {
      const state = {a: []}
      const next = update(state, ['a'], [])
      expect(next).toEqual({a: []})
    })

    test("[1] -> [1]", () => {
      const state = {a: [1]}
      const next = update(state, ['a'], [1])
      expect(next).toEqual({a: [1]})
      expect(next).not.toBe(state)
      expect(next.a).not.toBe(state.a)
    })

  })

})
