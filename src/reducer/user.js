import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGIN,
  LOAD_COMPANIES,
  LOAD_COMPANIES_SUCCESS,
  LOAD_COMPANIES_FAIL,
} from '../action';

const INITIAL_STATE = {
  username: '',
  password: '',
  companies: [],
  isAuth: false,
  isLoading: false,
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        isLoading: true,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        username: action.payload.username,
        password: action.payload.password,
        isAuth: true,
        isLoading: false,
      };
    case LOGIN_FAIL:
      return {
        ...state,
        isLoading: false,
      }
    case LOAD_COMPANIES:
      return {
        ...state,
        isLoading: true,
      }
    case LOAD_COMPANIES_SUCCESS:
      return {
        ...state,
        companies: action.payload,
        isLoading: false,
      }
    case LOAD_COMPANIES_FAIL:
      return {
        ...state,
        isLoading: false,
      }
    default:
      return state;
  }
}