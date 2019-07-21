import { TOAST_SHOW, TOAST_CLOSE } from "../action";

const INITIAL_STATE = {
  header: "",
  body: "",
  type: "",
  show: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case TOAST_SHOW:
      return {
        header: action.payload.header,
        body: action.payload.body,
        type: action.payload.type,
        show: true
      };
    case TOAST_CLOSE:
      return {
        header: "",
        body: "",
        type: "",
        show: false
      };
    default:
      return state;
  }
};
