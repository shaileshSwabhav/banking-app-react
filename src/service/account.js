import axios from "axios";
import * as constants from "../config/config"

export const getAccounts = async (params) => {
  try {
    const headers = { "Content-type": "application/json" }
    const response = await axios.get(`${constants.BASE_URL}/accounts`, {
      params: params, headers: headers,
    })
    return response
  } catch (error) {
    console.error(error);
    throw new axios.AxiosError(error)
  }
}

export const addAccount = async (account) => {
  try {
    const headers = { "Content-type": "application/json" }
    const response = await axios.post(`${constants.BASE_URL}/accounts`, account, {
      headers: headers,
    })

    return response
  } catch (error) {
    console.error(error);
    throw new axios.AxiosError(error)
  }
}

export const updateAccount = async (account) => {
  try {
    const headers = { "Content-type": "application/json" }
    const response = await axios.put(`${constants.BASE_URL}/accounts/${account.id}`, account, {
      headers: headers,
    })

    return response
  } catch (error) {
    console.error(error);
    throw new axios.AxiosError(error)
  }
}

export const deleteAccount = async (accountID) => {
  try {
    const headers = { "Content-type": "application/json" }
    const response = await axios.delete(`${constants.BASE_URL}/accounts/${accountID}`, {
      headers: headers,
    })

    return response
  } catch (error) {
    console.error(error);
    throw new axios.AxiosError(error)
  }
}