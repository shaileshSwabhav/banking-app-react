import axios from "axios";
import * as constants from "../config/config"

export const getBanks = async () => {
  try {
    const response = await axios.get(`${constants.BASE_URL}/banks`)
    return response
  } catch (error) {
    console.error(error);
    throw new axios.AxiosError(error)
  }
}
