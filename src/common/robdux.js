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
      subscribers.forEach(subscriber => subscriber(state));
    },
    subscribe(listener) {
      subscribers.push(listener);
      return () => {
        subscribers = subscribers.filter(subscriber => subscriber !== listener);
      };
    },
    replaceReducer(newReducer) {
      reducer = newReducer;
      this.dispatch({ type: '__REPLACE__' });
    }
  };
}

export function rootReducer(s, a) {
  switch(a.type) {
    case "__INIT__":
      return s;
    case "__REPLACE__":
      return s;
    case "SCHEDULE_SELECT_DAY":
        return Object.assign(s, {
          schedule: {
            day: a.payload
          }
        });
  }
  return s;
}

