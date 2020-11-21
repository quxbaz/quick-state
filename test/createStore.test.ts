import createStore from '../src/createStore'

describe("createStore", () => {

  describe("Instantiation", () => {
    test("It creates without error.", () => {
      createStore({})
      createStore({a: 1})
      createStore({a: 1, b: 2})
    })
  })

  describe("store.getState", () => {
    test("It returns the store state.", () => {
      const state = {}
      const store = createStore(state)
      expect(store.getState()).toBe(state)
      expect(store.getState()).toEqual({})
    })
    test("It returns the store state.", () => {
      const state = {a: 1}
      const store = createStore(state)
      expect(store.getState()).toEqual({a: 1})
    })
  })

  describe("store.commit", () => {

  })

  describe("store.subscribe", () => {

  })

})
