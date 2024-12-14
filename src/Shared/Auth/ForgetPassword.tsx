/* eslint-disable @typescript-eslint/no-unused-vars */
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import { useForgetPasswordMutation } from "../../redux/features/auth/authApi";
import { toast } from "sonner";
import { useState } from "react";

type Inputs = {
  email: string;
};

const ForgetPassword = () => {
  const [forgetPassword] = useForgetPasswordMutation();
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false); // Track if the operation was successful

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors,
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data: FieldValues) => {
    setIsLoading(true);
    const toastId = toast.loading("Generating password reset link...");

    try {
      await forgetPassword(data.email).unwrap();

      // Success: Set success message and clear errors
      clearErrors("email");
      setIsSuccess(true);
      setError("email", {
        type: "manual",
        message: "Password reset link sent! Please check your email.",
      });

      toast.success("Password reset link sent!", {
        id: toastId,
        duration: 2000,
      });
    } catch (err: any) {
      // Error: Set error message and show it in red
      setIsSuccess(false);
      toast.error("Failed to send reset link. Please try again.", {
        id: toastId,
        duration: 2000,
      });
      setError("email", {
        type: "manual",
        message: "Failed to send reset link.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 py-6">
      <div className="grid w-full max-w-6xl items-center gap-4 md:grid-cols-2">
        <div className="max-w-md rounded-lg border border-gray-300 p-6 shadow-[0_2px_22px_-4px_rgba(93,96,127,0.2)] max-md:mx-auto">
          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-5">
              <h3 className="text-center text-3xl font-extrabold">
                Forget Password
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-gray-500 dark:text-gray-400">
                Forget your password? Enter your email to reset it.
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
                {errors.email && (
                  <span
                    className={`text-xs ${
                      isSuccess ? "text-green-500" : "text-red-500"
                    }`}
                  >
                    {errors.email.message || "Email is required"}
                  </span>
                )}
              </div>
            </div>
            <div className="!mt-8">
              <button
                type="submit"
                className={`btn w-full rounded-md border-none bg-primary text-white ${isLoading ? "opacity-50" : ""}`}
                disabled={isLoading}
              >
                {isLoading ? "Processing..." : "Reset Password"}
              </button>
            </div>
          </form>
        </div>
        <div className="max-md:mt-8 md:h-[300px] lg:h-[400px]">
          <img
            src="/auth.webp"
            className="mx-auto block h-full w-full object-cover max-md:w-4/5"
            alt="Forget Password"
          />
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;
