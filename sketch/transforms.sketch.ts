// lists.js

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

// function commit (transform) {
//   const substate = transform
//   const props = transform(substate)
//   update(object, path, props)
// }

// app.js

// `thing` could be a transform
const thing = deleteNote(id, note)

store.commit(thing) // -> nextState
