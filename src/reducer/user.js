import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGIN,
  LOGOUT,
  LOGOUT_SUCCESS,
  LOGOUT_FAIL,
  LOAD_COMPANIES,
  LOAD_COMPANIES_SUCCESS,
  LOAD_COMPANIES_FAIL,
} from '../action';

const INITIAL_STATE = {
  Username: '',
  companies: [],
  selectedCompany: '',
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
        username: action.payload.Username,
        isAuth: true,
        isLoading: false,
      };
    case LOGIN_FAIL:
      return {
        ...state,
        isLoading: false,
      }
    case LOGOUT:
      return {
        ...state,
        isLoading: true,
      }
    case LOGOUT_SUCCESS:
      return {
        ...INITIAL_STATE,
      }
    case LOGOUT_FAIL:
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