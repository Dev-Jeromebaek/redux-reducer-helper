import { fromJS } from 'immutable';

const reducer = {
  init: (state, target, initState) => {
    return {
      ...state,
      [target]: initState[target],
    };
  },
  set: (state, action, target, purpose) => {
    if (!action)
      return {
        ...state,
        [target]: purpose,
      };
    if (!purpose)
      return {
        ...state,
        [target]: action.payload,
      };
    return {
      ...state,
      [target]: action.payload[purpose],
    };
  },
  update: (state, target, index, key, value) => {
    return {
      ...state,
      [target]: [
        ...state[target].slice(0, index),
        Object.assign({}, { ...state[target][index], [key]: value }),
        ...state[target].slice(index + 1),
      ],
    };
  },
  push: (state, target, purpose) => {
    const { id, data } = purpose;
    return {
      ...state,
      target: [...state[target], { id, data }],
    };
  },
};

const immutableReducer = {
  init: (state, target, initState) => {
    return state.set(target, initState.get(target));
  },
  set: (state, action, target, purpose) => {
    if (!action) return state.set(target, fromJS(purpose));
    if (!purpose) return state.set(target, fromJS(action.payload));
    return state.set(target, fromJS(action.payload[purpose]));
  },
  update: (state, target, index, key, value) => {
    const originArray = state.get(target);
    return state.set(
      target,
      originArray.update(index, item => item.set(key, value)),
    );
  },
  push: (state, target, purpose) => {
    const { id, data } = purpose;
    return state.set(target, [...state.get(target), fromJS({ id, data })]);
  },
};

export default {
  reducer,
  immutableReducer,
};
