import React, { useState } from "react";
import { BsBox } from "react-icons/bs";
import { FiMail, FiMapPin, FiPhone, FiUser } from "react-icons/fi";
import { LuMapPinned, LuWeight } from "react-icons/lu";
import useAuth from "../../Hooks/useAuth";
import { FaArrowRight } from "react-icons/fa";
import { useLoaderData } from "react-router";
import { useFormik } from "formik";
import * as yup from "yup";
import Swal from "sweetalert2";
import useAxios from "../../Hooks/AxiosHook";

const Parcel = () => {
  const { user } = useAuth();
  const locations = useLoaderData();
  const axiosInstance = useAxios();
  const duplicateRegions = locations.map((loc) => loc.region);
  //remove duplicate and set comomon regions
  const regions = [...new Set(duplicateRegions)];
  const [senderDistricts, setSenderDistricts] = useState([]);
  const [receiverDistricts, setReceiverDistricts] = useState([]);

  const handleSenderDistrict = (region) => {
    const districts = locations.filter((loc) => loc.region === region);
    const district = districts.map((d) => d.district);
    setSenderDistricts(district);
  };

  const handleReceiverDistrict = (region) => {
    const districts = locations.filter((loc) => loc.region === region);
    const district = districts.map((d) => d.district);
    setReceiverDistricts(district);
  };

  const formik = useFormik({
    initialValues: {
      type: "Document",
      parcelname: "",
      parcelweight: "",
      sendername: user?.displayName || "",
      senderemail: user?.email || "",
      senderuid: user?.uid || "",
      senderphone: "",
      senderaddress: "",
      senderregion: "",
      senderdistrict: "",
      pickupinstruction: "",
      receivername: "",
      receiveremail: "",
      receiverphone: "",
      receiveraddress: "",
      receiverregion: "",
      receiverdistrict: "",
      deliveryinstruction: "",
      createdAt: new Date(),
    },
    validationSchema: yup.object({
      type: yup.string().required(),
      parcelname: yup
        .string()
        .min(2, "Parcel name must be at least 2 characters.")
        .required("Parcel name is required"),
      parcelweight: yup
        .number("Parcel weight must be a number")
        .positive("Weight must be positive")
        .required("Parcel weight is required"),
      sendername: yup
        .string()
        .min(2, "Sender name must be at least 2 characters")
        .required("Sender name is required"),
      senderemail: yup
        .string()
        .email("Invalid email")
        .required("Sender email is required"),
      senderphone: yup
        .number()
        .min(2, "Sender phone number must be at least 2 digits.")
        .required("Sender phone is required"),
      senderaddress: yup
        .string()
        .min(2, "Sender address must be at least 2 charecters.")
        .required("Sender address is required"),
      senderregion: yup.string().required("Sender region is required"),
      senderdistrict: yup.string().required("Sender district is required"),
      pickupinstruction: yup.string().nullable(),
      receivername: yup
        .string()
        .min(2, "Receiver name must be at least 2 characters")
        .required("Receiver name is required"),
      receiveremail: yup
        .string()
        .email("Invalid email")
        .required("Receiver email is required"),
      receiverphone: yup
        .number()
        .min(2, "Receiver phone number must be at least 2 digits.")
        .required("Receiver phone is required"),
      receiveraddress: yup
        .string()
        .min(2, "Receiver address must be at least 2 charecters.")
        .required("Receiver address is required"),
      receiverregion: yup.string().required("Receiver region is required"),
      receiverdistrict: yup.string().required("Receiver district is required"),
      deliveryinstruction: yup.string().nullable(),
    }),
    onSubmit: (values) => {
      handleSendPercel(values);
    },
  });

  const handleSendPercel = (parceldata) => {
    const isSameCity =
      parceldata.senderdistrict === parceldata.receiverdistrict;
    const isDocument = parceldata.type.toLowerCase() === "document";
    const parcelWeight = parseFloat(parceldata.parcelweight);
    let cost = 0;
    if (isDocument) {
      cost = isSameCity ? 60 : 80;
    } else {
      if (parcelWeight < 3) {
        cost = isSameCity ? 110 : 150;
      } else {
        const mincharge = isSameCity ? 110 : 150;
        const extraWeight = parcelWeight - 3;
        const extraCharge = isSameCity ? extraWeight * 40 : extraWeight * 80;
        cost = mincharge + extraCharge;
      }
    }

    Swal.fire({
      title: "Are you agree with the cost?",
      text: `You have to pay ${cost}tk!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#7ccf00",
      cancelButtonColor: "#1e2939",
      confirmButtonText: "Yes, I Agree!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosInstance.post("/parcels", { ...parceldata, cost }).then((res) => {
          if (res.data.insertedId) {
            Swal.fire({
              title: "Submitted!",
              text: "Your parcel has been submitted.",
              icon: "success",
            });
          } else {
            Swal.fire({
              icon: "error",
              title: "Failed!",
              text: "Failed to submit your parcel. Please try again later.",
            });
          }
        });
      }
    });
  };

  const errorMessageFunc = (value) => {
    return (
      <div className="error w-full px-4 py-2 rounded-sm bg-red-200/70 text-red-900 border border-red-300/50">
        <p className="w-full text-center text-sm">{value}</p>
      </div>
    );
  };

  const getError = (fieldName) => {
    return formik.touched[fieldName] && formik.errors[fieldName]
      ? errorMessageFunc(formik.errors[fieldName])
      : null;
  };

  //errors

  return (
    <div>
      <div className="bg-white p-8 md:p-10 border border-gray-200 rounded-2xl">
        <div className="mb-5">
          <h1 className="text-[40px] text-gray-800 font-extrabold mb-3">
            Send A Parcel
          </h1>
          <p className="text-xl font-medium text-gray-800">
            Enter your parcel details
          </p>
        </div>
        <div>
          <form onSubmit={formik.handleSubmit}>
            {/* document or not field, parcel name or weight */}
            <div className="border-y bg-gra border-gray-200 py-6 mb-4">
              <div className="grid grid-cols-12 gap-5">
                <div className="col-span-12">
                  <div className="flex gap-3 flex-wrap">
                    <label
                      htmlFor="document"
                      className="flex duration-150 transition-all md:justify-between items-center gap-3 rounded-sm px-2.5 h-10 ring-1 ring-gray-300/70 text-gray-600  hover:bg-gray-100 has-checked:text-lime-500 has-checked:ring-lime-500 shrink-0 w-full md:w-fit cursor-pointer"
                    >
                      <input
                        id="document"
                        className="box-content h-1.5 w-1.5 appearance-none rounded-full border-[5px] border-white bg-white bg-clip-padding ring-1 ring-lime-950/20 duration-150 transition-all outline-none checked:border-lime-500 checked:ring-lime-500"
                        type="radio"
                        onChange={formik.handleChange}
                        checked={formik.values.type === "Document"}
                        value="Document"
                        name="type"
                      />
                      Document
                    </label>
                    <label
                      htmlFor="nondocument"
                      className="flex duration-150 transition-all md:justify-between items-center gap-3 rounded-sm px-2.5 h-10 ring-1 ring-gray-300/70 text-gray-600  hover:bg-gray-100 has-checked:text-lime-500 has-checked:ring-lime-500 shrink-0 w-full md:w-fit cursor-pointer"
                    >
                      <input
                        id="nondocument"
                        className="box-content duration-150 transition-all h-1.5 w-1.5 appearance-none rounded-full border-[5px] border-white bg-white bg-clip-padding ring-1 ring-lime-950/20 outline-none checked:border-lime-500 checked:ring-lime-500"
                        type="radio"
                        value="nondocument"
                        onChange={formik.handleChange}
                        checked={formik.values.type === "nondocument"}
                        name="type"
                      />
                      Non Document
                    </label>
                  </div>
                </div>
                <div className="col-span-12 md:col-span-6">
                  <div className="flex border border-gray-300/70 h-10 rounded-sm overflow-hidden">
                    <label htmlFor="parcelname">
                      <div className="h-full flex items-center justify-center bg-gray-200 px-2.5 text-gray-700">
                        <BsBox className="w-5 shrink-0" />
                      </div>
                    </label>
                    <input
                      type="text"
                      name="parcelname"
                      id="parcelname"
                      onChange={formik.handleChange}
                      value={formik.values.parcelname}
                      placeholder="Parcel Name"
                      className="outline-none w-full px-2.5 h-full"
                    />
                  </div>
                  {getError("parcelname") && (
                    <div className="my-3">{getError("parcelname")}</div>
                  )}
                </div>
                <div className="col-span-12 md:col-span-6">
                  <div className="flex border border-gray-300/70 h-10 rounded-sm overflow-hidden">
                    <label htmlFor="parcelweight">
                      <div className="h-full flex items-center justify-center bg-gray-200 px-2.5 text-gray-700">
                        <LuWeight className="w-5 shrink-0" />
                      </div>
                    </label>
                    <input
                      type="number"
                      name="parcelweight"
                      id="parcelweight"
                      onChange={formik.handleChange}
                      value={formik.values.parcelweight}
                      placeholder="Parcel Weight (KG)"
                      className="outline-none w-full px-2.5 h-full"
                    />
                  </div>
                  {getError("parcelweight") && (
                    <div className="my-3">{getError("parcelweight")}</div>
                  )}
                </div>
              </div>
            </div>

            {/* reciever and sender details */}
            <div className="mb-5">
              <div className="grid md:grid-cols-2 grid-cols-1 gap-5">
                {/* sender details */}
                <div className="flex flex-col gap-4">
                  <h5 className="text-gray-800 font-extrabold text-lg">
                    Sender Details
                  </h5>
                  <div className="flex border border-gray-300/70 h-10 rounded-sm overflow-hidden">
                    <label htmlFor="sendername">
                      <div className="h-full flex items-center justify-center bg-gray-200 px-2.5 text-gray-700">
                        <FiUser size={18} className="shrink-0" />
                      </div>
                    </label>
                    <input
                      type="text"
                      name="sendername"
                      id="sendername"
                      placeholder="Sender Name"
                      onChange={formik.handleChange}
                      value={formik.values.sendername}
                      className="outline-none w-full px-2.5 h-full"
                    />
                  </div>
                  {getError("sendername")}
                  <div className="flex border border-gray-300/70 h-10 rounded-sm overflow-hidden">
                    <label htmlFor="senderemail">
                      <div className="h-full flex items-center justify-center bg-gray-200 px-2.5 text-gray-700">
                        <FiMail className="shrink-0" />
                      </div>
                    </label>
                    <input
                      type="text"
                      name="senderemail"
                      id="senderemail"
                      placeholder="Sender Email"
                      onChange={formik.handleChange}
                      value={formik.values.senderemail}
                      className="outline-none w-full px-2.5 h-full"
                    />
                  </div>
                  {getError("senderemail")}
                  <div className="flex border border-gray-300/70 h-10 rounded-sm overflow-hidden">
                    <label htmlFor="senderphone">
                      <div className="h-full flex items-center justify-center bg-gray-200 px-2.5 text-gray-700">
                        <FiPhone className="shrink-0" />
                      </div>
                    </label>
                    <input
                      type="tel"
                      name="senderphone"
                      id="senderphone"
                      onChange={formik.handleChange}
                      value={formik.values.senderphone}
                      placeholder="Sender Phone"
                      className="outline-none w-full px-2.5 h-full"
                    />
                  </div>
                  {getError("senderphone")}
                  <div className="flex border border-gray-300/70 h-10 rounded-sm overflow-hidden">
                    <label htmlFor="senderaddress">
                      <div className="h-full flex items-center justify-center bg-gray-200 px-2.5 text-gray-700">
                        <FiMapPin className="shrink-0" />
                      </div>
                    </label>
                    <input
                      type="tel"
                      name="senderaddress"
                      id="senderaddress"
                      onChange={formik.handleChange}
                      value={formik.values.senderaddress}
                      placeholder="Sender Address"
                      className="outline-none w-full px-2.5 h-full"
                    />
                  </div>
                  {getError("senderaddress")}
                  <div className="flex border border-gray-300/70 h-10 rounded-sm overflow-hidden">
                    <label htmlFor="senderregion">
                      <div className="h-full flex items-center justify-center bg-gray-200 text-gray-700 px-2.5">
                        <LuMapPinned className="shrink-0" />
                      </div>
                    </label>
                    <select
                      id="senderregion"
                      name="senderregion"
                      defaultValue="Pick a Region"
                      className="select outline-0 border-0 w-full"
                      onChange={(e) => {
                        formik.handleChange(e);
                        handleSenderDistrict(e.target.value);
                      }}
                      value={formik.values.senderregion}
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
                  {getError("senderregion")}
                  <div className="flex border border-gray-300/70 h-10 rounded-sm overflow-hidden">
                    <label htmlFor="senderdistrict">
                      <div className="h-full flex items-center justify-center bg-gray-200 text-gray-700 px-2.5">
                        <LuMapPinned className="shrink-0" />
                      </div>
                    </label>
                    <select
                      id="senderdistrict"
                      name="senderdistrict"
                      title={
                        senderDistricts.length === 0 && "Select a region first"
                      }
                      disabled={senderDistricts.length === 0}
                      onChange={formik.handleChange}
                      value={formik.values.senderdistrict}
                      className="select outline-0 border-0 w-full"
                    >
                      <option selected={true} value="" disabled={true}>
                        Pick a District
                      </option>
                      {senderDistricts.map((district, i) => (
                        <option key={i} value={district}>
                          {district}
                        </option>
                      ))}
                    </select>
                  </div>
                  {getError("senderdistrict")}
                  <div className="flex border border-gray-300/70 h-20 rounded-sm overflow-hidden">
                    <textarea
                      name="pickupinstruction"
                      id="pickupinstruction"
                      placeholder="Pickup Instruction"
                      className="outline-none w-full p-2.5 h-full"
                      onChange={formik.handleChange}
                      value={formik.values.pickupinstruction}
                    ></textarea>
                  </div>
                </div>

                {/* receiver details */}
                <div className="flex flex-col gap-4">
                  <h5 className="text-gray-800 font-extrabold text-lg">
                    Receiver Details
                  </h5>
                  <div className="flex border border-gray-300/70 h-10 rounded-sm overflow-hidden">
                    <label htmlFor="receivername">
                      <div className="h-full flex items-center justify-center bg-gray-200 px-2.5 text-gray-700">
                        <FiUser size={18} className="shrink-0" />
                      </div>
                    </label>
                    <input
                      type="text"
                      name="receivername"
                      id="receivername"
                      placeholder="Receiver Name"
                      onChange={formik.handleChange}
                      value={formik.values.receivername}
                      className="outline-none w-full px-2.5 h-full"
                    />
                  </div>
                  {getError("receivername")}
                  <div className="flex border border-gray-300/70 h-10 rounded-sm overflow-hidden">
                    <label htmlFor="receiveremail">
                      <div className="h-full flex items-center justify-center bg-gray-200 px-2.5 text-gray-700">
                        <FiMail className="shrink-0" />
                      </div>
                    </label>
                    <input
                      type="text"
                      name="receiveremail"
                      id="receiveremail"
                      placeholder="Receiver Email"
                      onChange={formik.handleChange}
                      value={formik.values.receiveremail}
                      className="outline-none w-full px-2.5 h-full"
                    />
                  </div>
                  {getError("receiveremail")}
                  <div className="flex border border-gray-300/70 h-10 rounded-sm overflow-hidden">
                    <label htmlFor="receiverphone">
                      <div className="h-full flex items-center justify-center bg-gray-200 px-2.5 text-gray-700">
                        <FiPhone className="shrink-0" />
                      </div>
                    </label>
                    <input
                      type="tel"
                      name="receiverphone"
                      id="receiverphone"
                      placeholder="Receiver Phone"
                      onChange={formik.handleChange}
                      value={formik.values.receiverphone}
                      className="outline-none w-full px-2.5 h-full"
                    />
                  </div>
                  {getError("receiverphone")}
                  <div className="flex border border-gray-300/70 h-10 rounded-sm overflow-hidden">
                    <label htmlFor="receiveraddress">
                      <div className="h-full flex items-center justify-center bg-gray-200 px-2.5 text-gray-700">
                        <FiMapPin className="shrink-0" />
                      </div>
                    </label>
                    <input
                      type="text"
                      name="receiveraddress"
                      onChange={formik.handleChange}
                      value={formik.values.receiveraddress}
                      id="receiveraddress"
                      placeholder="Receiver Address"
                      className="outline-none w-full px-2.5 h-full"
                    />
                  </div>
                  {getError("receiveraddress")}
                  <div className="flex border border-gray-300/70 h-10 rounded-sm overflow-hidden">
                    <label htmlFor="receiverregion">
                      <div className="h-full flex items-center justify-center bg-gray-200 text-gray-700 px-2.5">
                        <LuMapPinned className="shrink-0" />
                      </div>
                    </label>
                    <select
                      id="receiverregion"
                      name="receiverregion"
                      className="select outline-0 border-0 w-full"
                      onChange={(e) => {
                        formik.handleChange(e);
                        handleReceiverDistrict(e.target.value);
                      }}
                      value={formik.values.receiverregion}
                    >
                      <option selected={true} value="" disabled={true}>
                        Pick a Receiver Region
                      </option>
                      {regions.map((region, i) => (
                        <option key={i} value={region}>
                          {region}
                        </option>
                      ))}
                    </select>
                  </div>
                  {getError("receiverregion")}
                  <div className="flex border border-gray-300/70 h-10 rounded-sm overflow-hidden">
                    <label htmlFor="receiverdistrict">
                      <div className="h-full flex items-center justify-center bg-gray-200 text-gray-700 px-2.5">
                        <LuMapPinned className="shrink-0" />
                      </div>
                    </label>
                    <select
                      id="receiverdistrict"
                      name="receiverdistrict"
                      defaultValue="Pick a Receiver District"
                      title={
                        receiverDistricts.length === 0 &&
                        "Select a region first"
                      }
                      disabled={receiverDistricts.length === 0}
                      onChange={formik.handleChange}
                      value={formik.values.receiverdistrict}
                      className="select outline-0 border-0 w-full"
                    >
                      <option selected={true} value="" disabled={true}>
                        Pick a Receiver District
                      </option>
                      {receiverDistricts.map((district, i) => (
                        <option key={i} value={district}>
                          {district}
                        </option>
                      ))}
                    </select>
                  </div>
                  {getError("receiverdistrict")}
                  <div className="flex border border-gray-300/70 h-20 rounded-sm overflow-hidden">
                    <textarea
                      name="deliveryinstruction"
                      id="deliveryinstruction"
                      placeholder="Delivery Instruction"
                      onChange={formik.handleChange}
                      value={formik.values.deliveryinstruction}
                      className="outline-none w-full p-2.5 h-full"
                    ></textarea>
                  </div>
                </div>
              </div>
            </div>

            {/* confirm booking */}
            <div>
              <p className="text-gray-600 mb-5">
                * PickUp Time 4pm-7pm Approx.
              </p>
              <button
                type="submit"
                className="px-4 shrink-0 py-2 bg-lime-400 border border-lime-500/50 hover:bg-lime-500 duration-100 rounded-xl text-gray-800 flex items-center gap-2 cursor-pointer"
              >
                Proceed to Confirm Booking{" "}
                <FaArrowRight className="w-5 shrink-0" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Parcel;
