// lists.js

const removeNoteFromList = (id, note) => (list) => {

  return [
    {
    },
    deleteNote(note),
  ]

  // return {
  //   ...state,
  //   lists: {
  //     ...state.lists
  //     [id]: {...state.lists[id], without(notes, note)}
  //   },
  //   notes: omit(state.notes, note),
  // }

  // return without(notes, note)

  // return [
  //   {
  //     ...list,
  //     notes: without(list.notes, note),
  //   },
  //   destroyNote(note),
  // ]

}

deleteNote.path = 'notes'
const deleteNote = (id) => (notes) => notes.without(id)

const removeNoteFromList = (id, note) => ([
  {
    name: 'lists/remove-note-from-list',
    path: ['lists', id, 'notes'],
    map: (notes) => without(notes, note),
  },
  deleteNote(note),
])

const deleteNote = (id) => ({
  name: 'notes/delete-note'
  path: ['notes'],
  map: (notes) => without(notes, id),
})

function commit (transform) {
  const substate = transform
  const props = transform(substate)
  update(object, path, props)
}


(state) => (lists) => {
  return next(lists[id])
} => (list)

// app.js

// `thing` could be a transform
const thing = deleteNote(id, note)

store.commit(thing) // -> nextState
