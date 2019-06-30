import fetchAPI from '../utils/service';
import { GET_COMPANIES_BY_USERNAME } from '../utils/constants';

export const LOGIN = 'LOGIN';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAIL = 'LOGIN_FAIL';

export function login(payload) {
  return dispatch => {
    dispatch({
      type: LOGIN,
      payload
    })
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