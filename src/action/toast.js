export const TOAST_SHOW = "TOAST_SHOW";
export const TOAST_CLOSE = "TOAST_CLOSE";

export function closeToast() {
  return dispatch => {
    dispatch({
      type: "TOAST_CLOSE"
    });
  };
}
