import { useNavigate } from "react-router";
import useAxios from "../../../Hooks/AxiosHook";
import useAuth from "../../../Hooks/useAuth";

const useGoogleLogin = () => {
  const { logInWithGoogle } = useAuth();
  const axiosInstance = useAxios();
  const navigate = useNavigate();
  const login = () => {
    logInWithGoogle()
      .then((result) => {
        const user = {
          displayName: result.user.displayName,
          email: result.user.email,
          photoURL: result.user.photoURL || "",
          uid: result.user.uid,
        };
        axiosInstance
          .post("/users", user)
          .then((res) => navigate(path, { replace: true }));
      })
      .catch((err) => {
        setErr("Google login failed");
      });
  };
  return login;
};
export default useGoogleLogin;
