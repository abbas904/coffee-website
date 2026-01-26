import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import Loader from "../../components/Loader";
import { useProfileMutation } from "../../redux/api/usersApiSlice";
import { setCredentials } from "../../redux/features/auth/authSlice";
import { Link } from "react-router-dom";

const Profile = () => {
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { userInfo } = useSelector((state) => state.auth);

  const [updateProfile, { isLoading: loadingUpdateProfile }] =
    useProfileMutation();

  useEffect(() => {
    setUserName(userInfo.username);
    setEmail(userInfo.email);
  }, [userInfo]);

  const dispatch = useDispatch();

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
    } else {
      try {
        const res = await updateProfile({
          _id: userInfo._id,
          username,
          email,
          password,
        }).unwrap();
        dispatch(setCredentials({ ...res }));
        toast.success("Profile updated successfully");
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  return (
    <div className="container mx-auto p-4 sm:p-6 mt-[3rem] sm:mt-[4rem] md:mt-[5rem]">
      <div className="flex justify-center align-center">
        <div className="w-full max-w-md md:w-1/3">
          <h2 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6 text-petPrimary text-center md:text-left">Update Profile</h2>
          <form onSubmit={submitHandler} >
            <div className="mb-3 sm:mb-4">
              <input
                type="text"
                placeholder="Enter name"
                className="form-input p-3 sm:p-4 rounded-sm w-full border border-petPrimary text-sm sm:text-base"
                value={username}
                onChange={(e) => setUserName(e.target.value)}
              />
            </div>

            <div className="mb-3 sm:mb-4">
              <label className="block text-petPrimary mb-2 text-sm sm:text-base">Email Address</label>
              <input
                type="email"
                placeholder="Enter email"
                className="form-input p-3 sm:p-4 rounded-sm w-full border border-petPrimary text-sm sm:text-base"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="mb-3 sm:mb-4">
              <label className="block text-petPrimary mb-2 text-sm sm:text-base">Password</label>
              <input
                type="password"
                placeholder="Enter password"
                className="form-input p-3 sm:p-4 rounded-sm w-full border border-petPrimary text-sm sm:text-base"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="mb-3 sm:mb-4">
              <label className="block text-petPrimary mb-2 text-sm sm:text-base">Confirm Password</label>
              <input
                type="password"
                placeholder="Confirm password"
                className="form-input p-3 sm:p-4 rounded-sm w-full border border-petPrimary text-sm sm:text-base"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>

            <div className="flex flex-col sm:flex-row justify-between gap-3 sm:gap-0">
              <button
                type="submit"
                className="bg-petPrimary text-white py-2 px-4 rounded hover:bg-red-500 text-sm sm:text-base w-full sm:w-auto"
              >
                Update
              </button>

              <Link
                to="/user-orders"
                className="bg-petPrimary text-white py-2 px-4 rounded hover:bg-red-500 text-center text-sm sm:text-base w-full sm:w-auto"
              >
                My Orders
              </Link>
            </div>
            {loadingUpdateProfile && <Loader />}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;