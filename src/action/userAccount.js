import fetchAPI from '../utils/service';
import {
  GET_USER_ACCOUNT,
} from '../utils/constants';

export const LOAD_USER_ACCOUNTS = 'LOAD_USER_ACCOUNTS';
export const LOAD_USER_ACCOUNTS_SUCCESS = 'LOAD_USER_ACCOUNTS_SUCCESS';
export const LOAD_USER_ACCOUNTS_FAIL = 'LOAD_USER_ACCOUNTS_FAIL';

export function getUserAccounts() {
  return async function action(dispatch) {
    dispatch({
      type: LOAD_USER_ACCOUNTS,
    })
    try {
      const res = await fetchAPI({
        method: 'GET',
        endpoints: GET_USER_ACCOUNT,
      });
      if (res) {
        dispatch({
          type: LOAD_USER_ACCOUNTS_SUCCESS,
          data: res.data
        })
      } else {
        dispatch({
          type: LOAD_USER_ACCOUNTS_FAIL
        })
      }
    } catch (error) {
      dispatch({
        type: LOAD_USER_ACCOUNTS_FAIL
      });
      console.log(error.message)
    }
  }
}