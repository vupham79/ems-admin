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

export const UPDATE_SHARE_TYPE = 'UPDATE_SHARE_TYPE';
export const UPDATE_SHARE_TYPE_SUCCESS = 'UPDATE_SHARE_TYPE_SUCCESS';
export const UPDATE_SHARE_TYPE_FAIL = 'UPDATE_SHARE_TYPE_FAIL';

export function updateShareType(data) {
  return async function action(dispatch) {
    dispatch({
      type: UPDATE_SHARE_TYPE,
    })
    try {
      const res = await fetchAPI({
        method: 'PUT',
        endpoints: GET_SHARE_TYPE,
        data: {

        }
      });
      if (res) {
        dispatch({
          type: UPDATE_SHARE_TYPE_SUCCESS,
          data: res.data
        })
      } else {
        dispatch({
          type: UPDATE_SHARE_TYPE_FAIL
        })
      }
    } catch (error) {
      dispatch({
        type: UPDATE_SHARE_TYPE_FAIL
      });
      console.log(error.message)
    }
  }
}

export const ADD_SHARE_TYPE = 'ADD_SHARE_TYPE';
export const ADD_SHARE_TYPE_SUCCESS = 'ADD_SHARE_TYPE_SUCCESS';
export const ADD_SHARE_TYPE_FAIL = 'ADD_SHARE_TYPE_FAIL';

export function addShareType(data) {
  return async function action(dispatch) {
    dispatch({
      type: ADD_SHARE_TYPE,
    })
    try {
      const res = await fetchAPI({
        method: 'POST',
        endpoints: GET_SHARE_TYPE,
        data: {

        }
      });
      if (res) {
        dispatch({
          type: ADD_SHARE_TYPE_SUCCESS,
          data: res.data
        })
      } else {
        dispatch({
          type: ADD_SHARE_TYPE_FAIL
        })
      }
    } catch (error) {
      dispatch({
        type: ADD_SHARE_TYPE_FAIL
      });
      console.log(error.message)
    }
  }
}