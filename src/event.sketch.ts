/* Starting point */

<button onPreClick onClick={onClick} />

const onPreClick = () => {
  /*
    - Push event to event queue.
    - New state/frame.
    - [...]
  */
}

const onClick = () => {
  /*
    - Push event to event queue.

    - New state/frame.

    - Now in the state of `user-click`. Conventionally, events are handled
      immediately and are not represented in state. There is no conventional way
      to represent the state, `user-is-clicking` in current state management
      solutions.

    - States can be though of as 'frames.' A frame is a commingled idea of state
      in the 'state management' sense and a frame in the video game 'frames per
      second' sense. A frame only exists/occurs if it's different from the
      previous state.

    - Events have prior, immediate, and post states/frames.

    - An event occurs in a single frame. We can now represent events as
      state. We can represent the state at which the mouse button was held down;
      the state in which it was released.

    - If the event is inconsequential, then no new frame occurs because the
      state has not changed. The event is meaningless.

    - Normally we want to avoid rendering state or reacting to state by way of
      callbacks, or the observer pattern. This leads to spaghetti code, or
      callback hell. It's also opposed to our current paradigm of state-based
      view rendering. Top-down state-based view representation is fundamentally
      different from event-driven, observer-based rendering.

    - What if... what if we consider each state change to inhabit a 'frame'? The
      frame concept is important here (maybe). The frame is a unit of change and
      a unit of time. In our design, change is the same as time.

        1 unit of change === 1 unit of time

    - We want to

  */
}

/* End point; interface */
