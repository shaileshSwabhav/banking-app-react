import axios from "axios";
import * as constants from "../config/config"

export const login = async (credential) => {
  try {
    // if (!credential) {
    //   throw new Error("username password must be specified")
    // }
    const headers = { "Content-type": "application/json" }
    // const response = await axios.post(`http://192.168.1.33:8888/api/v1/login`, credential, {
    const response = await axios.post(`${constants.BASE_URL}/auth/login`, credential, {
      headers: headers,
    })
    return response
  } catch (error) {
    console.error(error);
    throw new axios.AxiosError(error)
  }
}