import { TOAST, TOAST_CLOSE } from '../action';

const INITIAL_STATE = {
  header: '',
  body: '',
  isShown: false,
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case TOAST:
      return {
        header: action.payload.header,
        body: action.payload.header,
        isShown: true,
      };
    case TOAST_CLOSE:
      return {
        header: '',
        body: '',
        isShown: false,
      };
    default:
      return state;
  }
}