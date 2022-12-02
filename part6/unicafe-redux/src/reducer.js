const initialState = {
  good: 0,
  ok: 0,
  bad: 0
}

const counterReducer = (state = initialState, action) => {
  // console.log(action)
  switch (action.type) {
    case 'GOOD':
      const newGoodState = state
      newGoodState.good += 1
      return newGoodState
    case 'OK':
      const newOkState = state
      newOkState.ok += 1
      return newOkState
    case 'BAD':
      const newBadState = state
      newBadState.bad += 1
      return newBadState
    case 'ZERO':
      const newInitialState = {
        good: 0,
        ok: 0,
        bad: 0
      }
      return newInitialState
    default: return state
  }
  
}

export default counterReducer