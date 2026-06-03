import { useLocation, useNavigate } from "react-router";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/AxiosSecure";
import axios from "axios";

const useGoogleLogin = () => {
  const { logInWithGoogle } = useAuth();
  const axiosSecureInstance = useAxiosSecure();
  const navigate = useNavigate();
  const location = useLocation();
  const path = location.state?.from?.pathname || "/";

  const login = () => {
    logInWithGoogle().then(async (result) => {
      const token = await result.user.getIdToken();
      const userData = {
        displayName: result.user.displayName,
        email: result.user.email,
        photoURL: result.user.photoURL || "",
        uid: result.user.uid,
      };

      const res = await axios.post("http://localhost:3000/users", userData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      navigate(path, { replace: true });
    });
  };
  return login;
};
export default useGoogleLogin;
