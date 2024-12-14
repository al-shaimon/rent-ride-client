 
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";
import { useResetPasswordMutation } from "../../redux/features/auth/authApi";
import { toast } from "sonner";

type Inputs = {
  password: string;
  confirmPassword: string;
};

const ResetPassword = () => {
  const { token } = useParams<{ token: string }>();
  const [resetPassword] = useResetPasswordMutation();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data: FieldValues) => {
    if (data.password !== data.confirmPassword) {
      setError("confirmPassword", {
        type: "manual",
        message: "Passwords do not match",
      });
      return;
    }

    try {
      await resetPassword({
        token,
        password: data.password,
        confirmPassword: data.confirmPassword,
      }).unwrap();
      toast.success("Password reset successfully!");
      navigate("/login");
    } catch (err: any) {
      if (err?.data?.success === false) {
        toast.error(err?.data?.message);
        setError("password", {
          type: "manual",
          message: "Token is invalid or has expired",
        });
        return;
      }
      toast.error("Failed to reset password. Please try again.");
      setError("password", {
        type: "manual",
        message: "Failed to reset password.",
      });
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 py-6">
      <div className="grid w-full max-w-6xl items-center gap-4 md:grid-cols-2">
        <div className="max-w-md rounded-lg border border-gray-300 p-6 shadow-[0_2px_22px_-4px_rgba(93,96,127,0.2)] max-md:mx-auto">
          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-5">
              <h3 className="text-center text-3xl font-extrabold">
                Reset Password
              </h3>
            </div>
            <div>
              <label className="mb-2 block text-sm">New Password</label>
              <div className="relative flex-1">
                <input
                  {...register("password", { required: true, minLength: 6 })}
                  type="password"
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-blue-600"
                  placeholder="Enter new password"
                />
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
              </div>
            </div>
            <div>
              <label className="mb-2 block text-sm">Confirm Password</label>
              <div className="relative flex-1">
                <input
                  {...register("confirmPassword", { required: true })}
                  type="password"
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-blue-600"
                  placeholder="Confirm new password"
                />
                {errors.confirmPassword?.type === "required" && (
                  <span className="text-xs text-red-500">
                    Password is required
                  </span>
                )}
                {errors?.confirmPassword?.message && (
                  <span className="text-xs text-red-500">
                    Passwords must match
                  </span>
                )}
                {errors?.password?.message && (
                  <span className="text-xs text-red-500">
                    {errors?.password?.message}
                  </span>
                )}
              </div>
            </div>
            <div className="!mt-8">
              <button
                type="submit"
                className="btn w-full rounded-md border-none bg-primary text-white"
              >
                Reset Password
              </button>
            </div>
          </form>
        </div>
        <div className="max-md:mt-8 md:h-[300px] lg:h-[400px]">
          <img
            src="/auth.webp"
            className="mx-auto block h-full w-full object-cover max-md:w-4/5"
            alt="Reset Password"
          />
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
