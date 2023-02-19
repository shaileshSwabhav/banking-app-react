import axios from "axios";
import * as constants from "../config/config"

export const accountTransaction = async (accountID, transactionType, transaction) => {
  try {
    const headers = { "Content-type": "application/json" }
    const response = await axios.post(`${constants.BASE_URL}/accounts/${accountID}/${transactionType.toLowerCase()}`, transaction, {
      headers: headers,
    })

    return response
  } catch (error) {
    console.error(error);
    throw new axios.AxiosError(error)
  }
}
