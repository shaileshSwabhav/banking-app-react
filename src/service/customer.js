import axios from "axios";
import * as constants from "../config/config"

export const getCustomers = async (params) => {
  try {
    const headers = { "Content-type": "application/json" }
    const response = await axios.get(`${constants.BASE_URL}/customers`, {
      headers: headers, params: params
    })
    return response
  } catch (error) {
    console.error(error);
    throw new axios.AxiosError(error)
  }
}

export const addCustomer = async (customer) => {
  try {
    const headers = { "Content-type": "application/json" }
    const response = await axios.post(`${constants.BASE_URL}/customers`, customer, {
      headers: headers
    })
    return response
  } catch (error) {
    console.error(error)
    throw new axios.AxiosError(error)
  }
}