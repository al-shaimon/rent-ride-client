import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import { useLoginMutation } from "../../redux/features/auth/authApi";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../redux/hooks";
import { toast } from "sonner";
import { setUser, TUser } from "../../redux/features/auth/authSlice";
// import { verifyToken } from "../../utils/verifyToken";

type Inputs = {
  email: string;
  password: string;
};

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [login] = useLoginMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data: FieldValues) => {
    console.log("data", data);
    const toastId = toast.loading("Logging in...");

    try {
      const userInfo = {
        email: data.email,
        password: data.password,
      };

      const res = await login(userInfo).unwrap();

      // console.log("res", res);

      // const user = verifyToken(res.token) as TUser;

      const user = res.data as TUser;

      dispatch(setUser({ user: user, token: res.token }));

      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", res.token);

      toast.success("Logged in successfully!", { id: toastId, duration: 2000 });

      if (user.role === "admin") {
        navigate(`/${user.role}/dashboard`);
      } else {
        navigate("/dashboard");
      }
    } catch (err: any) {
      toast.error("Invalid Credentials!", { id: toastId, duration: 2000 });

      if (
        err?.data?.statusCode === 404 ||
        err?.data?.message === "No Data Found"
      ) {
        setError("email", {
          type: "manual",
          message: "Email or password is incorrect",
        });
        setError("password", {
          type: "manual",
          message: "Email or password is incorrect",
        });
      }
    }
  };

  return (
    <>
      <div className="">
        <div className="flex min-h-screen flex-col items-center justify-center px-4 py-6">
          <div className="grid w-full max-w-6xl items-center gap-4 md:grid-cols-2">
            <div className="max-w-md rounded-lg border border-gray-300 p-6 shadow-[0_2px_22px_-4px_rgba(93,96,127,0.2)] max-md:mx-auto">
              {/* Login Form */}
              <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-5">
                  <h3 className="text-center text-3xl font-extrabold">
                    Sign in
                  </h3>
                  <p className="mt-4 text-sm leading-relaxed text-gray-500 dark:text-gray-400">
                    Sign in to your account to manage your car ride bookings.
                    Your journey begins here.
                  </p>
                </div>
                <div>
                  <label className="mb-2 block text-sm">Email</label>
                  <div className="relative flex-1">
                    <input
                      {...register("email", { required: true })}
                      type="email"
                      className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-blue-600"
                      placeholder="Enter email"
                    />
                    <p className="ps-1">
                      {errors.email && (
                        <span className="text-xs text-red-500">
                          {errors.email.message || "Email is required"}
                        </span>
                      )}
                    </p>
                  </div>
                </div>
                <div>
                  <label className="mb-2 block text-sm">Password</label>
                  <div className="relative flex-1">
                    <input
                      {...register("password", { required: true })}
                      type="password"
                      className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm text-gray-800 outline-blue-600"
                      placeholder="Enter password"
                    />
                    <p className="ps-1">
                      {errors.password && (
                        <span className="text-xs text-red-500">
                          {errors.password.message || "Password is required"}
                        </span>
                      )}
                    </p>
                  </div>
                </div>

                <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center">
                    <input
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                      className="h-4 w-4 shrink-0 rounded border-gray-300 text-primary focus:ring-primary"
                    />
                    <label htmlFor="remember-me" className="ml-3 block text-sm">
                      Remember me
                    </label>
                  </div>
                  <div className="text-sm">
                    {errors.email || errors.password ? (
                      <div className="text-center text-sm text-red-500">
                        <Link
                          to="/forget-password"
                          className="font-semibold text-primary hover:underline"
                        >
                          Recover your password
                        </Link>
                      </div>
                    ) : (
                      <Link
                        to="/forget-password"
                        className="font-semibold text-primary hover:underline"
                      >
                        Forgot your password?
                      </Link>
                    )}
                  </div>
                </div>

                <div className="!mt-8">
                  <button
                    type="submit"
                    className="btn w-full rounded-md border-none bg-primary text-white"
                  >
                    Sign in
                  </button>
                </div>
                <p className="!mt-8 text-center text-sm">
                  Don't have an account?
                  <Link
                    to="/signup"
                    className="ml-1 whitespace-nowrap font-semibold text-primary hover:underline"
                  >
                    Register here
                  </Link>
                </p>

                <p className="text-sm">
                  By signing you accept our{" "}
                  <Link className="text-primary" to="/terms-of-service">
                    terms of use{" "}
                  </Link>{" "}
                  and{" "}
                  <Link className="text-primary" to="/privacy-policy">
                    privacy policy
                  </Link>
                </p>
              </form>
            </div>
            <div className="max-md:mt-8 md:h-[300px] lg:h-[400px]">
              <img
                src="/auth.webp"
                className="mx-auto block h-full w-full object-cover max-md:w-4/5"
                alt="Dining Experience"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
