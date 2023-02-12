import axios from "axios";
import * as constants from "../../../config/config"

export const getAccounts = async (params) => {
  try {
    const response = await axios.get(`${constants.BASE_URL}/accounts`, {
      params: params
    })
    return response
  } catch (error) {
    console.error(error);
  }
}