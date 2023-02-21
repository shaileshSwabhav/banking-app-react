import axios from "axios";
import * as constants from "../config/config"

export const addAccountTransaction = async (accountID, transactionType, transaction) => {
  try {
    const response = await axios.post(`${constants.BASE_URL}/accounts/${accountID}/${transactionType.toLowerCase()}`, transaction, {
      headers: { "Content-type": "application/json" },
    })

    return response
  } catch (error) {
    console.error(error);
    throw new axios.AxiosError(error)
  }
}

export const getAccountTransactions = async (accountID, queryParams) => {
  try {
    const response = await axios.get(`${constants.BASE_URL}/accounts/${accountID}/transactions`, {
      headers: { "Content-type": "application/json" }, params: queryParams
    })

    return response
  } catch (error) {
    console.error(error);
    throw new axios.AxiosError(error)
  }
}