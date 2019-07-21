import { API_URL } from "./constants";
import axios from "axios";
import store from "../store";

export default async ({ method = "GET", data, headers, params, endpoints }) => {
  const myHeaders = store.getState().user.isAuth
    ? {
        ...headers,
        "Content-Type": "application/json",
        Authentication: store.getState().user.token
      }
    : headers;
  console.log("url: ", `${API_URL}${endpoints}`);
  console.log("data: ", JSON.stringify(data));
  console.log("method: ", method);
  return await axios({
    method,
    url: `${API_URL}${endpoints}`,
    data: JSON.stringify(data),
    params,
    headers: myHeaders
  });
};
