import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/Loader";
import { useLoginMutation } from "../../redux/api/usersApiSlice";
import { setCredentials } from "../../redux/features/auth/authSlice";
import { toast } from "react-toastify";
import bgLogin from "../../assets/image/Login,register/animals.png";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [login, { isLoading }] = useLoginMutation();
  const { userInfo } = useSelector((state) => state.auth);
  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/";

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      navigate(redirect);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center relative px-4 md:px-0"
      style={{
        backgroundImage: `url(${bgLogin})`,
        backgroundSize: "contain",
        backgroundPosition: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Overlay للتباين */}
      <div className="absolute inset-0 bg-black/10"></div>

      <section className="relative z-10 flex flex-col md:flex-row items-center justify-center w-full max-w-6xl gap-6 sm:gap-8 md:gap-12">
        {/* Left: Form */}
        <div className="bg-white/20 backdrop-blur-md p-6 sm:p-8 md:p-10 rounded-xl shadow-xl w-full max-w-md text-white 
                animate-slide-fade-left
                -mt-20 sm:mt-0">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 drop-shadow-lg text-black">
            Sign In
          </h1>

          <form onSubmit={submitHandler} className="w-full">
            <div className="mb-4 sm:mb-5">
              <label
                htmlFor="email"
                className="block text-xs sm:text-sm font-medium text-white"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                className="mt-2 p-2.5 sm:p-3 w-full rounded border border-white/50 bg-white/20 placeholder-white/70 text-white focus:ring-2 focus:ring-pink-500 focus:outline-none text-sm sm:text-base"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="mb-4 sm:mb-5">
              <label
                htmlFor="password"
                className="block text-xs sm:text-sm font-medium text-white"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                className="mt-2 p-2.5 sm:p-3 w-full rounded border border-white/50 bg-white/20 placeholder-white/70 text-white focus:ring-2 focus:ring-pink-500 focus:outline-none text-sm sm:text-base"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button
              disabled={isLoading}
              type="submit"
              className="w-full bg-pink-500 hover:bg-pink-600 text-white font-semibold px-4 sm:px-6 py-2.5 sm:py-3 rounded-full transition-transform transform hover:scale-105 mb-4 text-sm sm:text-base"
            >
              {isLoading ? "Signing In..." : "Sign In"}
            </button>

            {isLoading && <Loader />}
          </form>

          <p className="text-black mt-4 text-sm">
            New Customer?{" "}
            <Link
              to={redirect ? `/register?redirect=${redirect}` : "/register"}
              className="text-pink-400 hover:underline"
            >
              Register
            </Link>
          </p>
        </div>

        {/* Right: Store Info */}
        <div className="text-center md:text-left max-w-md animate-slide-fade-right px-4">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-petPrimary font-extrabold mb-3 sm:mb-4 drop-shadow-lg">
            Welcome to Meowy Pet Shop 🐾
          </h2>
          <p className="text-sm sm:text-base md:text-lg mb-3 sm:mb-4 drop-shadow-md text-petCardBg">
            Your one-stop destination for premium pet food, toys, and accessories. 
            We care deeply about your furry friends and provide products that ensure happiness and health.
          </p>
          <p className="text-xs sm:text-sm md:text-base text-gray-700 font-semibold drop-shadow-md">
            Love Pets. Care Deeply. Deliver Quality.
          </p>
        </div>
      </section>

      {/* Animation Styles */}
      <style>
        {`
          @keyframes slideFadeLeft {
            0% { opacity: 0; transform: translateX(-50px); }
            100% { opacity: 1; transform: translateX(0); }
          }

          @keyframes slideFadeRight {
            0% { opacity: 0; transform: translateX(50px); }
            100% { opacity: 1; transform: translateX(0); }
          }

          .animate-slide-fade-left {
            animation: slideFadeLeft 1s ease forwards;
          }

          .animate-slide-fade-right {
            animation: slideFadeRight 1s ease forwards;
          }
        `}
      </style>
    </div>
  );
};

export default Login;
