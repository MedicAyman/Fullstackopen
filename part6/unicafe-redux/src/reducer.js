const initialState = {
  good: 0,
  ok: 0,
  bad: 0
}

const counterReducer = (state = initialState, action) => {
  console.log(action)
  switch (action.type) {
    case 'GOOD':
      const newState = {...state, good: state.good + 1}
      return newState
    case 'OK':
      return {...state, ok: state.ok + 1}
    case 'BAD':
      return  {...state, bad: state.bad + 1}
    case 'ZERO':
      return {good: 0, ok: 0, bad: 0}
    default: return state
  }
  
}

export const good = () => {
  return {
    type: 'GOOD'
  };
};

export const ok = () => {
  return {
    type: 'OK'
  };
};

export const bad = () => {
  return {
    type: 'BAD'
  };
};

export const zero = () => {
  return {
    type: 'ZERO'
  };
};

export default counterReducer