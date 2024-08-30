import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import { useSignupMutation } from "../../redux/features/auth/authApi";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../redux/hooks";
import { toast } from "sonner";
import { setUser } from "../../redux/features/auth/authSlice";

type Inputs = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone?: string;
  terms: boolean;
};

const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [signup] = useSignupMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    watch,
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data: FieldValues) => {
    // Check if passwords match
    if (data.password !== data.confirmPassword) {
      setError("confirmPassword", {
        type: "manual",
        message: "Passwords do not match",
      });
      return;
    }

    const toastId = toast.loading("Signing up...");

    try {
      const userInfo = {
        name: data.name,
        email: data.email,
        password: data.password,
        confirmPassword: data.confirmPassword,
        phone: data.phone,
      };

      const user = await signup(userInfo).unwrap();
      dispatch(setUser({ user: user }));
      toast.success("Signed up successfully!", { id: toastId, duration: 2000 });
      navigate(`/dashboard`);
    } catch (err: any) {
      if (err?.data?.success === false) {
        toast.error("User with this email already exists!", {
          id: toastId,
          duration: 2000,
        });
      } else {
        toast.error("Invalid Credentials!", { id: toastId, duration: 2000 });
      }
    }
  };

  const termsAccepted = watch("terms");

  return (
    <>
      <div className="">
        <div className="flex min-h-screen flex-col items-center justify-center px-4 py-6">
          <div className="grid w-full max-w-6xl items-center gap-4 md:grid-cols-2">
            <div className="max-w-md rounded-lg border border-gray-300 p-6 shadow-[0_2px_22px_-4px_rgba(93,96,127,0.2)] max-md:mx-auto">
              {/* SignUp Form */}
              <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-5">
                  <h3 className="text-center text-3xl font-extrabold">
                    Sign up
                  </h3>
                  <p className="mt-4 text-sm leading-relaxed text-gray-500 dark:text-gray-400">
                    Sign up and book your first car ride from RentRide. Your
                    journey begins here.
                  </p>
                </div>
                <div>
                  <label className="mb-2 block text-sm">
                    Name <span className="text-red-500">*</span>
                  </label>
                  <div className="relative flex-1">
                    <input
                      {...register("name", { required: true })}
                      type="text"
                      className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-blue-600"
                      placeholder="Enter name"
                    />
                    <p className="ps-1">
                      {errors.name && (
                        <span className="text-xs text-red-500">
                          Name is required
                        </span>
                      )}
                    </p>
                  </div>
                </div>
                <div>
                  <label className="mb-2 block text-sm">
                    Email <span className="text-red-500">*</span>
                  </label>
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
                          Email is required
                        </span>
                      )}
                    </p>
                  </div>
                </div>
                <div>
                  <label className="mb-2 block text-sm">
                    Password <span className="text-red-500">*</span>
                  </label>
                  <div className="relative flex-1">
                    <input
                      {...register("password", {
                        required: true,
                        minLength: 6,
                      })}
                      type="password"
                      className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm text-gray-800 outline-blue-600"
                      placeholder="Enter password"
                    />
                    <p className="ps-1">
                      {errors.password?.type === "required" && (
                        <span className="text-xs text-red-500">
                          Password is required
                        </span>
                      )}
                      {errors.password?.type === "minLength" && (
                        <span className="text-xs text-red-500">
                          Password must be more than 6 characters
                        </span>
                      )}
                    </p>
                  </div>
                </div>
                <div>
                  <label className="mb-2 block text-sm">
                    Confirm Password <span className="text-red-500">*</span>
                  </label>
                  <div className="relative flex-1">
                    <input
                      {...register("confirmPassword", {
                        required: true,
                      })}
                      type="password"
                      className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm text-gray-800 outline-blue-600"
                      placeholder="Confirm password"
                    />
                    <p className="ps-1">
                      {errors.confirmPassword && (
                        <span className="text-xs text-red-500">
                          {errors.confirmPassword.message ||
                            "Confirmation password is required"}
                        </span>
                      )}
                    </p>
                  </div>
                </div>
                <div>
                  <label className="mb-2 block text-sm">Phone</label>
                  <div className="relative flex-1">
                    <input
                      {...register("phone")}
                      type="text"
                      className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm text-gray-800 outline-blue-600"
                      placeholder="Enter phone number"
                    />
                  </div>
                </div>

                <div>
                  <label className="flex items-center space-x-2 text-sm">
                    <input
                      type="checkbox"
                      {...register("terms", { required: true })}
                      className="h-4 w-4 rounded border-gray-300 text-primary"
                    />
                    <span>
                      I agree to the{" "}
                      <Link
                        className="text-primary"
                        to="/terms-of-service"
                        target="_blank"
                      >
                        Terms & Conditions
                      </Link>
                    </span>
                  </label>
                  {errors.terms && (
                    <p className="mt-1 text-xs text-red-500">
                      You must agree to the terms and conditions
                    </p>
                  )}
                </div>

                <div className="!mt-8">
                  <button
                    type="submit"
                    disabled={!termsAccepted} // Disable button if terms are not accepted
                    className="btn w-full rounded-md border-none bg-primary text-white"
                  >
                    Sign up
                  </button>
                </div>

                <p className="!mt-8 text-center text-sm">
                  Already have an account?
                  <Link
                    to="/login"
                    className="ml-1 whitespace-nowrap font-semibold text-primary hover:underline"
                  >
                    Login here
                  </Link>
                </p>

                <p className="text-sm">
                  By signing up, you accept our{" "}
                  <Link className="text-primary" to="/terms-of-service">
                    terms of use
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
                alt="Signup"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
