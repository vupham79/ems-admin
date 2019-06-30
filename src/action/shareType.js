import fetchAPI from '../utils/service';
import {
  GET_SHARE_TYPE,
} from '../utils/constants';

export const LOAD_SHARE_TYPES = 'LOAD_SHARE_TYPES';
export const LOAD_SHARE_TYPES_SUCCESS = 'LOAD_SHARE_TYPES_SUCCESS';
export const LOAD_SHARE_TYPES_FAIL = 'LOAD_SHARE_TYPES_FAIL';

export function getShareTypes(data) {
  return async function action(dispatch) {
    dispatch({
      type: LOAD_SHARE_TYPES,
    })
    try {
      const res = await fetchAPI({
        method: 'GET',
        endpoints: GET_SHARE_TYPE,
        params: {
          companyId: data.id
        }
      });
      if (res) {
        dispatch({
          type: LOAD_SHARE_TYPES_SUCCESS,
          data: res.data
        })
      } else {
        dispatch({
          type: LOAD_SHARE_TYPES_FAIL
        })
      }
    } catch (error) {
      dispatch({
        type: LOAD_SHARE_TYPES_FAIL
      });
      console.log(error.message)
    }
  }
}