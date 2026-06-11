import React, { useState } from "react";
import useAuth from "../../../Hooks/useAuth";
import { FiEdit, FiMail, FiUser } from "react-icons/fi";
import { IoClose } from "react-icons/io5";
import { useFormik } from "formik";
import * as yup from "yup";
import Swal from "sweetalert2";

const Settings = () => {
  const {
    user,
    updateUser,
    updateUserEmail,
    emailVerification,
    reAuthenticate,
    reAuthenticateGoogle,
  } = useAuth();
  const userName = user?.displayName || "User";
  const [first = "", second = ""] = userName.split(" ");
  const [modal, setModal] = useState(true);
  const email = user?.providerData[0].email || "";
  // check user logged in with google
  const isGoogleUser = user.providerData.some(
    (p) => p.providerId === "google.com",
  );

  const formik = useFormik({
    initialValues: {
      name: user?.displayName || "",
      email: email,
    },
    validationSchema: yup.object({
      name: yup
        .string()
        .min(2, "Name must be at least 2 characters")
        .required("Name is required"),
      email: yup.string().email("Invalid email").required("Email is required"),
    }),
    onSubmit: async (values) => {
      await handleUpdate(values);
    },
  });

  const handleUpdate = async (values) => {
    try {
      await updateUser({ displayName: values.name });
      if (values.email !== email) {
        if (isGoogleUser) {
          // await reAuthenticateGoogle();
          Swal.fire({
            title: "Error",
            text: "Google user cannot change email!",
            icon: "error",
          });
          return;
        } else {
          const { value: password } = await Swal.fire({
            title: "Confirm Password",
            text: "To update your email please update your password.",
            input: "password",
            inputPlaceholder: "Your current password",
            showCancelButton: true,
            inputAttributes: { autocomplete: "current-password" },
          });
          if (!password) return;
          await reAuthenticate(password);
        }
        await updateUserEmail(values.email);
      }
      Swal.fire({
        title: "Upated!",
        text: "Profile updated. Please verify your new email.",
        icon: "success",
      });
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: error.message,
        icon: "error",
      });
    }
  };

  const errorMessageFunc = (value) => {
    return (
      <div className="error w-full mb-3 px-4 py-2 rounded-sm bg-red-200/70 text-red-900 border border-red-300/50">
        <p className="w-full text-center text-sm">{value}</p>
      </div>
    );
  };

  const getError = (field) => {
    return formik.touched[field] && formik.errors[field]
      ? errorMessageFunc(formik.errors[field])
      : null;
  };

  const EditModal = (
    <div
      className={
        modal
          ? "opacity-100 pointer-events-auto duration-150"
          : "opacity-0 pointer-events-none duration-150"
      }
    >
      <div className="flex items-center z-20 justify-center py-10 fixed top-0 left-0 bg-black/30 w-full h-full">
        <div className="w-full max-w-lg bg-white rounded-2xl p-7">
          <div className="flex items-center justify-between gap-3 mb-5">
            <h1 className="text-xl font-bold text-gray-800">
              Personal Details
            </h1>
            <div
              onClick={() => setModal(!modal)}
              className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-300 cursor-pointer hover:bg-gray-200 duration-75 text-gray-600"
            >
              <IoClose size={18} />
            </div>
          </div>
          <div>
            <form onSubmit={formik.handleSubmit}>
              {/* <div>
                <div className="w-15 h-15 flex items-center justify-center rounded-full overflow-hidden cursor-pointer shrink-0">
                  {user.photoURL ? (
                    <img
                      src={user.photoURL}
                      alt={user.displayName}
                      className="w-full"
                    />
                  ) : (
                    <h5 className="text-white bg-gray-800 w-full h-full flex items-center justify-center">
                      {first ? first[0] : ""}
                      {second ? second[0] : ""}
                    </h5>
                  )}
                </div>
              </div> */}
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
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  placeholder="Your Name"
                  className="outline-none w-full px-2.5 h-full"
                />
              </div>
              {getError("name")}
              {!isGoogleUser && (
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
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    placeholder="example@gmail.com"
                    className="outline-none w-full px-2.5 h-full"
                  />
                </div>
              )}
              {getError("email")}
              <button
                type="submit"
                className="bg-lime-400 px-4 py-2 hover:bg-lime-500 rounded-sm cursor-pointer w-full"
              >
                Update
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );

  const handleEditModal = () => {
    setModal(!modal);
  };

  return (
    <div className="p-10 bg-white border border-gray-200 rounded-2xl">
      <h1 className="text-2xl text-gray-800 font-extrabold mb-5">
        Profile Information
      </h1>
      <div>
        <div className="flex justify-between items-center">
          <div className="flex gap-3 items-center">
            <div className="w-30 h-30 flex items-center justify-center rounded-full overflow-hidden cursor-pointer shrink-0">
              {user.photoURL ? (
                <img
                  src={user.photoURL}
                  alt={user.displayName}
                  className="w-full"
                />
              ) : (
                <h5 className="text-white bg-gray-800 w-full h-full flex items-center justify-center">
                  {first ? first[0] : ""}
                  {second ? second[0] : ""}
                </h5>
              )}
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                {userName}
              </h2>
              <p>Email: {email || "NULL"}</p>
            </div>
          </div>

          <div>
            <div
              onClick={handleEditModal}
              className="flex gap-2 items-center justify-center rounded-lg border border-gray-300 cursor-pointer hover:bg-gray-200 duration-75 text-gray-600 px-4 py-2"
            >
              Edit <FiEdit />
            </div>
          </div>
        </div>
      </div>
      {EditModal}
    </div>
  );
};

export default Settings;
