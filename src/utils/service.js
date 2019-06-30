import { API_URL } from './constants';
import axios from 'axios';

export default async ({ method = 'GET', data, headers, params, endpoints }) => {
  // const myHeaders = store.getState().user.isAuth
  //   ? {
  //     ...headers,
  //     Authorization: store.getState().user.info.token,
  //   } : headers;
  console.log('url: ', `${API_URL}${endpoints}`)
  console.log('data: ', JSON.stringify(data))
  console.log('method: ', method)
  return await axios({
    method,
    headers: {
      'Content-type': 'application/json'
      // 'Access-Control-Allow-Origin': '*',
      // 'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT, DELETE',
      // 'Access-Control-Allow-Headers:': 'Content-Type',
    },
    url: `${API_URL}${endpoints}`,
    data: JSON.stringify(data),
    params,
    // headers: myHeaders,
  });
};