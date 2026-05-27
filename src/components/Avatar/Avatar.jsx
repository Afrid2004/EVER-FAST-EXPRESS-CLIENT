import React from "react";
import useAuth from "../../Hooks/useAuth";

const Avatar = () => {
  const { user, loading } = useAuth();
  if (loading) {
    return null;
  }
  const userName = user?.displayName || "User";
  const userImage = user?.photoURL || "";
  const [first = "", second = ""] = userName.split(" ");
  const userNameAvatar = (
    <h5 className="text-white bg-gray-800 w-full h-full flex items-center justify-center">
      {first ? first[0] : ""}
      {second ? second[0] : ""}
    </h5>
  );
  const userImageAvatar = (
    <img
      src={userImage}
      alt={userName}
      className="w-full h-full object-cover"
    />
  );
  return user && userImage ? userImageAvatar : userNameAvatar;
};

export default Avatar;
