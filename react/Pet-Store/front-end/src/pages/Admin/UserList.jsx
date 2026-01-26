import { useEffect, useState } from "react";
import { FaTrash, FaEdit, FaCheck, FaTimes } from "react-icons/fa";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import {
  useDeleteUserMutation,
  useGetUsersQuery,
  useUpdateUserMutation,
} from "../../redux/api/usersApiSlice";
import { toast } from "react-toastify";

const UserList = () => {
  const { data: users, refetch, isLoading, error } = useGetUsersQuery();

  const [deleteUser] = useDeleteUserMutation();
  const [updateUser] = useUpdateUserMutation();

  const [editableUserId, setEditableUserId] = useState(null);
  const [editableUserName, setEditableUserName] = useState("");
  const [editableUserEmail, setEditableUserEmail] = useState("");

  useEffect(() => {
    refetch();
  }, [refetch]);

  const deleteHandler = async (id) => {
    if (window.confirm("Are you sure")) {
      try {
        await deleteUser(id);
        refetch();
        toast.success("User deleted successfully");
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  const toggleEdit = (id, username, email) => {
    setEditableUserId(id);
    setEditableUserName(username);
    setEditableUserEmail(email);
  };

  const updateHandler = async (id) => {
    try {
      await updateUser({
        userId: id,
        username: editableUserName,
        email: editableUserEmail,
      });
      setEditableUserId(null);
      refetch();
      toast.success("User updated successfully");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  if (isLoading) return <Loader />;
  if (error)
    return (
      <Message variant="danger">
        {error?.data?.message || error.error || "Something went wrong"}
      </Message>
    );

  if (!users) return null;

  return (
    <div className="max-w-6xl mx-auto p-4 space-y-6">
      <h1 className="text-2xl sm:text-3xl font-bold text-center text-petPrimary">
        Users
      </h1>
      <p className="text-sm text-gray-500 text-center">
        Total Users: {users.length}
      </p>

      {/* Desktop Table */}
      <div className="hidden md:block">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="border-b">
              <th className="px-4 py-2 text-left text-petPrimary">ID</th>
              <th className="px-4 py-2 text-left text-petPrimary">Name</th>
              <th className="px-4 py-2 text-left text-petPrimary">Email</th>
              <th className="px-4 py-2 text-left text-petPrimary">Admin</th>
              <th className="px-4 py-2"></th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id} className="border-b">
                <td className="px-4 py-2">{user._id}</td>
                <td className="px-4 py-2">
                  {editableUserId === user._id ? (
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        value={editableUserName}
                        onChange={(e) => setEditableUserName(e.target.value)}
                        className="w-full p-2 border rounded-lg"
                      />
                      <button
                        onClick={() => updateHandler(user._id)}
                        className="bg-green-600 text-white py-1 px-3 rounded-lg"
                      >
                        <FaCheck />
                      </button>
                      <button
                        onClick={() => setEditableUserId(null)}
                        className="bg-gray-300 text-gray-700 py-1 px-3 rounded-lg"
                      >
                        <FaTimes />
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      {user.username}
                      <button
                        onClick={() =>
                          toggleEdit(user._id, user.username, user.email)
                        }
                      >
                        <FaEdit />
                      </button>
                    </div>
                  )}
                </td>
                <td className="px-4 py-2">
                  {editableUserId === user._id ? (
                    <input
                      type="text"
                      value={editableUserEmail}
                      onChange={(e) => setEditableUserEmail(e.target.value)}
                      className="w-full p-2 border rounded-lg"
                    />
                  ) : (
                    <a href={`mailto:${user.email}`}>{user.email}</a>
                  )}
                </td>
                <td className="px-4 py-2">
                  {user.isAdmin ? (
                    <FaCheck className="text-green-600" />
                  ) : (
                    <FaTimes className="text-red-600" />
                  )}
                </td>
                <td className="px-4 py-2">
                  {!user.isAdmin && (
                    <button
                      onClick={() => deleteHandler(user._id)}
                      className="bg-red-600 hover:bg-red-700 text-white py-1 px-3 rounded-lg"
                    >
                      <FaTrash />
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden flex flex-col gap-4">
        {users.map((user) => (
          <div
            key={user._id}
            className="border rounded-lg p-4 flex flex-col gap-2 shadow-sm bg-white"
          >
            <div className="flex justify-between items-center">
              <span className="font-mono">{user._id.slice(0, 6)}...</span>
              <div className="flex gap-2">
                {editableUserId === user._id ? (
                  <>
                    <button
                      onClick={() => updateHandler(user._id)}
                      className="bg-green-600 text-white py-1 px-3 rounded-lg"
                    >
                      <FaCheck />
                    </button>
                    <button
                      onClick={() => setEditableUserId(null)}
                      className="bg-gray-300 text-gray-700 py-1 px-3 rounded-lg"
                    >
                      <FaTimes />
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() =>
                        toggleEdit(user._id, user.username, user.email)
                      }
                      className="bg-blue-500 text-white py-1 px-3 rounded-lg"
                    >
                      <FaEdit />
                    </button>
                    {!user.isAdmin && (
                      <button
                        onClick={() => deleteHandler(user._id)}
                        className="bg-red-600 text-white py-1 px-3 rounded-lg"
                      >
                        <FaTrash />
                      </button>
                    )}
                  </>
                )}
              </div>
            </div>

            {editableUserId === user._id ? (
              <>
                <input
                  type="text"
                  value={editableUserName}
                  onChange={(e) => setEditableUserName(e.target.value)}
                  className="w-full p-2 border rounded-lg"
                  placeholder="Name"
                />
                <input
                  type="text"
                  value={editableUserEmail}
                  onChange={(e) => setEditableUserEmail(e.target.value)}
                  className="w-full p-2 border rounded-lg"
                  placeholder="Email"
                />
              </>
            ) : (
              <>
                <p className="font-medium">{user.username}</p>
                <p className="truncate text-sm">{user.email}</p>
              </>
            )}

            <div>
              Admin:{" "}
              {user.isAdmin ? (
                <FaCheck className="text-green-600 inline" />
              ) : (
                <FaTimes className="text-red-600 inline" />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserList;
