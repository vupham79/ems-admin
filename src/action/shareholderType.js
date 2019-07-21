import fetchAPI from "../utils/service";
import { GET_SHAREHOLDER_TYPE } from "../utils/constants";

export const LOAD_SHAREHOLDER_TYPES = "LOAD_SHAREHOLDER_TYPES";
export const LOAD_SHAREHOLDER_TYPES_SUCCESS = "LOAD_SHAREHOLDER_TYPES_SUCCESS";
export const LOAD_SHAREHOLDER_TYPES_FAIL = "LOAD_SHAREHOLDER_TYPES_FAIL";

export function getShareholderTypes() {
  return async function action(dispatch) {
    dispatch({
      type: LOAD_SHAREHOLDER_TYPES
    });
    try {
      const res = await fetchAPI({
        method: "GET",
        endpoints: GET_SHAREHOLDER_TYPE
      });
      if (res) {
        dispatch({
          type: LOAD_SHAREHOLDER_TYPES_SUCCESS,
          data: res.data
        });
      } else {
        dispatch({
          type: LOAD_SHAREHOLDER_TYPES_FAIL
        });
      }
    } catch (error) {
      dispatch({
        type: LOAD_SHAREHOLDER_TYPES_FAIL
      });
      dispatch({
        type: "TOAST_SHOW",
        payload: {
          header: "Shareholder Types",
          body: `${error.message}`,
          type: "fail"
        }
      });
    }
  };
}
