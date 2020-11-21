import createStore from '../src/createStore'

describe("createStore", () => {

  describe("Instantiation", () => {
    test("It creates without error", () => {
      createStore({})
      createStore({a: 1})
      createStore({a: 1, b: 2})
    })
  })

  describe("store.getState()", () => {
    test("It returns the store state", () => {
      const state = {}
      const store = createStore(state)
      expect(store.getState()).toBe(state)
      expect(store.getState()).toEqual({})
    })
    test("It returns the store state", () => {
      const state = {a: 1}
      const store = createStore(state)
      expect(store.getState()).toEqual({a: 1})
    })
  })

  describe("store.commit()", () => {
    test("Gets empty state from empty transform", () => {
      const store = createStore({})
      store.commit({path: [], props: {}})
      expect(store.getState()).toEqual({})
    })
    test("Returns undefined.", () => {
      const store = createStore({})
      expect(store.commit({path: [], props: {}})).toBe(undefined)
    })
    test("{props: {a: 1}}", () => {
      const store = createStore({})
      store.commit({path: [], props: {a: 1}})
      expect(store.getState()).toEqual({a: 1})
    })
    test("{props: {a: 2}}", () => {
      const store = createStore({})
      store.commit({path: [], props: {a: 2}})
      expect(store.getState()).toEqual({a: 2})
    })
    test("Commit", () => {
      const store = createStore({users: {}})
      store.commit({
        path: ['users'],
        props: {1: {id: 1, name: 'foo'}}
      })
      expect(store.getState()).toEqual({
        users: {1: {id: 1, name: 'foo'}}
      })
    })
    test("Commit", () => {
      const store = createStore({users: {}})
      store.commit({
        path: ['users', '1'],
        props: {id: 1, name: 'foo'}
      })
      expect(store.getState()).toEqual({
        users: {1: {id: 1, name: 'foo'}}
      })
    })
    test("Commit", () => {
      const store = createStore({users: {}, notes: {}})
      store.commit({
        path: ['users', '1'],
        props: {id: 1, name: 'foo'}
      })
      expect(store.getState()).toEqual({
        users: {1: {id: 1, name: 'foo'}},
        notes: {},
      })
    })
    test("Update", () => {
      const store = createStore({users: {1: {id: 1, name: 'foo'}}, notes: {}})
      store.commit({
        path: ['users', '1'],
        props: {name: 'FOO'}
      })
      expect(store.getState()).toEqual({
        users: {1: {id: 1, name: 'FOO'}},
        notes: {},
      })
    })
    test("Replace", () => {
      const store = createStore({users: {1: {id: 1, name: 'foo'}}, notes: {}})
      store.commit({
        path: ['users'],
        props: {1: {name: 'replaced'}}
      })
      expect(store.getState()).toEqual({
        users: {1: {name: 'replaced'}},
        notes: {},
      })
    })
    test("Batched transform", () => {
      const store = createStore({users: {}, notes: {}})
      store.commit([{
        path: ['users', '1'],
        props: {id: 1, name: 'foo'}
      }, {
        path: ['notes', '2'],
        props: {id: 2, text: 'bar'}
      }])
      expect(store.getState()).toEqual({
        users: {1: {id: 1, name: 'foo'}},
        notes: {2: {id: 2, text: 'bar'}},
      })
    })
    test("Batched transform update", () => {
      const store = createStore({users: {1: {name: 'FOO'}}, notes: {2: {text: 'BAR'}}})
      store.commit([{
        path: ['users', '1'],
        props: {id: 1, name: 'foo'}
      }, {
        path: ['notes', '2'],
        props: {id: 2, text: 'bar'}
      }])
      expect(store.getState()).toEqual({
        users: {1: {id: 1, name: 'foo'}},
        notes: {2: {id: 2, text: 'bar'}},
      })
    })
    test("Call with props as function", () => {
      const store = createStore({users: {1: {name: 'Foo'}}})
      let i = 0
      store.commit({
        path: ['users', '1'],
        props: (user: object, state: any) => {
          i++
          return {}
        }
      })
      expect(i).toBe(1)
    })
    test("Check that arguments are correct", () => {
      const store = createStore({users: {1: {name: 'Foo'}}})
      store.commit({
        path: ['users', '1'],
        props: (user: object, state: any) => {
          expect(user).toEqual({name: 'Foo'})
          expect(user).toBe(state.users[1])
          expect(state).toEqual({users: {1: {name: 'Foo'}}})
          expect(state).toBe(store.getState())
          return {}
        }
      })
      expect(store.getState()).toEqual({users: {1: {name: 'Foo'}}})
    })
    test("Call with props as function", () => {
      const store = createStore({users: {1: {name: 'Foo'}}})
      store.commit({
        path: ['users', '1'],
        props: (user: object, state: any) => ({
          name: 'New name'
        })
      })
      expect(store.getState()).toEqual({
        users: {1: {name: 'New name'}},
      })
    })
    test("Call with props as function in batch", () => {
      const store = createStore({
        users: {1: {name: 'Foo'}},
        notes: {2: {text: 'Bar'}},
      })
      store.commit([{
        path: ['users', '1'],
        props: (user: object, state: any) => ({id: 1, name: 'FOO'}),
      }, {
        path: ['notes', '2'],
        props: (note: object, state: any) => ({id: 2, text: 'BAR'}),
      }, {
        path: [],
        props: (state: any) => {
          expect(state).toBe(store.getState())
          return {lists: {}}
        },
      }])
      expect(store.getState()).toEqual({
        users: {1: {id: 1, name: 'FOO'}},
        notes: {2: {id: 2, text: 'BAR'}},
        lists: {},
      })
    })
  })

  describe("store.subscribe()", () => {
    test("Transform publishes", () => {
      const store = createStore({})
      let i = 0
      store.subscribe(() => i++)
      store.commit({path: [], props: {a: null}})
      expect(i).toBe(1)
      store.commit({path: [], props: {a: null}})
      expect(i).toBe(2)
      store.commit({path: [], props: {a: null}})
      expect(i).toBe(3)
      store.commit({path: [], props: {a: null}})
      expect(i).toBe(4)
      store.commit({path: [], props: {a: null}})
      expect(i).toBe(5)
    })
    test("Check arguments", () => {
      const store = createStore({})
      let i = 0
      store.subscribe((state, prev, transform) => {
        i++
        expect(i).toBe(1)
        expect(state).toEqual({a: null})
        expect(prev).toEqual({})
        expect(transform).toEqual({
          type: 'transform-type',
          path: [],
          props: {a: null},
        })
      })
      store.commit({
        type: 'transform-type',
        path: [],
        props: {a: null},
      })
      expect(i).toBe(1)
    })
    test("Batched transform only publishes once", () => {
      const store = createStore({})
      let i = 0
      store.subscribe(() => i++)
      store.commit([
        {path: [], props: {a: 1}},
        {path: [], props: {b: 2}},
        {path: [], props: {c: 3}},
      ])
      expect(i).toBe(1)
      expect(store.getState()).toEqual({a: 1, b: 2, c: 3})
    })
    test("Multiple subscribes", () => {
      const store = createStore({})
      let i = 0
      store.subscribe(() => i++)
      store.subscribe(() => i++)
      store.commit({path: [], props: {a: null}})
      expect(i).toBe(2)
      store.commit({path: [], props: {a: null}})
      expect(i).toBe(4)
      store.commit({path: [], props: {a: null}})
      expect(i).toBe(6)
    })
    test("Unsubscribe", () => {
      const store = createStore({})
      let i = 0
      const unsub = store.subscribe(() => i++)
      store.commit({path: [], props: {}})
      expect(i).toBe(1)
      unsub()
      store.commit({path: [], props: {}})
      expect(i).toBe(1)
      store.commit({path: [], props: {}})
      expect(i).toBe(1)
      store.commit({path: [], props: {}})
      expect(i).toBe(1)
    })
    test("Unsubscribe with multiple subscribes", () => {
      const store = createStore({})
      let [a, b, c] = [0, 0, 0]
      const fnA = () => {a++}
      const fnB = () => {b++}
      const fnC = () => {c++}
      const unsubA = store.subscribe(fnA)
      const unsubB = store.subscribe(fnB)
      const unsubC = store.subscribe(fnC)

      expect(store._listeners).toEqual([fnA, fnB, fnC])
      store.commit({path: [], props: {}})
      expect(a).toBe(1)
      expect(b).toBe(1)
      expect(c).toBe(1)

      unsubC()
      expect(store._listeners).toEqual([fnA, fnB])
      store.commit({path: [], props: {}})
      expect(a).toBe(2)
      expect(b).toBe(2)
      expect(c).toBe(1)

      unsubB()
      expect(store._listeners).toEqual([fnA])
      store.commit({path: [], props: {}})
      expect(a).toBe(3)
      expect(b).toBe(2)
      expect(c).toBe(1)

      unsubA()
      expect(store._listeners).toEqual([])
      store.commit({path: [], props: {}})
      expect(a).toBe(3)
      expect(b).toBe(2)
      expect(c).toBe(1)
    })
  })

})
