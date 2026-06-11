import React, { useState } from "react";
import { FiCreditCard, FiInfo, FiMail, FiPhone, FiUser } from "react-icons/fi";
import { LuMapPinned } from "react-icons/lu";
import { TbMotorbike } from "react-icons/tb";
import { MdOutlineAssignment } from "react-icons/md";
import { useLoaderData } from "react-router";
import { useFormik } from "formik";
import useAuth from "../../Hooks/useAuth";
import * as yup from "yup";
import useAxiosSecure from "../../Hooks/AxiosSecure";
import Swal from "sweetalert2";

const Rider = () => {
  const locations = useLoaderData();
  const { user } = useAuth();
  const allregions = locations.map((loc) => loc.region);
  const [districts, setDistricts] = useState([]);
  const axiosSecureInstance = useAxiosSecure();
  const regions = [...new Set(allregions)];
  const handleDistrict = (region) => {
    const alldistricts = locations.filter((loc) => loc.region === region);
    const district = alldistricts.map((d) => d.district);
    setDistricts(district);
  };

  const formik = useFormik({
    initialValues: {
      name: user?.displayName || "",
      email: user?.email || "",
      uid: user?.uid || "",
      license: "",
      riderregion: "",
      riderdistrict: "",
      nid: "",
      phone: "",
      bikebrand: "",
      registerednumber: "",
      aboutrider: "",
    },
    validationSchema: yup.object({
      name: yup
        .string()
        .min(2, "Name must be at least 2 characters")
        .required("Name is required"),
      email: yup
        .string()
        .email("Please enter a valid email")
        .required("Email is required"),
      license: yup
        .string()
        .matches(/^\d+$/, "License must contain only numbers")
        .min(5, "Lisence number must be at least 5 digit")
        .required("License is required"),
      riderregion: yup.string().required("Rider region is required"),
      riderdistrict: yup.string().required("Rider district is required"),
      nid: yup
        .string()
        .matches(/^\d+$/, "NID must contain only numbers")
        .min(5, "NID number must be at least 5 digit")
        .required("NID is required"),
      phone: yup
        .string()
        .matches(
          /^(\+8801|01)[3-9]\d{8}$/,
          "Please enter a valid Bangladeshi phone number",
        )
        .min(2, "Rider phone number must be at least 2 digits.")
        .required("Rider phone is required"),
      bikebrand: yup
        .string()
        .min(2, "Bike brand name must be at least 2 Characters")
        .required("Bike Brand is required"),
      registerednumber: yup
        .string()
        .min(2, "Bike Registration number name must be at least 2 Characters")
        .required("Registration number is required"),
    }),
    onSubmit: async (values, { resetForm }) => {
      const success = await handleSubmitRider(values);
      if (success) {
        resetForm();
      }
    },
  });

  const handleSubmitRider = async (value) => {
    try {
      const res = await axiosSecureInstance.post("/riders", value);
      if (res.data.insertedId) {
        Swal.fire({
          title: "Submitted!",
          text: "Your rider request has been submitted!",
          icon: "success",
        });
        return true;
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: `${res.data.message}`,
        });
      }
      return false;
    } catch (err) {
      return false;
    }
  };

  const errorMessageFunc = (error) => {
    return (
      <div className="mb-4 error w-full px-4 py-2 rounded-sm bg-red-200/70 text-red-900 border border-red-300/50">
        <p className="w-full text-center text-sm">{error}</p>
      </div>
    );
  };

  const getError = (errorField) => {
    return formik.touched[errorField] && formik.errors[errorField]
      ? errorMessageFunc(formik.errors[errorField])
      : null;
  };

  return (
    <div className="bg-white p-8 md:p-10 border border-gray-200 rounded-2xl">
      <div className="flex flex-col md:flex-row md:items-center gap-5">
        <div className="w-full md:max-w-6/12">
          <div className="flex flex-col gap-5 mb-5">
            <h1 className="font-extrabold text-[40px] text-gray-800">
              Be a Rider
            </h1>
            <p className="text-gray-500">
              Enjoy fast, reliable parcel delivery with real-time tracking and
              zero hassle. From personal packages to business shipments — we
              deliver on time, every time.
            </p>
            <h2 className="text-gray-800 font-extrabold text-2xl">
              Tell us about yourself
            </h2>
          </div>
          <div>
            <form onSubmit={formik.handleSubmit}>
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
              {getError("name")}
              <div className="flex border border-gray-300/70 h-10 rounded-sm overflow-hidden mb-4">
                <label htmlFor="email">
                  <div className="h-full flex items-center justify-center bg-gray-200 px-2.5">
                    <FiMail size={18} className="w-5 shrink-0 text-gray-700" />
                  </div>
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  onChange={formik.handleChange}
                  value={formik.values.email}
                  placeholder="Your Email"
                  className="outline-none w-full px-2.5 h-full"
                />
              </div>
              {getError("email")}
              <div className="flex border border-gray-300/70 h-10 rounded-sm overflow-hidden mb-4">
                <label htmlFor="license">
                  <div className="h-full flex items-center justify-center bg-gray-200 px-2.5">
                    <FiCreditCard
                      size={18}
                      className="w-5 shrink-0 text-gray-700"
                    />
                  </div>
                </label>
                <input
                  type="number"
                  name="license"
                  id="license"
                  onChange={formik.handleChange}
                  value={formik.values.license}
                  placeholder="Driving License Number"
                  className="outline-none w-full px-2.5 h-full"
                />
              </div>
              {getError("license")}
              <div className="flex border border-gray-300/70 h-10 rounded-sm overflow-hidden mb-4">
                <label htmlFor="riderregion">
                  <div className="h-full flex items-center justify-center bg-gray-200 text-gray-700 px-2.5">
                    <LuMapPinned size={18} className="w-5 shrink-0" />
                  </div>
                </label>
                <select
                  id="riderregion"
                  name="riderregion"
                  value={formik.values.riderregion}
                  className="select outline-0 border-0 w-full"
                  onChange={(e) => {
                    formik.handleChange(e);
                    handleDistrict(e.target.value);
                  }}
                >
                  <option selected={true} value="" disabled={true}>
                    Pick a Region
                  </option>
                  {regions.map((region, i) => (
                    <option key={i} value={region}>
                      {region}
                    </option>
                  ))}
                </select>
              </div>
              {getError("riderregion")}
              <div className="flex border border-gray-300/70 h-10 rounded-sm overflow-hidden mb-4">
                <label htmlFor="riderdistrict">
                  <div className="h-full flex items-center justify-center bg-gray-200 text-gray-700 px-2.5">
                    <LuMapPinned size={18} className="w-5 shrink-0" />
                  </div>
                </label>
                <select
                  id="riderdistrict"
                  name="riderdistrict"
                  value={formik.values.riderdistrict}
                  onChange={formik.handleChange}
                  className="select outline-0 border-0 w-full"
                >
                  <option selected={true} value="" disabled={true}>
                    Pick a District
                  </option>
                  {districts.map((district, i) => (
                    <option key={i} value={district}>
                      {district}
                    </option>
                  ))}
                </select>
              </div>
              {getError("riderdistrict")}
              <div className="flex border border-gray-300/70 h-10 rounded-sm overflow-hidden mb-4">
                <label htmlFor="nid">
                  <div className="h-full flex items-center justify-center bg-gray-200 px-2.5">
                    <FiCreditCard
                      size={18}
                      className="w-5 shrink-0 text-gray-700"
                    />
                  </div>
                </label>
                <input
                  type="number"
                  name="nid"
                  id="nid"
                  onChange={formik.handleChange}
                  value={formik.values.nid}
                  placeholder="NID Number"
                  className="outline-none w-full px-2.5 h-full"
                />
              </div>
              {getError("nid")}
              <div className="flex border border-gray-300/70 h-10 rounded-sm overflow-hidden mb-4">
                <label htmlFor="phone">
                  <div className="h-full flex items-center justify-center bg-gray-200 px-2.5">
                    <FiPhone size={18} className="w-5 shrink-0 text-gray-700" />
                  </div>
                </label>
                <input
                  type="phone"
                  name="phone"
                  id="phone"
                  onChange={formik.handleChange}
                  value={formik.values.phone}
                  placeholder="Phone Number"
                  className="outline-none w-full px-2.5 h-full"
                />
              </div>
              {getError("phone")}
              <div className="flex border border-gray-300/70 h-10 rounded-sm overflow-hidden mb-4">
                <label htmlFor="bikebrand">
                  <div className="h-full flex items-center justify-center bg-gray-200 px-2.5">
                    <TbMotorbike
                      size={20}
                      className="w-5 shrink-0 text-gray-700"
                    />
                  </div>
                </label>
                <input
                  type="text"
                  name="bikebrand"
                  id="bikebrand"
                  onChange={formik.handleChange}
                  value={formik.values.bikebrand}
                  placeholder="Bike Brand, Model and Year"
                  className="outline-none w-full px-2.5 h-full"
                />
              </div>
              {getError("bikebrand")}
              <div className="flex border border-gray-300/70 h-10 rounded-sm overflow-hidden mb-4">
                <label htmlFor="registerednumber">
                  <div className="h-full flex items-center justify-center bg-gray-200 px-2.5">
                    <MdOutlineAssignment
                      size={18}
                      className="w-5 shrink-0 text-gray-700"
                    />
                  </div>
                </label>
                <input
                  type="text"
                  name="registerednumber"
                  id="registerednumber"
                  value={formik.values.registerednumber}
                  onChange={formik.handleChange}
                  placeholder="Bike Registration Number"
                  className="outline-none w-full px-2.5 h-full"
                />
              </div>
              {getError("registerednumber")}
              <div className="flex border border-gray-300/70 h-10 rounded-sm overflow-hidden mb-4">
                <label htmlFor="aboutrider">
                  <div className="h-full flex items-center justify-center bg-gray-200 px-2.5">
                    <FiInfo size={18} className="w-5 shrink-0 text-gray-700" />
                  </div>
                </label>
                <input
                  type="text"
                  name="aboutrider"
                  id="aboutrider"
                  value={formik.values.aboutrider}
                  onChange={formik.handleChange}
                  placeholder="Tell Us About Yourself"
                  className="outline-none w-full px-2.5 h-full"
                />
              </div>

              <button
                type="submit"
                className="px-4 py-2 bg-lime-400 border-lime-500/50 hover:bg-lime-500 duration-150 rounded-sm text-center cursor-pointer w-full"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
        <div className="w-full md:max-w-6/12 h-full flex items-center justify-center rounded-2xl">
          <div className="w-50 animated-rider">
            <img
              src="/images/berider.png"
              alt="rider"
              draggable={false}
              className="w-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Rider;
