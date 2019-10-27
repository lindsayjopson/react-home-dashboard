export function createStore(initialReducer, initialState = {}, enhancer) {
  if (enhancer) {
    return enhancer(createStore)(initialReducer, initialState);
  }
  let reducer = initialReducer;
  let subscribers = [];
  let state = reducer(initialState, { type: '__INIT__' });
  return {
    getState() {
      return state;
    },
    dispatch(action) {
      state = reducer(state, action);
      subscribers.forEach(subscriber => { if(subscriber) subscriber(state, action.type || '') });
    },
    subscribe(listener) {
      if(subscribers.includes(listener)) {
        return undefined;
      }
      subscribers.push(listener);
      return listener;
    },
    unsubscribe(listener) {
      const idx = subscribers.indexOf(listener);
      delete subscribers[idx];
    }
  };
}

// Live dangerously. Don't Object.assign({}, s) it modify it in place - whoohooo
export function rootReducer(s, a) {
  switch(a.type) {
    case "__INIT__":
      return s;
    case "SCHEDULE_SELECT_DAY":
      s.dashboard.widgets.schedule.data.day = a.payload;
      return s;
  }
  return s;
}

