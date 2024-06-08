import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaGithub, FaGoogle } from "react-icons/fa";
import { useContext, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useTitle from "../../hooks/useTitle";
import { FiEye, FiEyeOff } from "react-icons/fi";

const Login = () => {
  useTitle("Login");
  const { signIn, googleSignIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const [showPassword, setShowPassword] = useState(true);
  // console.log(from);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    // console.log(email, password);

    signIn(email, password)
      .then(() => {
        navigate(from, { replace: true });
      })
      .catch(() => {
        // console.log(err);
        toast.error("Invalid Email or Password", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      });
  };

  const handleGoogleSignIn = () => {
    googleSignIn()
      .then(() => {
        toast.success("Login Successful", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        navigate(from, { replace: true });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="mb-20 flex items-center">
      <div className="w-full sm:w-[550px] h-[800px] border px-12 flex flex-col justify-center mx-auto">
        <div className="">
          <h2 className="mt-10 text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in to your account
          </h2>
          <p className="mt-2 text-sm text-gray-500">
            Not a member?{" "}
            <Link
              to="/registration"
              className="font-semibold leading-6 text-[#ff3811]"
            >
              Create your own account
            </Link>
          </p>
        </div>
        <div className="mt-6">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="email"
                className="block font-medium leading-6 text-gray-900"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-4"
                />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
              </div>
              <div className="mt-2 relative">
                <input
                  id="password"
                  name="password"
                  type={!showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-4"
                />
                <span
                  className="absolute top-1/2 -translate-y-1/2 right-6"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FiEyeOff /> : <FiEye />}
                </span>
              </div>
            </div>
            <div className="text-sm text-right">
              <Link
                href="#"
                className="font-semibold text-indigo-600 hover:text-indigo-500"
              >
                Forgot password?
              </Link>
            </div>
            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-[#FF3811] px-3 py-1.5 text font-semibold leading-6 text-white shadow-sm hover:bg-[#FF1811] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign in
              </button>
            </div>
          </form>
          <div className="py-12 flex items-center gap-2 justify-center">
            <hr className="w-[69px] sm:w-[120px]" />
            <p className="text-[#424242] font-medium">Or continue with</p>
            <hr className="w-[69px] sm:w-[120px]" />
          </div>
          <div className="flex justify-center sm:justify-between items-center flex-wrap gap-6">
            <button
              className="bg-[#1D9BF0] px-16 py-2 flex gap-2 items-center rounded"
              onClick={handleGoogleSignIn}
            >
              <FaGoogle className="text-[#FFF] text-xl" />
              <p className="text-[#FFF] font-semibold">Google</p>
            </button>
            <button className="bg-[#24292F] px-16 py-2 flex gap-2 items-center rounded">
              <FaGithub className="text-[#FFF] text-xl" />
              <p className="text-[#FFF] font-semibold">Github</p>
            </button>
          </div>
        </div>
      </div>
      <div className="w-[750px] hidden xl:block">
        <img
          src="https://images.unsplash.com/photo-1496917756835-20cb06e75b4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1908&q=80"
          alt=""
          className="h-[800px] w-full object-cover"
        />
      </div>
    </div>
  );
};

export default Login;
