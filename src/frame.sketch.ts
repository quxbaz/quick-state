type State = object

// interface Frame {
//   state: State,
//   events: Event[],
// }

type frame = (state: State, events: Event[]) => frame
const frame: frame = (state, events) => {
  return frame(state, events)
}
