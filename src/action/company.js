import fetchAPI from '../utils/service';
import {
  GET_COMPANIES_BY_USERNAME,
  GET_SHARE_ACCOUNT,
  GET_SHAREHOLDER,
  GET_ROUNDS,
  COMPANIES,
  GET_TRANSACTION
} from '../utils/constants';

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
        params: { username: '6CmcvRLsHFfy142vM86uq2LgYj22' },
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
      console.log('updateCompany');
      const data1 = {
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
      };
      // const stringifyData = JSON.stringify(data1);
      // const stringData = `${stringifyData}`
      // axios.put(`https://emsfpt.azurewebsites.net/api/Company/7`, company).then(response => {
      //   console.log(response)
      // }).catch(err => {
      //   console.log('err: ', err.response)
      // })
      // console.log('Stringify data: ', stringifyData)
      // console.log('String data: ', stringData)
      const res = await fetchAPI({
        method: 'PUT',
        data: {
          ...data1,
        },
        endpoints: 'Company/' + company.Id,
      });
      if (res) {
        dispatch({
          type: UPDATE_COMPANY_SUCCESS,
        })
      } else {
        dispatch({
          type: UPDATE_COMPANY_FAIL,
        })
      }
    } catch (error) {
      dispatch({
        type: UPDATE_COMPANY_FAIL,
      });
      console.log(error)
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
      console.log('addCompany');
      const res = await fetchAPI({
        method: 'POST',
        data: {
          ...company,
          AdminUsername: '6CmcvRLsHFfy142vM86uq2LgYj22',
        },
        endpoints: COMPANIES,
      });
      console.log(res.data)
      if (res) {
        dispatch({
          type: ADD_COMPANY_SUCCESS,
        })
      } else {
        dispatch({
          type: ADD_COMPANY_FAIL,
        })
      }
    } catch (error) {
      dispatch({
        type: ADD_COMPANY_FAIL,
      });
      console.log(error)
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