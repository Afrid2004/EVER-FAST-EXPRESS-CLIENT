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
      const email = result?.user?.providerData[0].email || "";
      const userData = {
        displayName: result.user.displayName,
        email: email,
        photoURL: result.user.photoURL || "",
        uid: result.user.uid,
      };

      const res = await axios.post(
        "https://ever-fast-express-backend-production.up.railway.app/users",
        userData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      navigate(path, { replace: true });
    });
  };
  return login;
};
export default useGoogleLogin;
