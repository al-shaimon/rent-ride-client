/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  useGetAllUsersQuery,
  useUpdateSingleUserInfoMutation,
} from "../../../redux/features/admin/admin.api";
import { toast } from "sonner";

type UserData = {
  _id: string;
  name: string;
  email: string;
  role: string;
  isDeleted: boolean;
};

const UserManagement = () => {
  const { data, error, isLoading, isFetching, refetch } =
    useGetAllUsersQuery(undefined);
  const [updateSingleUserInfo] = useUpdateSingleUserInfoMutation();

  if (isLoading || isFetching) {
    return (
      <div className="flex h-screen items-center justify-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (error) {
    toast.error("Error loading users");
    return <p className="text-center text-red-500">Error loading users</p>;
  }

  const handleToggleBlockUser = async (user: UserData) => {
    const confirmBlock = window.confirm(
      `Are you sure you want to ${user.isDeleted ? "unblock" : "block"} the user ${user.name}?`,
    );
    if (confirmBlock) {
      try {
        toast(`${user.isDeleted ? "Unblocking" : "Blocking"} user...`, {
          duration: 2000,
        });
        await updateSingleUserInfo({
          userId: user._id,
          updateData: { isDeleted: !user.isDeleted },
        });
        toast.success(
          `User ${user.isDeleted ? "unblocked" : "blocked"} successfully!`,
        );
        refetch();
      } catch (error) {
        toast.error("Failed to update user status");
      }
    }
  };

  const handleChangeUserRole = async (user: UserData) => {
    const newRole = user.role === "admin" ? "user" : "admin";
    const confirmChange = window.confirm(
      `Are you sure you want to change the role of ${user.name} to ${newRole}?`,
    );
    if (confirmChange) {
      try {
        toast(`Changing role to ${newRole}...`, {
          duration: 2000,
        });
        await updateSingleUserInfo({
          userId: user._id,
          updateData: { role: newRole },
        });
        toast.success(`Role changed to ${newRole} successfully!`);
        refetch();
      } catch (error) {
        toast.error("Failed to change user role");
      }
    }
  };

  return (
    <div className="p-4">
      <h1 className="mb-4 text-center text-2xl font-bold">User Management</h1>

      {data && data?.data?.users.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="w-full table-auto overflow-hidden shadow-md">
            <thead>
              <tr>
                <th className="border px-4 py-2">Name</th>
                <th className="border px-4 py-2">Email</th>
                <th className="border px-4 py-2">Role</th>
                <th className="border px-4 py-2">Status</th>
                <th className="border px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {data?.data?.users?.map((user: UserData) => (
                <tr key={user._id} className="text-center">
                  <td className="border px-4 py-2">{user.name}</td>
                  <td className="border px-4 py-2">{user.email}</td>
                  <td className="border px-4 py-2">{user.role}</td>
                  <td className="border px-4 py-2">
                    {user.isDeleted ? (
                      <span className="badge badge-error">Blocked</span>
                    ) : (
                      <span className="badge badge-success">Active</span>
                    )}
                  </td>
                  <td className="flex justify-center gap-2 border px-4 py-2">
                    <button
                      className="btn btn-sm bg-primary text-white"
                      onClick={() => handleChangeUserRole(user)}
                    >
                      Make {user.role === "admin" ? "User" : "Admin"}
                    </button>
                    <button
                      className={`btn btn-sm ${user.isDeleted ? "btn-warning" : "btn-error"} text-white`}
                      onClick={() => handleToggleBlockUser(user)}
                    >
                      {user.isDeleted ? "Unblock" : "Block"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="mt-8 text-center">No users available</p>
      )}
    </div>
  );
};

export default UserManagement;
