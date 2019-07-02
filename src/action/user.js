import fetchAPI from '../utils/service';
import { GET_COMPANIES_BY_USERNAME } from '../utils/constants';

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
          Username: '6CmcvRLsHFfy142vM86uq2LgYj22',
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
        params: { username: '6CmcvRLsHFfy142vM86uq2LgYj22' },
        endpoints: GET_COMPANIES_BY_USERNAME,
      });
      if (res) {
        dispatch({
          type: LOAD_COMPANIES_SUCCESS,
          payload: res.data
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