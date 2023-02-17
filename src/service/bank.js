import axios from "axios";
import * as constants from "../config/config"

export const getBanks = async () => {
  try {
    const headers = { "Content-type": "application/json" }
    const response = await axios.get(`${constants.BASE_URL}/banks`, {
      headers: headers,
    })
    return response
  } catch (error) {
    console.error(error);
    throw new axios.AxiosError(error)
  }
}

export const addBank = async (bank) => {
  try {
    const headers = { "Content-type": "application/json" }
    const response = await axios.post(`${constants.BASE_URL}/banks`, bank, {
      headers: headers,
    })

    return response
  } catch (error) {
    console.error(error);
    throw new axios.AxiosError(error)
  }
}

export const deleteBank = async (bankID) => {
  try {
    if (!bankID) {
      throw new Error("BankID must be specified")
    }
    const headers = { "Content-type": "application/json" }
    const response = await axios.delete(`${constants.BASE_URL}/banks/${bankID}`, {
      headers: headers,
    })

    return response
  } catch (error) {
    console.error(error);
    throw new axios.AxiosError(error)
  }
}