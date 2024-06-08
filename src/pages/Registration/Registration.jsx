import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { updateProfile } from "firebase/auth";
import useTitle from "../../hooks/useTitle";
import { FiEye, FiEyeOff } from "react-icons/fi";

const Registration = () => {
  useTitle("Sing Up");
  const { createUser, handleUserName } = useContext(AuthContext);
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const photo = form.photo.value;
    const password = form.password.value;
    const regex = /^(?=.*[!@#$%^&*()_+{}\\[\]:;<>,.?~\\-]).+$/;
    const userInfo = { name, email, photo, password };
    console.log(userInfo);

    if (password.length < 6) {
      setError("Password can't be less than 6");
      return;
    } else if (!/.*[A-Z].*/.test(password)) {
      setError("Password have must one capital letter");
      return;
    } else if (!regex.test(password)) {
      setError("Password have must one special character");
      return;
    }
    setError('')

    // create user
    createUser(email, password)
      .then((res) => {
        toast.success("Registration Successful!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        // update profile
        updateProfile(res.user, {
          displayName: name,
          photoURL: photo
        })
          .then(() => {
            handleUserName(name, photo);
          })
          .catch();
      })
      .catch((error) => {
        console.log(error.message);
        if (error.message.match("email-already-in-use")) {
          toast.error("Email already in use!", {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        }
      });
    navigate("/");
  };

  return (
    <div className="mb-20 flex items-center">
      <div className="w-full sm:w-[550px] h-[800px] border px-12 flex flex-col justify-center mx-auto">
        <div className="">
          <h2 className="mt-10 text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign up to create account
          </h2>
          <p className="mt-2 text-sm text-gray-500">
            ALready a member?{" "}
            <Link
              to="/login"
              className="font-semibold leading-6 text-[#FF3811]"
            >
              Login to your account
            </Link>
          </p>
        </div>

        <div className="mt-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block font-medium leading-6 text-gray-900"
              >
                Full Name
              </label>
              <div className="mt-2">
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-4"
                />
              </div>
            </div>
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
              <label
                htmlFor="email"
                className="block font-medium leading-6 text-gray-900"
              >
                Photo URL
              </label>
              <div className="mt-2">
                <input
                  id="photo"
                  name="photo"
                  type="text"
                  autoComplete="photo"
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
            <div>
              {error ? (
                <>
                  <p className="text-red-500">{error}</p>
                </>
              ) : (
                ""
              )}
            </div>
            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-[#FF3811] px-3 py-1.5 text font-semibold leading-6 text-white shadow-sm hover:bg-[#FF1811] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign Up
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="max-w-[750px] hidden xl:block">
        <img
          src="https://images.unsplash.com/photo-1496917756835-20cb06e75b4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1908&q=80"
          alt=""
          className="h-[800px] w-full object-cover"
        />
      </div>
    </div>
  );
};

export default Registration;
