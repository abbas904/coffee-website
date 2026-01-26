import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import Messsage from "../../components/Message";
import Loader from "../../components/Loader";
import {
  useDeliverOrderMutation,
  useGetOrderDetailsQuery,
  useGetPaypalClientIdQuery,
  usePayOrderMutation,
} from "../../redux/api/orderApiSlice";

const Order = () => {
  const { id: orderId } = useParams();

  const {
    data: order,
    refetch,
    isLoading,
    error,
  } = useGetOrderDetailsQuery(orderId);

  const [payOrder, { isLoading: loadingPay }] = usePayOrderMutation();
  const [deliverOrder, { isLoading: loadingDeliver }] =
    useDeliverOrderMutation();
  const { userInfo } = useSelector((state) => state.auth);

  const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();

  const {
    data: paypal,
    isLoading: loadingPaPal,
    error: errorPayPal,
  } = useGetPaypalClientIdQuery();

  useEffect(() => {
    if (!errorPayPal && !loadingPaPal && paypal.clientId) {
      const loadingPaPalScript = async () => {
        paypalDispatch({
          type: "resetOptions",
          value: {
            "client-id": paypal.clientId,
            currency: "USD",
          },
        });
        paypalDispatch({ type: "setLoadingStatus", value: "pending" });
      };

      if (order && !order.isPaid) {
        if (!window.paypal) {
          loadingPaPalScript();
        }
      }
    }
  }, [errorPayPal, loadingPaPal, order, paypal, paypalDispatch]);

  function onApprove(data, actions) {
    return actions.order.capture().then(async function (details) {
      try {
        await payOrder({ orderId, details });
        refetch();
        toast.success("Order is paid");
      } catch (error) {
        toast.error(error?.data?.message || error.message);
      }
    });
  }

  function createOrder(data, actions) {
    return actions.order
      .create({
        purchase_units: [{ amount: { value: order.totalPrice } }],
      })
      .then((orderID) => {
        return orderID;
      });
  }

  function onError(err) {
    toast.error(err.message);
  }

  const deliverHandler = async () => {
    await deliverOrder(orderId);
    refetch();
  };

  return isLoading ? (
    <Loader />
  ) : error ? (
    <Messsage variant="danger">{error.data.message}</Messsage>
  ) : (
    <div className="container mx-auto px-4 sm:px-6 flex flex-col md:flex-row gap-6 sm:gap-8">
      <div className="md:w-2/3 md:pr-4">
        <div className="border gray-300 mt-4 sm:mt-5 pb-4 mb-4 sm:mb-5">
          {order.orderItems.length === 0 ? (
            <Messsage>Order is empty</Messsage>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm sm:text-base">
                <thead className="border-b-2">
                  <tr>
                    <th className="p-2 text-xs sm:text-sm">Image</th>
                    <th className="p-2 text-xs sm:text-sm">Product</th>
                    <th className="p-2 text-center text-xs sm:text-sm">Quantity</th>
                    <th className="p-2 text-xs sm:text-sm">Unit Price</th>
                    <th className="p-2 text-xs sm:text-sm">Total</th>
                  </tr>
                </thead>

                <tbody>
                  {order.orderItems.map((item, index) => (
                    <tr key={index}>
                      <td className="p-2">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-12 h-12 sm:w-16 sm:h-16 object-cover"
                        />
                      </td>

                      <td className="p-2">
                        <Link to={`/product/${item.product}`} className="text-xs sm:text-sm break-words">{item.name}</Link>
                      </td>

                      <td className="p-2 text-center text-xs sm:text-sm">{item.qty}</td>
                      <td className="p-2 text-center text-xs sm:text-sm">${item.price}</td>
                      <td className="p-2 text-center text-xs sm:text-sm">
                        $ {(item.qty * item.price).toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      <div className="md:w-1/3">
        <div className="mt-4 sm:mt-5 border-gray-300 pb-4 mb-4">
          <h2 className="text-lg sm:text-xl font-bold mb-2">Shipping</h2>
          <p className="mb-3 sm:mb-4 mt-3 sm:mt-4 text-sm sm:text-base">
            <strong className="text-pink-500">Order:</strong> <span className="break-all">{order._id}</span>
          </p>

          <p className="mb-3 sm:mb-4 text-sm sm:text-base">
            <strong className="text-pink-500">Name:</strong>{" "}
            {order.user.username}
          </p>

          <p className="mb-3 sm:mb-4 text-sm sm:text-base break-all">
            <strong className="text-pink-500">Email:</strong> {order.user.email}
          </p>

          <p className="mb-3 sm:mb-4 text-sm sm:text-base">
            <strong className="text-pink-500">Address:</strong>{" "}
            {order.shippingAddress.address}, {order.shippingAddress.city}{" "}
            {order.shippingAddress.postalCode}, {order.shippingAddress.country}
          </p>

          <p className="mb-3 sm:mb-4 text-sm sm:text-base">
            <strong className="text-pink-500">Method:</strong>{" "}
            {order.paymentMethod}
          </p>

          {order.isPaid ? (
            <Messsage variant="success">Paid on {order.paidAt}</Messsage>
          ) : (
            <Messsage variant="danger">Not paid</Messsage>
          )}
        </div>

        <h2 className="text-lg sm:text-xl font-bold mb-2 mt-6 sm:mt-8 md:mt-[3rem]">Order Summary</h2>
        <div className="flex justify-between mb-2 text-sm sm:text-base">
          <span>Items</span>
          <span>$ {order.itemsPrice}</span>
        </div>
        <div className="flex justify-between mb-2 text-sm sm:text-base">
          <span>Shipping</span>
          <span>$ {order.shippingPrice}</span>
        </div>
        <div className="flex justify-between mb-2 text-sm sm:text-base">
          <span>Tax</span>
          <span>$ {order.taxPrice}</span>
        </div>
        <div className="flex justify-between mb-2 text-sm sm:text-base font-bold">
          <span>Total</span>
          <span>$ {order.totalPrice}</span>
        </div>

        {!order.isPaid && (
          <div className="mt-4">
            {loadingPay && <Loader />}{" "}
            {isPending ? (
              <Loader />
            ) : (
              <div>
                <div>
                  <PayPalButtons
                    createOrder={createOrder}
                    onApprove={onApprove}
                    onError={onError}
                  ></PayPalButtons>
                </div>
              </div>
            )}
          </div>
        )}

        {loadingDeliver && <Loader />}
        {userInfo && userInfo.isAdmin && order.isPaid && !order.isDelivered && (
          <div className="mt-4">
            <button
              type="button"
              className="bg-pink-500 text-white w-full py-2 sm:py-2.5 rounded text-sm sm:text-base"
              onClick={deliverHandler}
            >
              Mark As Delivered
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Order;