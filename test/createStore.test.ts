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
      store.commit({})
      expect(store.getState()).toEqual({})
    })
    test("Returns undefined.", () => {
      const store = createStore({})
      expect(store.commit({})).toBe(undefined)
    })
    test("{map: {a: 1}}", () => {
      const store = createStore({})
      store.commit({map: {a: 1}})
      expect(store.getState()).toEqual({a: 1})
    })
    test("{map: {a: 2}}", () => {
      const store = createStore({})
      store.commit({map: {a: 2}})
      expect(store.getState()).toEqual({a: 2})
    })
    test("Commit", () => {
      const store = createStore({users: {}})
      store.commit({
        path: ['users'],
        map: {1: {id: 1, name: 'foo'}}
      })
      expect(store.getState()).toEqual({
        users: {1: {id: 1, name: 'foo'}}
      })
    })
    test("Commit", () => {
      const store = createStore({users: {}})
      store.commit({
        path: ['users', '1'],
        map: {id: 1, name: 'foo'}
      })
      expect(store.getState()).toEqual({
        users: {1: {id: 1, name: 'foo'}}
      })
    })
    test("Commit", () => {
      const store = createStore({users: {}, notes: {}})
      store.commit({
        path: ['users', '1'],
        map: {id: 1, name: 'foo'}
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
        map: {name: 'FOO'}
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
        map: {1: {name: 'replaced'}}
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
        map: {id: 1, name: 'foo'}
      }, {
        path: ['notes', '2'],
        map: {id: 2, text: 'bar'}
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
        map: {id: 1, name: 'foo'}
      }, {
        path: ['notes', '2'],
        map: {id: 2, text: 'bar'}
      }])
      expect(store.getState()).toEqual({
        users: {1: {id: 1, name: 'foo'}},
        notes: {2: {id: 2, text: 'bar'}},
      })
    })
  })

  describe("store.subscribe()", () => {
    test("Transform publishes", () => {
      const store = createStore({})
      let i = 0
      store.subscribe(() => i++)
      store.commit({map: {a: null}})
      expect(i).toBe(1)
      store.commit({map: {a: null}})
      expect(i).toBe(2)
      store.commit({map: {a: null}})
      expect(i).toBe(3)
      store.commit({map: {a: null}})
      expect(i).toBe(4)
      store.commit({map: {a: null}})
      expect(i).toBe(5)
    })
    test("Batched transform only publishes once", () => {
      const store = createStore({users: {1: {name: 'FOO'}}, notes: {2: {text: 'BAR'}}})
      let i = 0
      store.subscribe(() => i++)
      store.commit([{map: {id: 1}}, {map: {id: 2}}])
      expect(i).toBe(1)
    })
  })

})
