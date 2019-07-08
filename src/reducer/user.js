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
  SELECT_COMPANY,
  SELECT_COMPANY_SUCCESS,
  SELECT_COMPANY_FAIL,
} from '../action';

const INITIAL_STATE = {
  uid: '',
  email: '',
  displayName: '',
  photoURL: '',
  companies: null,
  selectedCompany: null,
  isAuth: false,
  isLoading: false,
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...INITIAL_STATE,
        isLoading: true,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        ...action.payload,
        isAuth: true,
        isLoading: false,
      };
    case LOGIN_FAIL:
      return {
        ...INITIAL_STATE,
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
        companies: null,
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
        companies: null,
        isLoading: false,
      }
    case SELECT_COMPANY:
      return {
        ...state,
        isLoading: true,
      }
    case SELECT_COMPANY_SUCCESS:
      return {
        ...state,
        selectedCompany: action.payload,
        isLoading: false,
      }
    case SELECT_COMPANY_FAIL:
      return {
        ...state,
        selectedCompany: null,
        isLoading: false,
      }
    default:
      return state;
  }
}