import {traverse, update} from '../src/object-util'

// Helper functions

type Key = string | number
type Obj<T> = Record<Key, T>

/**
 * Omits props from an object and returns a new object.
 *
 * @param {object} obj
 * @param {...string} props
 *
 * @return {object}
 */
const omit = <T>(obj: Obj<T>, ...keys: Key[]): typeof obj => {
  const o: typeof obj = {...obj}
  keys.forEach(key => delete o[key])
  return o
}

// End helper functions

describe("traverse", () => {
  test("Identity check", () => {
    const state = {a: {b: {c: {d: {e: {}}}}}}
    expect(traverse(state, ['a'])).toBe(state.a)
    expect(traverse(state, ['a', 'b'])).toBe(state.a.b)
    expect(traverse(state, ['a', 'b', 'c'])).toBe(state.a.b.c)
    expect(traverse(state, ['a', 'b', 'c', 'd'])).toBe(state.a.b.c.d)
    expect(traverse(state, ['a', 'b', 'c', 'd', 'e'])).toBe(state.a.b.c.d.e)
  })
  test("object={} path=[]", () => {
    expect(
      traverse({}, [])
    ).toBe(undefined)
  })
  test("object={a: 1} path=['z']", () => {
    expect(
      traverse({a: 1}, ['z'])
    ).toBe(undefined)
  })
  test("object={a: 1} path=['x']", () => {
    expect(
      traverse({a: 1}, ['x'])
    ).toBe(undefined)
  })
  test("object={a: 1} path=['x', 'y']", () => {
    expect(
      traverse({a: 1}, ['x', 'y'])
    ).toBe(undefined)
  })
  test("object={a: 1} path=['x', 'y', 'z']", () => {
    expect(
      traverse({a: 1}, ['x', 'y', 'z'])
    ).toBe(undefined)
  })
  test("object={a: 1} path=['a']", () => {
    expect(
      traverse({a: 1}, ['a'])
    ).toBe(1)
  })
  test("object={a: 1, b: 2} path=['a']", () => {
    expect(
      traverse({a: 1, b: 2}, ['a'])
    ).toBe(1)
  })
  test("object={a: 1, b: 2, c: 3} path=['a']", () => {
    expect(
      traverse({a: 1, b: 2, c: 3}, ['a'])
    ).toBe(1)
  })
  test("object={a: 1, b: 2, c: 3} path=['b']", () => {
    expect(
      traverse({a: 1, b: 2, c: 3}, ['b'])
    ).toBe(2)
  })
  test("object={a: 1, b: 2, c: 3} path=['c']", () => {
    expect(
      traverse({a: 1, b: 2, c: 3}, ['c'])
    ).toBe(3)
  })
  test("object={a: {b: 2}} path=['a']", () => {
    expect(
      traverse({a: {b: 2}}, ['a'])
    ).toEqual({b: 2})
  })
  test("object={a: {b: 2}, c: 3} path=['a']", () => {
    expect(
      traverse({a: {b: 2}, c: 3}, ['a'])
    ).toEqual({b: 2})
  })
  test("object={a: {b: 2}} path=['a', 'b']", () => {
    expect(
      traverse({a: {b: 2}}, ['a', 'b'])
    ).toBe(2)
  })
  test("object={a: {b: 2}} path=['a', 'b', 'c']", () => {
    expect(
      traverse({a: {b: 2}}, ['a', 'b', 'c'])
    ).toBe(undefined)
  })
  test("object={a: {b: 2}} path=['a', 'b', 'd']", () => {
    expect(
      traverse({a: {b: 2}}, ['a', 'b', 'c', 'd'])
    ).toBe(undefined)
  })
  test("object={a: {b: {c: 3}} path=[]", () => {
    expect(
      traverse({a: {b: 2}}, [])
    ).toBe(undefined)
  })
  test("object={a: {b: {c: 3}} path=['x']", () => {
    expect(
      traverse({a: {b: 2}}, ['x'])
    ).toBe(undefined)
  })
  test("object={a: {b: {c: 3}} path=['x', 'y']", () => {
    expect(
      traverse({a: {b: 2}}, ['x', 'y'])
    ).toBe(undefined)
  })
  test("object={a: {b: {c: 3}} path=['a']", () => {
    const state = {a: {b: {c: 3}}}
    expect(traverse(state, ['a'])).toBe(state.a)
    expect(traverse(state, ['a'])).toEqual({b: {c: 3}})
  })
  test("object={a: {b: {c: 3}} path=['a', 'b']", () => {
    const state = {a: {b: {c: 3}}}
    expect(traverse(state, ['a', 'b'])).toBe(state.a.b)
    expect(traverse(state, ['a', 'b'])).toEqual({c: 3})
  })
  test("object={a: {b: {c: 3}} path=['a', 'b', 'c']", () => {
    const state = {a: {b: {c: 3}}}
    expect(traverse(state, ['a', 'b', 'c'])).toBe(state.a.b.c)
    expect(traverse(state, ['a', 'b', 'c'])).toEqual(3)
  })
})

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
    test("Depth=3", () => {
      const state = {a: {b: {c: {}}}}
      const next = update(state, [], null)
      expect(next).toEqual(state)
      expect(next).not.toBe(state)
      expect(next.a).toBe(state.a)
      expect(next.a.b).toBe(state.a.b)
      expect(next.a.b.c).toBe(state.a.b.c)
    })
    test("Depth=3", () => {
      const state = {a: {b: {c: {}}}}
      const next = update(state, ['a', 'b', 'c'], {})
      expect(next).toEqual(state)
      expect(next).not.toBe(state)
      expect(next.a).not.toBe(state.a)
      expect(next.a.b).not.toBe(state.a.b)
      expect(next.a.b.c).not.toBe(state.a.b.c)
    })
    test("Depth=4", () => {
      const state = {a: {b: {c: {d: {}}}}}
      const next = update(state, [], null)
      expect(next).toEqual(state)
      expect(next).not.toBe(state)
      expect(next.a).toBe(state.a)
      expect(next.a.b).toBe(state.a.b)
      expect(next.a.b.c).toBe(state.a.b.c)
      expect(next.a.b.c.d).toBe(state.a.b.c.d)
    })
    test("Depth=4", () => {
      const state = {a: {b: {c: {d: {}}}}}
      const next = update(state, ['a', 'b', 'c', 'd'], {})
      expect(next).toEqual(state)
      expect(next).not.toBe(state)
      expect(next.a).not.toBe(state.a)
      expect(next.a.b).not.toBe(state.a.b)
      expect(next.a.b.c).not.toBe(state.a.b.c)
      expect(next.a.b.c.d).not.toBe(state.a.b.c.d)
    })
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

  describe("updateType: 'replace'", () => {
    const state = {
      lists: {
        0: {id: 0, title: 'list-0'},
        1: {id: 1, title: 'list-1'},
      },
      notes: {
        a: {id: 'a', title: 'note-0'},
        b: {id: 'b', title: 'note-1'},
      },
    }
    test("test", () => {
      const next = update(state, [], {}, 'replace')
      expect(next).toEqual({})
    })
    test("test", () => {
      const next = update(state, [], {foo: 'bar'}, 'replace')
      expect(next).toEqual({foo: 'bar'})
    })
    test("test", () => {
      const next = update(state, ['lists'], {}, 'replace')
      expect(next).toEqual({
        lists: {},
        notes: {a: {id: 'a', title: 'note-0'}, b: {id: 'b', title: 'note-1'}},
      })
    })
    test("test", () => {
      const next = update(state, ['lists'], null, 'replace')
      expect(next).toEqual({
        lists: null,
        notes: {a: {id: 'a', title: 'note-0'}, b: {id: 'b', title: 'note-1'}},
      })
    })
    test("test", () => {
      const next = update(state, ['notes'], null, 'replace')
      expect(next).toEqual({
        lists: {0: {id: 0, title: 'list-0'}, 1: {id: 1, title: 'list-1'}},
        notes: null,
      })
    })
    test("test", () => {
      const next = update(state, ['lists', '0'], null, 'replace')
      expect(next).toEqual({
        lists: {0: null, 1: {id: 1, title: 'list-1'}},
        notes: {a: {id: 'a', title: 'note-0'}, b: {id: 'b', title: 'note-1'}},
      })
    })
    test("test", () => {
      const next = update(state, ['lists', '0'], {}, 'replace')
      expect(next).toEqual({
        lists: {0: {}, 1: {id: 1, title: 'list-1'}},
        notes: {a: {id: 'a', title: 'note-0'}, b: {id: 'b', title: 'note-1'}},
      })
    })
    test("test", () => {
      const next = update(state, ['lists', '0'], {foo: 'bar'}, 'replace')
      expect(next).toEqual({
        lists: {0: {foo: 'bar'}, 1: {id: 1, title: 'list-1'}},
        notes: {a: {id: 'a', title: 'note-0'}, b: {id: 'b', title: 'note-1'}},
      })
    })
    test("test", () => {
      const next = update(state, ['lists', '0', 'title'], 'New Title', 'replace')
      expect(next).toEqual({
        lists: {0: {id: 0, title: 'New Title'}, 1: {id: 1, title: 'list-1'}},
        notes: {a: {id: 'a', title: 'note-0'}, b: {id: 'b', title: 'note-1'}},
      })
    })
  })

  describe("Arrays are replaced, not mutated", () => {
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
    test("[1] -> [2]", () => {
      const state = {a: [1]}
      const next = update(state, ['a'], [2])
      expect(next).toEqual({a: [2]})
      expect(next).not.toBe(state)
      expect(next.a).not.toBe(state.a)
    })
    test("[1] -> [1, 2]", () => {
      const state = {a: [1]}
      const next = update(state, ['a'], [1, 2])
      expect(next).toEqual({a: [1, 2]})
      expect(next).not.toBe(state)
      expect(next.a).not.toBe(state.a)
    })
  })

  describe("Somewhat arbitrary tests with more realistic data", () => {
    const state = {
      lists: {
        0: {id: '0', title: 'Food', notes: ['a', 'b']},
        1: {id: '1', title: 'Chores', notes: ['c', 'd']},
        2: {id: '2', title: 'Gifts', notes: ['e', 'f']},
      },
      notes: {
        a: {id: 'a', text: 'Carrots'},
        b: {id: 'b', text: 'Cake'},
        c: {id: 'c', text: 'Vacuum'},
        d: {id: 'd', text: 'Clean bathroom'},
        e: {id: 'e', text: 'Earrings'},
        f: {id: 'e', text: 'Necklace'},
      },
    }
    test("test", () => {
      const next = update(state, ['lists', '0'], {title: null})
      expect(next).toEqual({
        ...state, lists: {...state.lists, 0: {...state.lists[0], title: null}},
      })
    })
    test("test", () => {
      const next = update(state, ['lists', '0'], {title: 'FOOD'})
      expect(next).toEqual({
        ...state, lists: {...state.lists, 0: {...state.lists[0], title: 'FOOD'}},
      })
    })
    test("test", () => {
      const next = update(state, ['lists', '1'], {title: 'CHORES', isDone: false})
      expect(next).toEqual({
        ...state, lists: {...state.lists, 1: {...state.lists[1], title: 'CHORES', isDone: false}},
      })
    })
    test("test", () => {
      const next = update(state, ['lists', '0'], {notes: ['a', 'b', 'c']})
      expect(next).toEqual({
        ...state, lists: {...state.lists, 0: {...state.lists[0], notes: ['a', 'b', 'c']}},
      })
    })
    test("test", () => {
      const next = update(state, ['lists', '3'], {id: '3', title: 'Tools', notes: []})
      expect(next).toEqual({
        ...state, lists: {...state.lists, 3: {id: '3', title: 'Tools', notes: []}},
      })
    })
    test("test", () => {
      const next = update(state, ['lists', '0', 'title'], 'FOOD')
      expect(next).toEqual({
        ...state, lists: {...state.lists, 0: {id: '0', title: 'FOOD', notes: ['a', 'b']}},
      })
    })
    test("test", () => {
      const next = update(state, ['lists', '0'], {hello: 'world'}, 'replace')
      expect(next).toEqual({
        ...state, lists: {...state.lists, 0: {hello: 'world'}},
      })
    })
    test("test", () => {
      const next = update(state, ['lists'], omit(state.lists, '2'), 'replace')
      expect(next).toEqual({
        ...state,
        lists: {
          0: {id: '0', title: 'Food', notes: ['a', 'b']},
          1: {id: '1', title: 'Chores', notes: ['c', 'd']},
        },
      })
    })
  })

})
