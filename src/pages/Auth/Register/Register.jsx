import { useFormik } from "formik";
import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { FiEye, FiEyeOff, FiLock, FiMail, FiUser } from "react-icons/fi";
import { Link, useLocation, useNavigate } from "react-router";
import * as yup from "yup";
import useAuth from "../../../Hooks/useAuth";
import LoadingSpin from "../../../components/Loadings/LoadingSpin";

const Register = () => {
  const {
    createUser,
    emailVerification,
    updateUser,
    logoutUser,
    logInWithGoogle,
  } = useAuth();
  const [show, setShow] = useState(false);
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const path = location.state?.from?.pathname || "/";
  const handleShow = () => {
    setShow(!show);
  };
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    validationSchema: yup.object({
      name: yup
        .string()
        .min(2, "Name must be at least 2 characters")
        .required("Name is required"),
      email: yup.string().email("Invalid email").required("Email is required"),
      password: yup
        .string()
        .matches(/[A-Z]/, "At least one uppercase letter is required")
        .matches(/[a-z]/, "At least one lowercase letter is required")
        .matches(/[0-9]/, "At least one number is required")
        .matches(/[@$!%*#_?&]/, "At least one special character is required")
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
    }),
    onSubmit: async (values, { resetForm }) => {
      const success = await handleFormSubmit(values);
      if (success) {
        resetForm();
      }
    },
  });

  const handleGoogleLogin = () => {
    logInWithGoogle()
      .then((result) => {
        navigate(path, { replace: true });
      })
      .catch((err) => {
        setErr("Google login failed");
      });
  };

  const errorMessageFunc = (value) => {
    return (
      <div className="error w-full mb-3 px-4 py-2 rounded-sm bg-red-200/70 text-red-900 border border-red-300/50">
        <p className="w-full text-center text-sm">{value}</p>
      </div>
    );
  };

  const handleFormSubmit = async (values) => {
    setErr("");
    setSuccess("");
    setLoading(true);
    try {
      const { name, email, password } = values;
      const result = await createUser(email, password);
      if (!result.user.emailVerified) {
        await emailVerification();
      }
      if (result.user.displayName == null) {
        await updateUser({ displayName: name });
      }
      await logoutUser();
      setSuccess(
        "Account created successfully! Please check your email for verification.",
      );
      return true;
    } catch (err) {
      if (err.code == "auth/email-already-in-use") {
        setErr("Email already in use. Please try another one.");
      } else {
        setErr("Something went wrong. Please try again.");
      }
      return false;
    } finally {
      setLoading(false);
    }
  };

  const nameError =
    formik.touched.name &&
    formik.errors.name &&
    errorMessageFunc(formik.errors.name);
  const emailError =
    formik.touched.email &&
    formik.errors.email &&
    errorMessageFunc(formik.errors.email);
  const passError =
    formik.touched.password &&
    formik.errors.password &&
    errorMessageFunc(formik.errors.password);
  const authError = err && errorMessageFunc(err);
  return (
    <div className="bg-white p-7 border border-gray-200 w-full sm:w-100 shadow-sm rounded-xl shadow-gray-200">
      <div className="topper flex flex-col items-center justify-center gap-3 mb-5">
        <h2 className="font-bold text-2xl">Register</h2>
        <p className="text-center">
          Already have an Account?{" "}
          <Link
            to="/login"
            className="text-lime-600 font-medium hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
      <div>
        <form onSubmit={formik.handleSubmit}>
          {nameError} {emailError} {passError} {authError}
          {success && (
            <div className="error w-full my-3 px-4 py-2 rounded-sm bg-green-500/20 text-green-900 border border-green-300/70">
              <p className="w-full text-center text-sm">{success}</p>
            </div>
          )}
          <div className="flex border border-gray-300/70 h-10 rounded-sm overflow-hidden mb-4">
            <label htmlFor="name">
              <div className="h-full flex items-center justify-center bg-gray-200 px-2.5">
                <FiUser size={18} className="w-5 shrink-0 text-gray-700" />
              </div>
            </label>
            <input
              type="text"
              name="name"
              id="name"
              onChange={formik.handleChange}
              value={formik.values.name}
              placeholder="Your Name"
              className="outline-none w-full px-2.5 h-full"
            />
          </div>
          <div className="flex border border-gray-300/70 h-10 rounded-sm overflow-hidden mb-4">
            <label htmlFor="email">
              <div className="h-full flex items-center justify-center bg-gray-200 px-2.5">
                <FiMail className="w-5 shrink-0 text-gray-700" />
              </div>
            </label>
            <input
              type="email"
              name="email"
              id="email"
              onChange={formik.handleChange}
              value={formik.values.email}
              placeholder="example@gmail.com"
              className="outline-none w-full px-2.5 h-full"
            />
          </div>
          <div className="flex border border-gray-300/70 h-10 rounded-sm overflow-hidden mb-4">
            <label htmlFor="password">
              <div className="h-full flex items-center justify-center bg-gray-200 px-2.5">
                <FiLock className="w-5 shrink-0 text-gray-700" />
              </div>
            </label>
            <input
              type={show ? "text" : "password"}
              name="password"
              id="password"
              onChange={formik.handleChange}
              value={formik.values.password}
              placeholder="********"
              className="outline-none w-full px-2.5 h-full"
            />
            <div className="flex items-center justify-center pr-2 text-gray-500">
              {show ? (
                <FiEyeOff
                  onClick={handleShow}
                  className="w-5 shrink-0 text-secondary cursor-pointer"
                />
              ) : (
                <FiEye
                  onClick={handleShow}
                  className="w-5 shrink-0 text-secondary cursor-pointer"
                />
              )}
            </div>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="py-2 px-4 cursor-pointer bg-lime-400 hover:bg-lime-500 duration-75 border border-lime-500/50 focus:bg-lime-400 w-full rounded-md flex items-center justify-center gap-2 mb-3"
          >
            Register
            {loading && <LoadingSpin />}
          </button>
        </form>
      </div>
      <div>
        <div className="flex items-center justify-between gap-3 mb-3">
          <div className="border-t border-gray-300 grow"></div>
          <span>OR</span>
          <div className="border-t border-gray-300 grow"></div>
        </div>

        <button
          onClick={handleGoogleLogin}
          className="py-2 px-4 cursor-pointer border border-gray-200/70 w-full rounded-md bg-gray-200/80 hover:bg-gray-300/70 duration-75 flex  items-center justify-center gap-2"
        >
          <FcGoogle size={18} />
          Continue with Google
        </button>
      </div>
    </div>
  );
};

export default Register;
