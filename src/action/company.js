import fetchAPI from '../utils/service';
import {
  GET_COMPANIES_BY_USERNAME,
  GET_SHARE_ACCOUNT,
  GET_SHAREHOLDER,
  GET_ROUNDS,
  COMPANIES,
  GET_TRANSACTION
} from '../utils/constants';

export const TOAST = 'TOAST';

export const LOAD_COMPANY = 'LOAD_COMPANY';
export const LOAD_COMPANY_SUCCESS = 'LOAD_COMPANY_SUCCESS';
export const LOAD_COMPANY_FAIL = 'LOAD_COMPANY_FAIL';

export function getCompany(data) {
  return async function action(dispatch) {
    dispatch({
      type: LOAD_COMPANY,
    })
    try {
      const res = await fetchAPI({
        method: 'GET',
        params: { username: data.Username },
        endpoints: GET_COMPANIES_BY_USERNAME,
      });
      if (res) {
        dispatch({
          type: LOAD_COMPANY_SUCCESS,
          data: res.data
        })
      } else {
        dispatch({
          type: LOAD_COMPANY_FAIL
        })
      }
    } catch (error) {
      dispatch({
        type: LOAD_COMPANY_FAIL
      });
      console.log(error.message)
    }
  }
}

export const UPDATE_COMPANY = 'UPDATE_COMPANY';
export const UPDATE_COMPANY_SUCCESS = 'UPDATE_COMPANY_SUCCESS';
export const UPDATE_COMPANY_FAIL = 'UPDATE_COMPANY_FAIL';

export function updateCompany(company) {
  return async function action(dispatch) {
    dispatch({
      type: UPDATE_COMPANY,
    });
    try {
      const payload = {
        Id: company.Id,
        Name: company.Name,
        Address: company.Address,
        Phone: company.Phone,
        EstablishedYear: company.EstablishedYear,
        Email: company.Email,
        AdminUsername: company.AdminUsername,
        Longtitude: company.Longtitude,
        Latitude: company.Latitude,
        Balance: company.Balance,
        IsActive: company.IsActive
      };
      const res = await fetchAPI({
        method: 'PUT',
        data: {
          ...payload,
        },
        endpoints: 'Company/' + company.Id,
      });
      if (res) {
        dispatch({
          type: UPDATE_COMPANY_SUCCESS,
        })
        return true
      } else {
        dispatch({
          type: UPDATE_COMPANY_FAIL,
        })
        return false
      }
    } catch (error) {
      dispatch({
        type: UPDATE_COMPANY_FAIL,
      });
      console.log(error)
      return false
    }
  }
}

export const ADD_COMPANY = 'ADD_COMPANY';
export const ADD_COMPANY_SUCCESS = 'ADD_COMPANY_SUCCESS';
export const ADD_COMPANY_FAIL = 'ADD_COMPANY_FAIL';

export function addCompany(company) {
  return async function action(dispatch) {
    dispatch({
      type: ADD_COMPANY,
    })
    try {
      const payload = {
        Name: company.Name,
        Address: company.Address,
        Phone: company.Phone,
        EstablishedYear: company.EstablishedYear,
        Email: company.Email,
        AdminUsername: company.AdminUsername,
        Longtitude: company.Longtitude,
        Latitude: company.Latitude,
        Balance: company.Balance,
        IsActive: true,
      };
      const res = await fetchAPI({
        method: 'POST',
        data: {
          ...payload,
        },
        endpoints: COMPANIES,
      });
      if (res) {
        dispatch({
          type: ADD_COMPANY_SUCCESS,
        })
        dispatch({
          type: TOAST,
          payload: {
            header: 'Add new Company',
            body: 'Adding success'
          }
        })
        return true
      } else {
        dispatch({
          type: ADD_COMPANY_FAIL,
        })
        return false
      }
    } catch (error) {
      dispatch({
        type: ADD_COMPANY_FAIL,
      });
      console.log(error)
      return false
    }
  }
}

export const SELECT_COMPANY = 'SELECT_COMPANY';

export function selectCompany(id) {
  return async function action(dispatch) {
    dispatch({
      type: SELECT_COMPANY,
    })
    try {
      const res = await fetchAPI({
        method: 'GET',
        endpoints: GET_COMPANIES_BY_USERNAME + '/' + id,
      });
      if (res) {
        dispatch({
          type: LOAD_COMPANY_SUCCESS,
          data: res.data
        })
      } else {
        dispatch({
          type: LOAD_COMPANY_FAIL
        })
      }
    } catch (error) {
      dispatch({
        type: LOAD_COMPANY_FAIL
      });
      console.log(error.message)
    }
  }
}

export const LOAD_SHAREHOLDERS = 'LOAD_SHAREHOLDERS';
export const LOAD_SHAREHOLDERS_SUCCESS = 'LOAD_SHAREHOLDERS_SUCCESS';
export const LOAD_SHAREHOLDERS_FAIL = 'LOAD_SHAREHOLDERS_FAIL';

export function getShareholders(data) {
  return async function action(dispatch) {
    dispatch({
      type: LOAD_SHAREHOLDERS,
    })
    try {
      const res = await fetchAPI({
        method: 'GET',
        params: { companyId: data.id },
        endpoints: GET_SHAREHOLDER,
      });
      if (res) {
        dispatch({
          type: LOAD_SHAREHOLDERS_SUCCESS,
          data: res.data
        })
      } else {
        dispatch({
          type: LOAD_SHAREHOLDERS_FAIL
        })
      }
    } catch (error) {
      dispatch({
        type: LOAD_SHAREHOLDERS_FAIL
      });
      console.log(error.message)
    }
  }
}

export const ADD_SHAREHOLDERS = 'ADD_SHAREHOLDERS';
export const ADD_SHAREHOLDERS_SUCCESS = 'ADD_SHAREHOLDERS_SUCCESS';
export const ADD_SHAREHOLDERS_FAIL = 'ADD_SHAREHOLDERS_FAIL';

export function addShareholder(data) {
  return async function action(dispatch) {
    dispatch({
      type: ADD_SHAREHOLDERS,
    })
    try {
      let valid = true;
      //Check if share holder is existed
      const res1 = await fetchAPI({
        method: 'GET',
        params: { companyId: data.companyId },
        endpoints: GET_SHAREHOLDER,
      });
      if (res1) {
        res1.data.forEach(entry => {
          console.log(entry);
          if (entry.Username === data.Username) {
            // Toast fail action
            valid = false
          }
        });
      }
      //Add share holder
      if (valid) {
        const res = await fetchAPI({
          method: 'POST',
          params: {
            companyId: data.Id,
            amount: 0
          },
          data: {
            Username: data.Username,
            CompanyId: data.companyId,
            ShareholderTypeId: data.ShareholderTypeId || 1,
            IsPublic: data.IsPublic,
            IsActive: true,
          },
          endpoints: GET_SHAREHOLDER,
        });
        if (res) {
          dispatch({
            type: ADD_SHAREHOLDERS_SUCCESS,
          })
          return true
        } else {
          dispatch({
            type: ADD_SHAREHOLDERS_FAIL
          })
          return false
        }
      }
    } catch (error) {
      dispatch({
        type: ADD_SHAREHOLDERS_FAIL
      });
      console.log(error.message)
      return false
    }
  }
}

export const UPDATE_SHAREHOLDERS = 'UPDATE_SHAREHOLDERS';
export const UPDATE_SHAREHOLDERS_SUCCESS = 'UPDATE_SHAREHOLDERS_SUCCESS';
export const UPDATE_SHAREHOLDERS_FAIL = 'UPDATE_SHAREHOLDERS_FAIL';

export function updateShareholder(data) {
  return async function action(dispatch) {
    dispatch({
      type: UPDATE_SHAREHOLDERS,
    })
    try {
      //Update share holder
      const res = await fetchAPI({
        method: 'PUT',
        // params: { id: data.Id },
        data: {
          Id: data.Id,
          Username: data.Username,
          CompanyId: data.CompanyId,
          ShareholderTypeId: data.ShareholderTypeId,
          IsActive: data.IsActive,
          IsPublic: data.IsPublic,
        },
        endpoints: `${GET_SHAREHOLDER}/${data.Id}`,
      });
      if (res) {
        dispatch({
          type: UPDATE_SHAREHOLDERS_SUCCESS,
        })
        return true
      } else {
        dispatch({
          type: UPDATE_SHAREHOLDERS_FAIL
        })
        return false
      }
    } catch (error) {
      dispatch({
        type: UPDATE_SHAREHOLDERS_FAIL
      });
      console.log(error.message)
      return false
    }
  }
}

export const LOAD_SHAREACCOUNTS = 'LOAD_SHAREACCOUNTS';
export const LOAD_SHAREACCOUNTS_SUCCESS = 'LOAD_SHAREACCOUNTS_SUCCESS';
export const LOAD_SHAREACCOUNTS_FAIL = 'LOAD_SHAREACCOUNTS_FAIL';

export function getShareAccounts(data) {
  return async function action(dispatch) {
    dispatch({
      type: LOAD_SHAREACCOUNTS,
    })
    try {
      const res = await fetchAPI({
        method: 'GET',
        params: { companyId: data.id },
        endpoints: GET_SHARE_ACCOUNT,
      });
      if (res) {
        dispatch({
          type: LOAD_SHAREACCOUNTS_SUCCESS,
          data: res.data
        })
      } else {
        dispatch({
          type: LOAD_SHAREACCOUNTS_FAIL
        })
      }
    } catch (error) {
      dispatch({
        type: LOAD_SHAREACCOUNTS_FAIL
      });
      console.log(error.message)
    }
  }
}

export const LOAD_ROUNDS = 'LOAD_ROUNDS';
export const LOAD_ROUNDS_SUCCESS = 'LOAD_ROUNDS_SUCCESS';
export const LOAD_ROUNDS_FAIL = 'LOAD_ROUNDS_FAIL';

export function getRounds(data) {
  return async function action(dispatch) {
    dispatch({
      type: LOAD_ROUNDS,
    })
    try {
      const res = await fetchAPI({
        method: 'GET',
        params: { companyId: data.id },
        endpoints: GET_ROUNDS,
      });
      if (res) {
        dispatch({
          type: LOAD_ROUNDS_SUCCESS,
          data: res.data
        })
      } else {
        dispatch({
          type: LOAD_ROUNDS_FAIL
        })
      }
    } catch (error) {
      dispatch({
        type: LOAD_ROUNDS_FAIL
      });
      console.log(error.message)
    }
  }
}

export const LOAD_TRANSACTIONS = 'LOAD_TRANSACTIONS';
export const LOAD_TRANSACTIONS_SUCCESS = 'LOAD_TRANSACTIONS_SUCCESS';
export const LOAD_TRANSACTIONS_FAIL = 'LOAD_TRANSACTIONS_FAIL';

export function getTransactions(data) {
  return async function action(dispatch) {
    dispatch({
      type: LOAD_TRANSACTIONS,
    })
    try {
      const res = await fetchAPI({
        method: 'GET',
        params: { companyId: data.id },
        endpoints: GET_TRANSACTION,
      });
      if (res) {
        dispatch({
          type: LOAD_TRANSACTIONS_SUCCESS,
          data: res.data
        })
      } else {
        dispatch({
          type: LOAD_TRANSACTIONS_FAIL
        })
      }
    } catch (error) {
      dispatch({
        type: LOAD_TRANSACTIONS_FAIL
      });
      console.log(error.message)
    }
  }
}