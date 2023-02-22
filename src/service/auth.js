import axios from "axios";
import * as constants from "../config/config"

export const login = async (credential) => {
  try {
    const headers = { "Content-type": "application/json" }
    const response = await axios.post(`${constants.BASE_URL}/auth/login`, credential, {
      headers: headers,
    })
    return response
  } catch (error) {
    console.error(error);
    throw new axios.AxiosError(error)
  }
}

export const logout = async () => {
  try {
    const response = await axios.post(`${constants.BASE_URL}/auth/logout`, {}, {
      headers: { "Content-type": "application/json" },
    })
    return response
  } catch (error) {
    console.error(error);
    throw new axios.AxiosError(error)
  }
}

export const updateCredential = async (credential) => {
  try {
    const headers = { "Content-type": "application/json" }
    const response = await axios.put(`${constants.BASE_URL}/auth/${credential.id}`, credential, {
      headers: headers,
    })
    return response
  } catch (error) {
    console.error(error);
    throw new axios.AxiosError(error)
  }
}