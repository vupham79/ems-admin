import fetchAPI from "../utils/service";
import { GET_ROUNDS } from "../utils/constants";

export const UPDATE_ROUND = "UPDATE_ROUND";
export const UPDATE_ROUND_SUCCESS = "UPDATE_ROUND_SUCCESS";
export const UPDATE_ROUND_FAIL = "UPDATE_ROUND_FAIL";

export function updateRound(data) {
  return async function action(dispatch) {
    dispatch({
      type: UPDATE_ROUND
    });
    try {
      const res = await fetchAPI({
        method: "PUT",
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
          IsActive: true
        }
      });
      if (res) {
        dispatch({
          type: UPDATE_ROUND_SUCCESS
        });
        dispatch({
          type: "TOAST_SHOW",
          payload: {
            header: "Round",
            body: "Update success",
            type: "success"
          }
        });
        return true;
      } else {
        dispatch({
          type: UPDATE_ROUND_FAIL
        });
        dispatch({
          type: "TOAST_SHOW",
          payload: {
            header: "Round",
            body: "Updating failed!",
            type: "fail"
          }
        });
        return false;
      }
    } catch (error) {
      dispatch({
        type: UPDATE_ROUND_FAIL
      });
      dispatch({
        type: "TOAST_SHOW",
        payload: {
          header: "Updating failed",
          body: `${error.message}`,
          type: "fail"
        }
      });
      return false;
    }
  };
}

export const ADD_ROUND = "ADD_ROUND";
export const ADD_ROUND_SUCCESS = "ADD_ROUND_SUCCESS";
export const ADD_ROUND_FAIL = "ADD_ROUND_FAIL";

export function addRound(data) {
  return async function action(dispatch) {
    dispatch({
      type: ADD_ROUND
    });
    try {
      const res = await fetchAPI({
        method: "POST",
        endpoints: GET_ROUNDS,
        params: {
          companyId: data.CompanyId,
          preMoney: data.PreMoney,
          optionPool: data.OptionPool
        }
      });
      if (res) {
        dispatch({
          type: ADD_ROUND_SUCCESS
        });
        dispatch({
          type: "TOAST_SHOW",
          payload: {
            header: "Round",
            body: "Adding success",
            type: "success"
          }
        });
        return true;
      } else {
        dispatch({
          type: ADD_ROUND_FAIL
        });
        dispatch({
          type: "TOAST_SHOW",
          payload: {
            header: "Round",
            body: "Adding failed!",
            type: "fail"
          }
        });
        return false;
      }
    } catch (error) {
      dispatch({
        type: ADD_ROUND_FAIL
      });
      dispatch({
        type: "TOAST_SHOW",
        payload: {
          header: "Adding failed!",
          body: `${error.message}`,
          type: "fail"
        }
      });
      return false;
    }
  };
}
