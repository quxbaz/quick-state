import setState from '../src/setState'

// describe('Basic tests', () => {
//   test("one", () => {
//     expect(1).toBe(1)
//   })
// })

describe('setState', () => {
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

    // const actual = setState(
    //   state,
    //   ['lists', '0'],
    //   {title: 'New Title'}
    // )

    // const actual = setState(
    //   state,
    //   ['lists', '0', 'title'],
    //   'TITLE 0'
    // )

    // const actual = setState(
    //   state,
    //   ['lists', '0'],
    //   42
    // )

    // const actual = setState(
    //   state,
    //   ['lists'],
    //   84
    // )

    // const actual = setState(
    //   state,
    //   [],
    //   'new-path'
    // )

    // const actual = setState(
    //   state,
    //   [],
    //   {'new-path': {'new': 'path'}}
    // )

    const actual = setState(
      state,
      ['notes', 'c'],
      {id: 'c', text: 'Note C'}
    )

    // const actual = setState(
    //   state,
    //   ['notes', 'c'],
    //   'c'
    // )

    console.log(actual)

    // const expected = {list: {id: '0', title: 'New Title', length: 10}}
    // expect(actual).toEqual(expected)

  })
})
