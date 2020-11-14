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

    - States can be thought of as "frames." A frame is a commingled idea of state
      in the "state management" sense and a frame in the video game "frames per
      second" sense. A frame only exists/occurs if it's different from the
      previous state.
        Events have prior, immediate, and post states/frames.
        An event occurs in a single frame. We can now represent events as
      state. We can represent the state at which the mouse button was held down;
      the state in which it was released.
        If the event is inconsequential, then no new frame occurs because the
      state has not changed. The event is meaningless.

    - Normally we want to avoid rendering state or reacting to state by way of
      callbacks, or the observer pattern. This leads to spaghetti code, or
      callback hell. It's also opposed to our current paradigm of state-based
      view rendering. Top-down state-based view representation is fundamentally
      different from event-driven, observer-based rendering.
        What if... what if we consider each state change to inhabit a "frame"? The
      frame concept is important here (maybe). The frame is a unit of change and
      a unit of time. In our design, change is the same as time.

        1 unit of change === 1 unit of time

        We want to update state off events, but we don"t want events to be the
      terminus and responsibility-holder for calling a store method like
      `dispatch`. It's not the responsibility of the component callback to take
      the store and induce these changes. The event callback should be agnostic
      and "un-powerful" or limited in responsibility. It's important that (1) We
      are not inducing state changes directly in event handlers and (2) We are
      not simply for events and inducing state changes off that.
        So what sort of pattern more closely aligns with functional state-based
      view representation?
        One idea I've had is to apply the concept of "frames" to the
      problem. Instead of listening to events in some central place and issuing
      store changes from there we can instead... Perform some work in each "frame."
        Each frame is the induction of a new state. A frame stores an event queue,
      or multiple queues. An event occurrence pushes an event data object onto
      the queue. This is event represented as state. That forms a new frame
      because the state has changed. Each frame, work may be performed. In this
      case, we can inspect the event queue and induce further state changes, or
      ignore the events and flush the queue.
        The important point is that we are processing state.

    - We now have a formalized capture of time, whereas before we were ignoring
      it completely, which leaves us unprepared to deal with a concept like
      events, which are not intuitively represented as state.
        Events now ARE represented as state, and they ARE handled with the
      implicit time parameter now explicit.

    - The approach is somewhat similar to polling. Except in polling a frame
      measures a unit of actual time where an event occured when that time. For
      us a frame measures change.

    - (This is all synchronous btw.)

    # Other Stuff

    - We get things for free with this approach. Now our app doesn't not need to
      be measured in terms of actions, but in the more readibly digestible
      concept of frames.
        Each frame represents representes a synchronous batch of actions.
        Each frame N represents an exact state. In other words frame N will
        always represent the same state:

        state = getFrame(n)

      A frame can be broken down into individual actions/transfoms/state
      changes.

    - Each frame gives us the opportunity to perform some work. We "react" to
      each frame (react is not the right word here though. We treat a frame as
      normal time, not as an event you "react" to).

    - We can say, for example, a bug occurred at Frame 232. Go to history at
      that frame and inspect the state prior to that point. Frames provide us
      with a language for denoting signficant time that actual application time
      in the form of `Date.now` does not provide because most time is
      insignificant (also human time ergonomically difficult to work with in
      this context). Mostly, nothing happens in an application. Frames only
      represent significant time.

  */
}

/* End point; interface */