// /* Lists */

// const listInitState = {
//   id: '',
//   title: '',
//   notes: [],
// }

// const setListTitle = (id, title) => ({
//   name: 'lists/set-title',
//   path: ['lists', id],
//   state: {title},
// })

// const createList = (id, title) => ({
//   name: 'lists/create-list',
//   path: ['lists', id],
//   state: {...listInitState, id, title},
// })

// // const createList2 = (title) => {
// //   const id = '0'
// //   return {
// //     name: 'lists/create-list',
// //     path: ['lists'],
// //     state: (lists, state) => ({
// //       ...lists,
// //       [id]: {...listInitState, id, title},
// //     }),
// //   }
// // }

// const deleteNote = (id, note) => [
//   {
//     name: 'lists/remove-note',
//     path: ['lists', listId],
//     state: (list) => ({
//       ...list,
//       notes: without(list.notes, note),
//     })
//   },
//   destroyNote(note),
// ]

// /* Notes */

// const setNoteText = (id, text) => ({
//   name: 'notes/set-node-text',
//   path: ['notes', id, 'text'],
//   state: text,
// })

// const setNoteText = (id, text) => ({
//   name: 'notes/set-node-text',
//   path: ['notes', id],
//   state: {text},
// })

// const destroyNote = (id) => ({
//   name: 'notes/destroy-note',
//   path: ['notes'],
//   state: (notes) => omit(notes, id),
// })

// /* Store */

// const initState = {
//   lists: {},
//   notes: {},
// }

// const createStore = (initState) => {

//   let _vars = {
//     storeState: initState,
//   }

//   return {
//     mergeTransform: ({path, state}) => {

//       // const stateAtPath = path.reduce(
//       //   (currentState, path) => currentState[path],
//       //   _vars.storeState
//       // )

//       // if stateAtPath === undefined ...

//       // _vars.storeState = {
//       //   ..._vars.storeState,
//       //   lists: {
//       //     ...lists,
//       //     [id]: state,
//       //   }
//       // }

//       const nextState = path.reduce(
//         (state, path) => ({
//           ...state,

//         }),
//         _vars.storeState
//       )

//     }
//   }

// }

// // store.

// const store = createStore(initState)
