import Message from "../../components/Message";
import Loader from "../../components/Loader";
import { Link } from "react-router-dom";
import { useGetMyOrdersQuery } from "../../redux/api/orderApiSlice";

const UserOrder = () => {
  const { data: orders = [], isLoading, error } = useGetMyOrdersQuery();

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">My Orders</h2>

      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.error || error.error}
        </Message>
      ) : orders.length === 0 ? (
        <Message>No orders found</Message>
      ) : (
        <>
          {/* ================= DESKTOP TABLE ================= */}
          <div className="hidden md:block overflow-x-auto bg-white shadow rounded-lg">
            <table className="w-full text-sm text-left">
              <thead className="bg-gray-100 text-gray-700">
                <tr>
                  <th className="px-4 py-3">Image</th>
                  <th className="px-4 py-3">Order ID</th>
                  <th className="px-4 py-3">Date</th>
                  <th className="px-4 py-3">Total</th>
                  <th className="px-4 py-3 text-center">Paid</th>
                  <th className="px-4 py-3 text-center">Delivered</th>
                  <th className="px-4 py-3"></th>
                </tr>
              </thead>

              <tbody>
                {orders.map((order) => (
                  <tr
                    key={order._id}
                    className="border-b hover:bg-gray-50 transition"
                  >
                    <td className="px-4 py-3">
                      <img
                        src={order.orderItems[0].image}
                        alt="product"
                        className="w-16 h-16 object-cover rounded"
                      />
                    </td>

                    <td className="px-4 py-3 text-gray-700">
                      {order._id.slice(0, 10)}...
                    </td>

                    <td className="px-4 py-3">
                      {order.createdAt.substring(0, 10)}
                    </td>

                    <td className="px-4 py-3 font-semibold">
                      ${order.totalPrice}
                    </td>

                    <td className="px-4 py-3 text-center">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          order.isPaid
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {order.isPaid ? "Paid" : "Pending"}
                      </span>
                    </td>

                    <td className="px-4 py-3 text-center">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          order.isDelivered
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {order.isDelivered ? "Delivered" : "Pending"}
                      </span>
                    </td>

                    <td className="px-4 py-3">
                      <Link to={`/order/${order._id}`}>
                        <button className="bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded text-sm transition">
                          View
                        </button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* ================= MOBILE CARDS ================= */}
          <div className="md:hidden space-y-4">
            {orders.map((order) => (
              <div
                key={order._id}
                className="bg-white shadow rounded-lg p-4 space-y-3"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={order.orderItems[0].image}
                    alt="product"
                    className="w-20 h-20 object-cover rounded"
                  />

                  <div>
                    <p className="text-sm font-semibold">
                      ${order.totalPrice}
                    </p>
                    <p className="text-xs text-gray-500">
                      {order.createdAt.substring(0, 10)}
                    </p>
                  </div>
                </div>

                <div className="flex justify-between text-xs">
                  <span
                    className={`px-3 py-1 rounded-full ${
                      order.isPaid
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {order.isPaid ? "Paid" : "Pending"}
                  </span>

                  <span
                    className={`px-3 py-1 rounded-full ${
                      order.isDelivered
                        ? "bg-green-100 text-green-700"
                        : "bg-petPrimary text-black"
                    }`}
                  >
                    {order.isDelivered ? "Delivered" : "Pending"}
                  </span>
                </div>

                <Link
                  to={`/order/${order._id}`}
                  className="block text-center bg-petPrimary text-white py-2 rounded hover:bg-pink-600 transition"
                >
                  View Details
                </Link>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default UserOrder;
