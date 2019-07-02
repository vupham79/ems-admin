import fetchAPI from '../utils/service';
import {
  GET_ROUNDS,
} from '../utils/constants';

export const UPDATE_ROUND = 'UPDATE_ROUND';
export const UPDATE_ROUND_SUCCESS = 'UPDATE_ROUND_SUCCESS';
export const UPDATE_ROUND_FAIL = 'UPDATE_ROUND_FAIL';

export function updateRound(data) {
  return async function action(dispatch) {
    dispatch({
      type: UPDATE_ROUND,
    })
    try {
      const res = await fetchAPI({
        method: 'PUT',
        endpoints: `${GET_ROUNDS}/${data.Id}`,
        params: {
          companyId: data.id
        },
        data: {
          Id: data.Id,
          CompanyId: data.CompanyId,
          RoundTypeId: data.RoundTypeId,
          PreMoney: data.PreMoney,
          OptionPool: data.OptionPool,
          PricePerShare: data.PricePerShare,
          IsActive: true,
        }
      });
      if (res) {
        dispatch({
          type: UPDATE_ROUND_SUCCESS,
        })
        return true
      } else {
        dispatch({
          type: UPDATE_ROUND_FAIL
        })
        return false
      }
    } catch (error) {
      dispatch({
        type: UPDATE_ROUND_FAIL
      });
      console.log(error.message)
      return false
    }
  }
}

export const ADD_ROUND = 'ADD_ROUND';
export const ADD_ROUND_SUCCESS = 'ADD_ROUND_SUCCESS';
export const ADD_ROUND_FAIL = 'ADD_ROUND_FAIL';

export function addRound(data) {
  return async function action(dispatch) {
    dispatch({
      type: ADD_ROUND,
    })
    try {
      const res = await fetchAPI({
        method: 'POST',
        endpoints: GET_ROUNDS,
        data: {
          CompanyId: data.CompanyId,
          RoundTypeId: data.RoundTypeId,
          PreMoney: data.PreMoney,
          OptionPool: data.OptionPool,
          PricePerShare: data.PricePerShare,
          IsActive: true,
        }
      });
      if (res) {
        dispatch({
          type: ADD_ROUND_SUCCESS,
        })
        return true
      } else {
        dispatch({
          type: ADD_ROUND_FAIL
        })
        return false
      }
    } catch (error) {
      dispatch({
        type: ADD_ROUND_FAIL
      });
      console.log(error.message)
      return false
    }
  }
}