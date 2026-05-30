import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import useAuth from "./useAuth";

export const useLogout = () => {
  const navigate = useNavigate();
  const { logoutUser } = useAuth();
  const logout = async () => {
    const result = await Swal.fire({
      title: "Confirm logout?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#7ccf00",
      cancelButtonColor: "#1e2939",
      confirmButtonText: "Yes, logout!",
    });
    if (result.isConfirmed) {
      await logoutUser().then(() => {
        navigate("/login", { replace: true });
      });
    }
  };
  return logout;
};
