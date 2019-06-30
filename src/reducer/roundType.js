import {
  LOAD_ROUND_TYPES,
  LOAD_ROUND_TYPES_SUCCESS,
  LOAD_ROUND_TYPES_FAIL,
} from '../action';

const INITIAL_STATE = {
  isLoading: false,
  roundTypes: [],
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOAD_ROUND_TYPES:
      return {
        ...state,
        isLoading: true,
      }
    case LOAD_ROUND_TYPES_SUCCESS:
      return {
        ...state,
        roundTypes: action.data,
        isLoading: false,
      }
    case LOAD_ROUND_TYPES_FAIL:
      return {
        ...state,
        isLoading: false,
      }
    default:
      return state;
  }
}