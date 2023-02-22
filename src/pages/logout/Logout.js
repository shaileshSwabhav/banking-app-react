import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { logout as logoutService } from "../../service/auth";
const Logout = () => {

  const navigate = useNavigate()

  const logout = async () => {
    try {
      await logoutService()
    } catch (error) {
      console.error(error);
    } finally {
      navigate("/login")
    }
  }

  useEffect(() => {
    logout()
  }, [])

  return (
    <>
    </>
  );
}

export default Logout;