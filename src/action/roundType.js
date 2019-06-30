import fetchAPI from '../utils/service';
import {
  GET_ROUND_TYPES,
} from '../utils/constants';

export const LOAD_ROUND_TYPES = 'LOAD_ROUND_TYPES';
export const LOAD_ROUND_TYPES_SUCCESS = 'LOAD_ROUND_TYPES_SUCCESS';
export const LOAD_ROUND_TYPES_FAIL = 'LOAD_ROUND_TYPES_FAIL';

export function getRoundTypes(data) {
  return async function action(dispatch) {
    dispatch({
      type: LOAD_ROUND_TYPES,
    })
    try {
      const res = await fetchAPI({
        method: 'GET',
        endpoints: GET_ROUND_TYPES,
      });
      if (res) {
        dispatch({
          type: LOAD_ROUND_TYPES_SUCCESS,
          data: res.data
        })
      } else {
        dispatch({
          type: LOAD_ROUND_TYPES_FAIL
        })
      }
    } catch (error) {
      dispatch({
        type: LOAD_ROUND_TYPES_FAIL
      });
      console.log(error.message)
    }
  }
}

export const LOAD_ROUND_TYPE = 'LOAD_ROUND_TYPE';
export const LOAD_ROUND_TYPE_SUCCESS = 'LOAD_ROUND_TYPE_SUCCESS';
export const LOAD_ROUND_TYPE_FAIL = 'LOAD_ROUND_TYPE_FAIL';

export function getRoundType(data) {
  return async function action(dispatch) {
    dispatch({
      type: LOAD_ROUND_TYPE,
    })
    try {
      const res = await fetchAPI({
        method: 'GET',
        endpoints: GET_ROUND_TYPES + '/' + data.id,
      });
      if (res) {
        dispatch({
          type: LOAD_ROUND_TYPE_SUCCESS,
          data: data
        })
      } else {
        dispatch({
          type: LOAD_ROUND_TYPE_FAIL
        })
      }
    } catch (error) {
      dispatch({
        type: LOAD_ROUND_TYPE_FAIL
      });
      console.log(error.message)
    }
  }
}