import {
  LOAD_COMPANY,
  LOAD_COMPANY_SUCCESS,
  LOAD_COMPANY_FAIL,
  LOAD_SHAREHOLDERS,
  LOAD_SHAREHOLDERS_SUCCESS,
  LOAD_SHAREHOLDERS_FAIL,
  LOAD_SHAREACCOUNTS,
  LOAD_SHAREACCOUNTS_SUCCESS,
  LOAD_SHAREACCOUNTS_FAIL,
  LOAD_ROUNDS,
  LOAD_ROUNDS_SUCCESS,
  LOAD_ROUNDS_FAIL,
  LOAD_TRANSACTIONS,
  LOAD_TRANSACTIONS_SUCCESS,
  LOAD_TRANSACTIONS_FAIL,
  LOAD_SHARE_TYPES,
  LOAD_SHARE_TYPES_SUCCESS,
  LOAD_SHARE_TYPES_FAIL,
  UPLOAD_COMPANY_LOGO_REQUEST,
  UPLOAD_COMPANY_LOGO_SUCCESS,
  UPLOAD_COMPANY_LOGO_FAIL
} from "../action";

const INITIAL_STATE = {
  Id: "",
  Name: "",
  Address: "",
  Phone: "",
  EstablishedYear: "",
  Email: "",
  Balance: "",
  AdminUsername: "",
  ImageUrl: "",
  Latitude: "",
  Longtitude: "",
  Shareholders: null,
  ShareAccounts: null,
  Rounds: null,
  Transactions: null,
  TransactionEntries: null,
  ShareTypes: null,
  isLoading: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOAD_COMPANY:
      return {
        ...state,
        isLoading: true
      };
    case LOAD_COMPANY_SUCCESS:
      return {
        ...state,
        Id: action.data.Id,
        Name: action.data.Name,
        Address: action.data.Address,
        Phone: action.data.Phone,
        EstablishedYear: action.data.EstablishedYear,
        Email: action.data.Email,
        AdminUsername: action.data.AdminUsername,
        ImageUrl: action.data.ImageUrl,
        Balance: action.data.Balance,
        Longtitude: action.data.Longtitude,
        Latitude: action.data.Latitude,
        isLoading: false
      };
    case LOAD_COMPANY_FAIL:
      return {
        ...INITIAL_STATE,
        isLoading: false
      };
    case LOAD_SHAREHOLDERS:
      return {
        ...state,
        isLoading: true
      };
    case LOAD_SHAREHOLDERS_SUCCESS:
      return {
        ...state,
        Shareholders: action.data,
        isLoading: false
      };
    case LOAD_SHAREHOLDERS_FAIL:
      return {
        ...state,
        Shareholders: null,
        isLoading: false
      };
    case LOAD_SHAREACCOUNTS:
      return {
        ...state,
        isLoading: true
      };
    case LOAD_SHAREACCOUNTS_SUCCESS:
      return {
        ...state,
        ShareAccounts: action.data,
        isLoading: false
      };
    case LOAD_SHAREACCOUNTS_FAIL:
      return {
        ...state,
        ShareAccounts: null,
        isLoading: false
      };
    case LOAD_ROUNDS:
      return {
        ...state,
        isLoading: false
      };
    case LOAD_ROUNDS_SUCCESS:
      return {
        ...state,
        Rounds: action.data,
        isLoading: false
      };
    case LOAD_ROUNDS_FAIL:
      return {
        ...state,
        Rounds: null,
        isLoading: false
      };
    case LOAD_TRANSACTIONS:
      return {
        ...state,
        isLoading: true
      };
    case LOAD_TRANSACTIONS_SUCCESS:
      return {
        ...state,
        Transactions: action.data,
        isLoading: false
      };
    case LOAD_TRANSACTIONS_FAIL:
      return {
        ...state,
        Transactions: null,
        isLoading: false
      };
    case LOAD_SHARE_TYPES:
      return {
        ...state,
        isLoading: true
      };
    case LOAD_SHARE_TYPES_SUCCESS:
      return {
        ...state,
        ShareTypes: action.data,
        isLoading: false
      };
    case LOAD_SHARE_TYPES_FAIL:
      return {
        ...state,
        ShareTypes: null,
        isLoading: false
      };
    default:
      return state;
  }
};
