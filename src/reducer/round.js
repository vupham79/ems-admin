import {
  UPDATE_ROUND,
  UPDATE_ROUND_SUCCESS,
  UPDATE_ROUND_FAIL,
  ADD_ROUND,
  ADD_ROUND_SUCCESS,
  ADD_ROUND_FAIL
} from '../action';

const INITIAL_STATE = {
  isLoading: false,
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UPDATE_ROUND:
      return {
        ...state,
        isLoading: true,
      }
    case UPDATE_ROUND_SUCCESS:
      return {
        ...state,
        isLoading: false,
      }
    case UPDATE_ROUND_FAIL:
      return {
        ...state,
        isLoading: false,
      }
    case ADD_ROUND:
      return {
        ...state,
        isLoading: true,
      }
    case ADD_ROUND_SUCCESS:
      return {
        ...state,
        isLoading: false,
      }
    case ADD_ROUND_FAIL:
      return {
        ...state,
        isLoading: false,
      }
    default:
      return state;
  }
}