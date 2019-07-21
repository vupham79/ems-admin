import fetchAPI from "../utils/service";
import {
  GET_COMPANIES_BY_USERNAME,
  GET_SHARE_ACCOUNT,
  GET_SHAREHOLDER,
  GET_ROUNDS,
  COMPANIES,
  GET_TRANSACTION,
  REQUEST,
  INVESTOR,
  FUNDER,
  EMPLOYEE,
  TAKE_BACK,
  TRANSFER
} from "../utils/constants";

export const TOAST_SHOW = "TOAST_SHOW";

export const LOAD_COMPANY = "LOAD_COMPANY";
export const LOAD_COMPANY_SUCCESS = "LOAD_COMPANY_SUCCESS";
export const LOAD_COMPANY_FAIL = "LOAD_COMPANY_FAIL";

export function getCompany(data) {
  return async function action(dispatch) {
    dispatch({
      type: LOAD_COMPANY
    });
    try {
      const res = await fetchAPI({
        method: "GET",
        params: { username: data.Username },
        endpoints: GET_COMPANIES_BY_USERNAME
      });
      if (res) {
        dispatch({
          type: LOAD_COMPANY_SUCCESS,
          data: res.data
        });
      } else {
        dispatch({
          type: LOAD_COMPANY_FAIL
        });
      }
    } catch (error) {
      dispatch({
        type: LOAD_COMPANY_FAIL
      });
      dispatch({
        type: TOAST_SHOW,
        payload: {
          header: "Company",
          body: `${error.message}`,
          type: "fail"
        }
      });
    }
  };
}

export const UPDATE_COMPANY = "UPDATE_COMPANY";
export const UPDATE_COMPANY_SUCCESS = "UPDATE_COMPANY_SUCCESS";
export const UPDATE_COMPANY_FAIL = "UPDATE_COMPANY_FAIL";

export function updateCompany(company, storage) {
  return async function action(dispatch) {
    dispatch({
      type: UPDATE_COMPANY
    });
    try {
      if (company.blob) {
        const task = storage.ref(`companies/${company.Id}`).put(company.blob);
        task.on(
          "state_changed",
          () => {},
          error => {
            console.log(error);
          },
          () => {
            task.snapshot.ref.getDownloadURL().then(async url => {
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
                ImageUrl: url,
                IsActive: company.IsActive
              };
              const res = await fetchAPI({
                method: "PUT",
                data: {
                  ...payload
                },
                endpoints: "Company/" + company.Id
              });
              if (res) {
                dispatch({
                  type: UPDATE_COMPANY_SUCCESS
                });
                dispatch({
                  type: "TOAST_SHOW",
                  payload: {
                    header: "Company",
                    body: "Update success",
                    type: "success"
                  }
                });
                return true;
              } else {
                dispatch({
                  type: UPDATE_COMPANY_FAIL
                });
                dispatch({
                  type: "TOAST_SHOW",
                  payload: {
                    header: "Company",
                    body: "Update failed!",
                    type: "fail"
                  }
                });
                return false;
              }
            });
          }
        );
      } else {
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
          ImageUrl: company.ImageUrl,
          IsActive: company.IsActive
        };
        const res = await fetchAPI({
          method: "PUT",
          data: {
            ...payload
          },
          endpoints: "Company/" + company.Id
        });
        if (res) {
          dispatch({
            type: UPDATE_COMPANY_SUCCESS
          });
          dispatch({
            type: "TOAST_SHOW",
            payload: {
              header: "Company",
              body: "Update success",
              type: "success"
            }
          });
          return true;
        } else {
          dispatch({
            type: UPDATE_COMPANY_FAIL
          });
          dispatch({
            type: "TOAST_SHOW",
            payload: {
              header: "Company",
              body: "Update failed!",
              type: "fail"
            }
          });
          return false;
        }
      }
    } catch (error) {
      dispatch({
        type: UPDATE_COMPANY_FAIL
      });
      dispatch({
        type: TOAST_SHOW,
        payload: {
          header: "Company",
          body: `${error.message}`,
          type: "fail"
        }
      });
      return false;
    }
  };
}

export const ADD_COMPANY = "ADD_COMPANY";
export const ADD_COMPANY_SUCCESS = "ADD_COMPANY_SUCCESS";
export const ADD_COMPANY_FAIL = "ADD_COMPANY_FAIL";

export function addCompany(company, storage) {
  return async function action(dispatch) {
    dispatch({
      type: ADD_COMPANY
    });
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
        ImageUrl:
          "https://storage.googleapis.com/emsandroid-db602.appspot.com/companies/logo_notfound.png",
        IsActive: true,
        IsPublic: true
      };
      const res = await fetchAPI({
        method: "POST",
        data: {
          ...payload
        },
        endpoints: COMPANIES
      });
      if (res) {
        // res.data.Id
        if (company.blob) {
          const task = storage
            .ref(`companies/${res.data.Id}`)
            .put(company.blob);
          task.on(
            "state_changed",
            () => {},
            error => {
              console.log(error);
            },
            () => {
              task.snapshot.ref.getDownloadURL().then(async url => {
                const payload = {
                  Id: res.data.Id,
                  Name: company.Name,
                  Address: company.Address,
                  Phone: company.Phone,
                  EstablishedYear: company.EstablishedYear,
                  Email: company.Email,
                  AdminUsername: company.AdminUsername,
                  Longtitude: company.Longtitude,
                  Latitude: company.Latitude,
                  IsActive: true,
                  IsPublic: true,
                  ImageUrl: url
                };
                const update = await fetchAPI({
                  method: "PUT",
                  data: {
                    ...payload
                  },
                  endpoints: "Company/" + res.data.Id
                });
                if (update) {
                  dispatch({
                    type: ADD_COMPANY_SUCCESS
                  });
                  dispatch({
                    type: TOAST_SHOW,
                    payload: {
                      header: "Company",
                      body: "Adding success",
                      type: "success"
                    }
                  });
                  return true;
                } else {
                  dispatch({
                    type: ADD_COMPANY_FAIL
                  });
                  dispatch({
                    type: TOAST_SHOW,
                    payload: {
                      header: "Company",
                      body: "Adding failed!",
                      type: "fail"
                    }
                  });
                  return false;
                }
              });
            }
          );
        } else {
          dispatch({
            type: ADD_COMPANY_SUCCESS
          });
          dispatch({
            type: TOAST_SHOW,
            payload: {
              header: "Company",
              body: "Adding success",
              type: "success"
            }
          });
          return true;
        }
      } else {
        dispatch({
          type: ADD_COMPANY_FAIL
        });
        dispatch({
          type: TOAST_SHOW,
          payload: {
            header: "Company",
            body: "Adding failed!",
            type: "fail"
          }
        });
        return false;
      }
    } catch (error) {
      dispatch({
        type: ADD_COMPANY_FAIL
      });
      dispatch({
        type: TOAST_SHOW,
        payload: {
          header: "Company",
          body: `${error.message}`,
          type: "fail"
        }
      });
      return false;
    }
  };
}

export const SELECT_COMPANY = "SELECT_COMPANY";

export function selectCompany(id) {
  return async function action(dispatch) {
    dispatch({
      type: SELECT_COMPANY
    });
    try {
      const res = await fetchAPI({
        method: "GET",
        endpoints: GET_COMPANIES_BY_USERNAME + "/" + id
      });
      if (res) {
        dispatch({
          type: LOAD_COMPANY_SUCCESS,
          data: res.data
        });
      } else {
        dispatch({
          type: LOAD_COMPANY_FAIL
        });
      }
    } catch (error) {
      dispatch({
        type: LOAD_COMPANY_FAIL
      });
      dispatch({
        type: TOAST_SHOW,
        payload: {
          header: "Company",
          body: `${error.message}`,
          type: "fail"
        }
      });
    }
  };
}

export const LOAD_SHAREHOLDERS = "LOAD_SHAREHOLDERS";
export const LOAD_SHAREHOLDERS_SUCCESS = "LOAD_SHAREHOLDERS_SUCCESS";
export const LOAD_SHAREHOLDERS_FAIL = "LOAD_SHAREHOLDERS_FAIL";

export function getShareholders(data) {
  return async function action(dispatch) {
    dispatch({
      type: LOAD_SHAREHOLDERS
    });
    try {
      const res = await fetchAPI({
        method: "GET",
        params: { companyId: data.id },
        endpoints: GET_SHAREHOLDER
      });
      if (res) {
        dispatch({
          type: LOAD_SHAREHOLDERS_SUCCESS,
          data: res.data
        });
        return true;
      } else {
        dispatch({
          type: LOAD_SHAREHOLDERS_FAIL
        });
        return false;
      }
    } catch (error) {
      dispatch({
        type: LOAD_SHAREHOLDERS_FAIL
      });
      dispatch({
        type: TOAST_SHOW,
        payload: {
          header: "Shareholder",
          body: `${error.message}`,
          type: "fail"
        }
      });
      return false;
    }
  };
}

export const ADD_SHAREHOLDERS = "ADD_SHAREHOLDERS";
export const ADD_SHAREHOLDERS_SUCCESS = "ADD_SHAREHOLDERS_SUCCESS";
export const ADD_SHAREHOLDERS_FAIL = "ADD_SHAREHOLDERS_FAIL";

export function addShareholder(shareholder, companyId) {
  return async function action(dispatch) {
    dispatch({
      type: ADD_SHAREHOLDERS
    });
    try {
      let valid = true;
      //Check if share holder is existed
      const res1 = await fetchAPI({
        method: "GET",
        params: { companyId: companyId },
        endpoints: GET_SHAREHOLDER
      });
      if (res1) {
        res1.data.forEach(entry => {
          if (entry.Username === shareholder.Username) {
            // Toast fail action
            valid = false;
          }
        });
      }
      //Add share holder
      if (valid) {
        let endpoints = "";
        switch (shareholder.ShareholderTypeId) {
          case "1":
            //Funder
            endpoints = FUNDER;
            break;
          case "2":
            //Investor
            endpoints = INVESTOR;
            break;
          case "3":
            //Employee
            endpoints = EMPLOYEE;
            break;
          default:
            break;
        }
        const res = await fetchAPI({
          method: "POST",
          params: {
            username: shareholder.Username,
            companyId: companyId,
            amount: shareholder.balance
          },
          endpoints: endpoints
        });
        if (res) {
          dispatch({
            type: ADD_SHAREHOLDERS_SUCCESS
          });
          dispatch({
            type: "TOAST_SHOW",
            payload: {
              header: "Shareholder",
              body: "Adding success",
              type: "success"
            }
          });
          return true;
        } else {
          dispatch({
            type: ADD_SHAREHOLDERS_FAIL
          });
          dispatch({
            type: "TOAST_SHOW",
            payload: {
              header: "Shareholder",
              body: "Adding failed!",
              type: "fail"
            }
          });
          return false;
        }
      }
    } catch (error) {
      dispatch({
        type: ADD_SHAREHOLDERS_FAIL
      });
      dispatch({
        type: "TOAST_SHOW",
        payload: {
          header: "Shareholder",
          body: `${error.message}`,
          type: "fail"
        }
      });
      return false;
    }
  };
}

export const UPDATE_SHAREHOLDERS = "UPDATE_SHAREHOLDERS";
export const UPDATE_SHAREHOLDERS_SUCCESS = "UPDATE_SHAREHOLDERS_SUCCESS";
export const UPDATE_SHAREHOLDERS_FAIL = "UPDATE_SHAREHOLDERS_FAIL";

export function updateShareholder(shareholder, companyId) {
  return async function action(dispatch) {
    dispatch({
      type: UPDATE_SHAREHOLDERS
    });
    try {
      //Update share holder
      const res = await fetchAPI({
        method: "PUT",
        data: {
          Id: shareholder.Id,
          Username: shareholder.Username,
          CompanyId: companyId,
          ShareholderTypeId: shareholder.ShareholderTypeId,
          IsActive: shareholder.IsActive,
          IsPublic: shareholder.IsPublic
        },
        endpoints: `${GET_SHAREHOLDER}/${shareholder.Id}`
      });
      if (res) {
        dispatch({
          type: UPDATE_SHAREHOLDERS_SUCCESS
        });
        dispatch({
          type: TOAST_SHOW,
          payload: {
            header: "Shareholder",
            body: "Update success",
            type: "success"
          }
        });
        return true;
      } else {
        dispatch({
          type: UPDATE_SHAREHOLDERS_FAIL
        });
        dispatch({
          type: TOAST_SHOW,
          payload: {
            header: "Shareholder",
            body: "Update failed!",
            type: "fail"
          }
        });
        return false;
      }
    } catch (error) {
      dispatch({
        type: UPDATE_SHAREHOLDERS_FAIL
      });
      dispatch({
        type: TOAST_SHOW,
        payload: {
          header: "Shareholder",
          body: `${error.message}`,
          type: "fail"
        }
      });
      return false;
    }
  };
}

export const LOAD_SHAREACCOUNTS = "LOAD_SHAREACCOUNTS";
export const LOAD_SHAREACCOUNTS_SUCCESS = "LOAD_SHAREACCOUNTS_SUCCESS";
export const LOAD_SHAREACCOUNTS_FAIL = "LOAD_SHAREACCOUNTS_FAIL";

export function getShareAccounts(data) {
  return async function action(dispatch) {
    dispatch({
      type: LOAD_SHAREACCOUNTS
    });
    try {
      const res = await fetchAPI({
        method: "GET",
        params: { companyId: data.id },
        endpoints: GET_SHARE_ACCOUNT
      });
      if (res) {
        dispatch({
          type: LOAD_SHAREACCOUNTS_SUCCESS,
          data: res.data
        });
      } else {
        dispatch({
          type: LOAD_SHAREACCOUNTS_FAIL
        });
      }
    } catch (error) {
      dispatch({
        type: LOAD_SHAREACCOUNTS_FAIL
      });
      dispatch({
        type: TOAST_SHOW,
        payload: {
          header: "Share accounts",
          body: `${error.message}`,
          type: "fail"
        }
      });
    }
  };
}

export const LOAD_ROUNDS = "LOAD_ROUNDS";
export const LOAD_ROUNDS_SUCCESS = "LOAD_ROUNDS_SUCCESS";
export const LOAD_ROUNDS_FAIL = "LOAD_ROUNDS_FAIL";

export function getRounds(data) {
  return async function action(dispatch) {
    dispatch({
      type: LOAD_ROUNDS
    });
    try {
      const res = await fetchAPI({
        method: "GET",
        params: { companyId: data.id },
        endpoints: GET_ROUNDS
      });
      if (res) {
        dispatch({
          type: LOAD_ROUNDS_SUCCESS,
          data: res.data
        });
      } else {
        dispatch({
          type: LOAD_ROUNDS_FAIL
        });
      }
    } catch (error) {
      dispatch({
        type: LOAD_ROUNDS_FAIL
      });
      dispatch({
        type: TOAST_SHOW,
        payload: {
          header: "Rounds",
          body: `${error.message}`,
          type: "fail"
        }
      });
    }
  };
}

export const LOAD_TRANSACTIONS = "LOAD_TRANSACTIONS";
export const LOAD_TRANSACTIONS_SUCCESS = "LOAD_TRANSACTIONS_SUCCESS";
export const LOAD_TRANSACTIONS_FAIL = "LOAD_TRANSACTIONS_FAIL";

export function getTransactions(data) {
  return async function action(dispatch) {
    dispatch({
      type: LOAD_TRANSACTIONS
    });
    try {
      const res = await fetchAPI({
        method: "GET",
        params: { companyId: data.id },
        endpoints: GET_TRANSACTION
      });
      if (res) {
        dispatch({
          type: LOAD_TRANSACTIONS_SUCCESS,
          data: res.data
        });
      } else {
        dispatch({
          type: LOAD_TRANSACTIONS_FAIL
        });
      }
    } catch (error) {
      dispatch({
        type: LOAD_TRANSACTIONS_FAIL
      });
      dispatch({
        type: TOAST_SHOW,
        payload: {
          header: "Transaction",
          body: `${error.message}`,
          type: "fail"
        }
      });
    }
  };
}

export const APPROVE_TRANSACTION = "APPROVE_TRANSACTION";
export const APPROVE_TRANSACTION_SUCCESS = "APPROVE_TRANSACTION_SUCCESS";
export const APPROVE_TRANSACTION_FAIL = "APPROVE_TRANSACTION_FAIL";

export function approveTransaction(data) {
  return async function action(dispatch) {
    dispatch({
      type: APPROVE_TRANSACTION
    });
    try {
      const res = await fetchAPI({
        method: "PUT",
        params: {
          transactionId: data.transactionId,
          status: data.status
        },
        endpoints: REQUEST
      });
      if (res) {
        dispatch({
          type: APPROVE_TRANSACTION_SUCCESS
        });
        dispatch({
          type: TOAST_SHOW,
          payload: {
            header: "Transaction",
            body: "Approve success!",
            type: "success"
          }
        });
        return true;
      } else {
        dispatch({
          type: APPROVE_TRANSACTION_FAIL
        });
        dispatch({
          type: TOAST_SHOW,
          payload: {
            header: "Transaction",
            body: "Approve failed!",
            type: "fail"
          }
        });
        return false;
      }
    } catch (error) {
      dispatch({
        type: APPROVE_TRANSACTION_FAIL
      });
      dispatch({
        type: TOAST_SHOW,
        payload: {
          header: "Transaction",
          body: `${error.message}`,
          type: "fail"
        }
      });
      return false;
    }
  };
}

export const TRANSFER_SHARE = "TRANSFER_SHARE";
export const TRANSFER_SHARE_SUCCESS = "TRANSFER_SHARE_SUCCESS";
export const TRANSFER_SHARE_FAIL = "TRANSFER_SHARE_FAIL";

export function transferShare(data) {
  return async function action(dispatch) {
    dispatch({
      type: TRANSFER_SHARE
    });
    try {
      const res = await fetchAPI({
        method: "POST",
        params: {
          shareAccountId: data.resource,
          username: data.destination,
          amount: parseInt(data.amount)
        },
        endpoints: TRANSFER
      }).catch(e => console.log("res: ", e));
      if (res) {
        dispatch({
          type: TRANSFER_SHARE_SUCCESS
        });
        dispatch({
          type: TOAST_SHOW,
          payload: {
            header: "Transfer",
            body: "Transfer success",
            type: "success"
          }
        });
        return true;
      } else {
        dispatch({
          type: TRANSFER_SHARE_FAIL
        });
        dispatch({
          type: TOAST_SHOW,
          payload: {
            header: "Transfer",
            body: "Transfer failed",
            type: "fail"
          }
        });
        return false;
      }
    } catch (error) {
      dispatch({
        type: TRANSFER_SHARE_FAIL
      });
      dispatch({
        type: TOAST_SHOW,
        payload: {
          header: "Transfer",
          body: `${error.Message} 2222`,
          type: "fail"
        }
      });
      return false;
    }
  };
}

export const TAKE_BACK_SHARE = "TAKE_BACK_SHARE";
export const TAKE_BACK_SHARE_SUCCESS = "TAKE_BACK_SHARE_SUCCESS";
export const TAKE_BACK_SHARE_FAIL = "TAKE_BACK_SHARE_FAIL";

export function takeBackShare(data) {
  return async function action(dispatch) {
    dispatch({
      type: TAKE_BACK_SHARE
    });
    try {
      const res = await fetchAPI({
        method: "POST",
        params: {
          shareAccountId: data.resource,
          amount: data.amount
        },
        endpoints: TAKE_BACK
      });
      if (res) {
        dispatch({
          type: TAKE_BACK_SHARE_SUCCESS
        });
        dispatch({
          type: TOAST_SHOW,
          payload: {
            header: "Take Back",
            body: "Take back success",
            type: "success"
          }
        });
        return true;
      } else {
        dispatch({
          type: TAKE_BACK_SHARE_FAIL
        });
        dispatch({
          type: TOAST_SHOW,
          payload: {
            header: "Take Back",
            body: "Take back failed!",
            type: "fail"
          }
        });
        return false;
      }
    } catch (error) {
      dispatch({
        type: TAKE_BACK_SHARE_FAIL
      });
      dispatch({
        type: TOAST_SHOW,
        payload: {
          header: "Take Back",
          body: `${error.message}`,
          type: "fail"
        }
      });
      return false;
    }
  };
}
