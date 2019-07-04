import {
  LOAD_USER_ACCOUNTS,
  LOAD_USER_ACCOUNTS_SUCCESS,
  LOAD_USER_ACCOUNTS_FAIL,
} from '../action';

const INITIAL_STATE = {
  userAccounts: null,
  isLoading: false,
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOAD_USER_ACCOUNTS:
      return {
        ...state,
        isLoading: true,
      };
    case LOAD_USER_ACCOUNTS_SUCCESS:
      return {
        ...state,
        userAccounts: action.data,
        isLoading: false,
      };
    case LOAD_USER_ACCOUNTS_FAIL:
      return {
        ...state,
        userAccounts: null,
        isLoading: false,
      }
    default:
      return state;
  }
}