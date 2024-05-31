import axios from "axios";
// import { setAuthData } from "../store/slices/auth-slice";

const useRefreshToken = () => {
    const refresh = async () => {
        const response = await axios.get('/refresh', {
            withCredentials: true
        })
    }
  return null
}

export default useRefreshToken