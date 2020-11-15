const [event]Loop = function () {
  while (isAppRunning) {
    // Start frame
    renderView()  // The view is always rendered, so this is unnecessary.
    // ... Wait for events. How do we know when an event has arrived?
    const event(s) = [...]  // Can we capture more than 1 event in a frame?
    const transforms = events.map(e => mapEventToTransform(e))
    const nextState = transforms.reduce((state, t) => applyTransform(state, t), state)
    store.commit(nextState)
    // Flush frame events
    // End frame
  }
}

queueEvent('click-button')
queueEvent('click-button')
queueEvent('click-button')


/*
  Isn't this just dispatch...? Except the work responsibility is moved from the
  component callback to a central event loop.
*/
