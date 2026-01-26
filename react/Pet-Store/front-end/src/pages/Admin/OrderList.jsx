import Message from "../../components/Message";
import Loader from "../../components/Loader";
import { Link } from "react-router-dom";
import { useGetOrdersQuery } from "../../redux/api/orderApiSlice";
import AdminMenu from "./AdminMenu";

const OrderList = () => {
  const { data: orders = [], isLoading, error } = useGetOrdersQuery();

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Admin Menu */}
      <AdminMenu />

      <h2 className="text-3xl font-bold mb-6 text-gray-800">
        Orders Management
      </h2>

      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error.error}
        </Message>
      ) : orders.length === 0 ? (
        <Message>No orders found</Message>
      ) : (
       <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
  <table className="w-full text-xs sm:text-sm text-left">
    <thead className="bg-gray-100 text-gray-700 uppercase text-[10px] sm:text-xs">
      <tr>
        <th className="px-2 sm:px-4 py-2 sm:py-3">Item</th>
        <th className="px-2 sm:px-4 py-2 sm:py-3 hidden sm:table-cell">
          Order ID
        </th>
        <th className="px-2 sm:px-4 py-2 sm:py-3">User</th>
        <th className="px-2 sm:px-4 py-2 sm:py-3 hidden md:table-cell">
          Date
        </th>
        <th className="px-2 sm:px-4 py-2 sm:py-3">Total</th>
        <th className="px-2 sm:px-4 py-2 sm:py-3 text-center hidden sm:table-cell">
          Paid
        </th>
        <th className="px-2 sm:px-4 py-2 sm:py-3 text-center hidden sm:table-cell">
          Delivered
        </th>
        <th className="px-2 sm:px-4 py-2 sm:py-3 text-center">
          Action
        </th>
      </tr>
    </thead>

    <tbody>
      {orders.map((order) => (
        <tr
          key={order._id}
          className="border-b hover:bg-gray-50 transition"
        >
          <td className="px-2 sm:px-4 py-2 sm:py-3">
            <img
              src={order.orderItems[0].image}
              alt="product"
              className="w-10 h-10 sm:w-14 sm:h-14 object-cover rounded"
            />
          </td>

          <td className="px-2 sm:px-4 py-2 sm:py-3 text-gray-600 hidden sm:table-cell">
            {order._id.slice(0, 10)}...
          </td>

          <td className="px-2 sm:px-4 py-2 sm:py-3 font-medium">
            {order.user?.username || "N/A"}
          </td>

          <td className="px-2 sm:px-4 py-2 sm:py-3 hidden md:table-cell">
            {order.createdAt?.substring(0, 10)}
          </td>

          <td className="px-2 sm:px-4 py-2 sm:py-3 font-semibold">
            ${order.totalPrice}
          </td>

          <td className="px-2 sm:px-4 py-2 sm:py-3 text-center hidden sm:table-cell">
            <span
              className={`px-2 sm:px-3 py-1 rounded-full text-[10px] sm:text-xs font-semibold ${
                order.isPaid
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {order.isPaid ? "Paid" : "Pending"}
            </span>
          </td>

          <td className="px-2 sm:px-4 py-2 sm:py-3 text-center hidden sm:table-cell">
            <span
              className={`px-2 sm:px-3 py-1 rounded-full text-[10px] sm:text-xs font-semibold ${
                order.isDelivered
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {order.isDelivered ? "Delivered" : "Pending"}
            </span>
          </td>

          <td className="px-2 sm:px-4 py-2 sm:py-3 text-center">
            <Link to={`/order/${order._id}`}>
              <button className="bg-petPrimary hover:bg-red-500 text-black px-3 sm:px-4 py-1.5 sm:py-2 rounded text-[10px] sm:text-xs transition">
                View
              </button>
            </Link>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>

      )}
    </div>
  );
};

export default OrderList;
