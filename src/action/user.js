import fetchAPI from '../utils/service';
import { GET_USER_ACCOUNT } from '../utils/constants';

export const LOGIN = 'LOGIN';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAIL = 'LOGIN_FAIL';

export function login(payload) {
  return dispatch => {
    dispatch({
      type: LOGIN,
    })
    try {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: {
          uid: payload.uid,
          email: payload.email,
          displayName: payload.displayName,
          photoURL: payload.photoURL,
        }
      })
    } catch (error) {
      dispatch({
        type: LOGIN_FAIL,
      })
    }
  }
}

export const LOGOUT = 'LOGOUT';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_FAIL = 'LOGOUT_FAIL';

export function logout() {
  return dispatch => {
    dispatch({
      type: LOGOUT,
    })
    try {
      dispatch({
        type: LOGOUT_SUCCESS,
      })
    } catch (error) {
      dispatch({
        type: LOGOUT_FAIL,
      })
    }
  }
}

export const LOAD_COMPANIES = 'LOAD_COMPANIES';
export const LOAD_COMPANIES_SUCCESS = 'LOAD_COMPANIES_SUCCESS';
export const LOAD_COMPANIES_FAIL = 'LOAD_COMPANIES_FAIL';

export function getCompanies(data) {
  return async function action(dispatch) {
    dispatch({
      type: LOAD_COMPANIES,
    })
    try {
      const res = await fetchAPI({
        method: 'GET',
        endpoints: `${GET_USER_ACCOUNT}/${data.Username}`,
      });
      if (res) {
        dispatch({
          type: LOAD_COMPANIES_SUCCESS,
          payload: res.data.Companies
        })
      } else {
        dispatch({
          type: LOAD_COMPANIES_FAIL
        })
      }
    } catch (error) {
      dispatch({
        type: LOAD_COMPANIES_FAIL
      });
      console.log(error.message)
    }
  }
}

export const SELECT_COMPANY = 'SELECT_COMPANY';
export const SELECT_COMPANY_SUCCESS = 'SELECT_COMPANY_SUCCESS';
export const SELECT_COMPANY_FAIL = 'SELECT_COMPANY_FAIL';

export function selectCompany(data) {
  return async function action(dispatch) {
    dispatch({
      type: SELECT_COMPANY,
    })
    try {
      dispatch({
        type: SELECT_COMPANY_SUCCESS,
        payload: data
      })
    } catch (error) {
      dispatch({
        type: SELECT_COMPANY_FAIL
      });
      console.log(error.message)
    }
  }
}