import { LOAD_SHAREHOLDER_TYPES, LOAD_SHAREHOLDER_TYPES_SUCCESS, LOAD_SHAREHOLDER_TYPES_FAIL } from '../action';

const INITIAL_STATE = {
  shareholderTypes: [],
  isLoading: false,
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOAD_SHAREHOLDER_TYPES:
      return {
        ...state,
        isLoading: true,
      };
    case LOAD_SHAREHOLDER_TYPES_SUCCESS:
      return {
        ...state,
        shareholderTypes: action.data,
        isLoading: false,
      };
    case LOAD_SHAREHOLDER_TYPES_FAIL:
      return {
        ...state,
        isLoading: false,
      };
    default:
      return state;
  }
}