import Chart from "react-apexcharts";
import { useGetUsersQuery } from "../../redux/api/usersApiSlice";
import {
  useGetTotalOrdersQuery,
  useGetTotalSalesByDateQuery,
  useGetTotalSalesQuery,
} from "../../redux/api/orderApiSlice";

import { useState, useEffect } from "react";
import AdminMenu from "./AdminMenu";
import OrderList from "./OrderList";
import Loader from "../../components/Loader";

const AdminDashboard = () => {
  const { data: sales, isLoading } = useGetTotalSalesQuery();
  const { data: customers, isLoading: loading } = useGetUsersQuery();
  const { data: orders, isLoading: loadingTwo } = useGetTotalOrdersQuery();
  const { data: salesDetail } = useGetTotalSalesByDateQuery();

  const [state, setState] = useState({
    options: {
      chart: {
        type: "line",
      },
      tooltip: {
        theme: "dark",
      },
      colors: ["#00E396"],
      dataLabels: {
        enabled: true,
      },
      stroke: {
        curve: "smooth",
      },
      title: {
        text: "Sales Trend",
        align: "left",
      },
      grid: {
        borderColor: "#ccc",
      },
      markers: {
        size: 1,
      },
      xaxis: {
        categories: [],
        title: {
          text: "Date",
        },
      },
      yaxis: {
        title: {
          text: "Sales",
        },
        min: 0,
      },
      legend: {
        position: "top",
        horizontalAlign: "right",
        floating: true,
        offsetY: -25,
        offsetX: -5,
      },
    },
    series: [{ name: "Sales", data: [] }],
  });

  useEffect(() => {
    if (salesDetail) {
      const formattedSalesDate = salesDetail.map((item) => ({
        x: item._id,
        y: item.totalSales,
      }));

      setState((prevState) => ({
        ...prevState,
        options: {
          ...prevState.options,
          xaxis: {
            categories: formattedSalesDate.map((item) => item.x),
          },
        },

        series: [
          { name: "Sales", data: formattedSalesDate.map((item) => item.y) },
        ],
      }));
    }
  }, [salesDetail]);

  return (
    <>
      <AdminMenu />

      <section className="px-4 sm:px-6 lg:px-8 xl:ml-[4rem]">
        <div className="w-full max-w-7xl mx-auto flex flex-col sm:flex-row justify-center sm:justify-around flex-wrap gap-4 sm:gap-6">
          <div className="rounded-lg bg-petCardBg p-4 sm:p-5 w-full sm:w-[280px] md:w-[20rem] mt-4 sm:mt-5">
            <div className="font-bold rounded-full w-[2.5rem] sm:w-[3rem] bg-pink-500 text-center p-2 sm:p-3 text-sm sm:text-base">
              $
            </div>

            <p className="mt-4 sm:mt-5 text-sm sm:text-base">Sales</p>
            <h1 className="text-lg sm:text-xl font-bold">
              $ {isLoading ? <Loader /> : sales?.totalSales?.toFixed(2) || '0.00'}
            </h1>
          </div>
          <div className="rounded-lg bg-petCardBg p-4 sm:p-5 w-full sm:w-[280px] md:w-[20rem] mt-4 sm:mt-5">
            <div className="font-bold rounded-full w-[2.5rem] sm:w-[3rem] bg-pink-500 text-center p-2 sm:p-3 text-sm sm:text-base">
              $
            </div>

            <p className="mt-4 sm:mt-5 text-sm sm:text-base">Customers</p>
            <h1 className="text-lg sm:text-xl font-bold">
              {loading ? <Loader /> : customers?.length || 0}
            </h1>
          </div>
          <div className="rounded-lg bg-petCardBg p-4 sm:p-5 w-full sm:w-[280px] md:w-[20rem] mt-4 sm:mt-5">
            <div className="font-bold rounded-full w-[2.5rem] sm:w-[3rem] bg-pink-500 text-center p-2 sm:p-3 text-sm sm:text-base">
              $
            </div>

            <p className="mt-4 sm:mt-5 text-sm sm:text-base">All Orders</p>
            <h1 className="text-lg sm:text-xl font-bold">
              {loadingTwo ? <Loader /> : orders?.totalOrders || 0}
            </h1>
          </div>
        </div>

        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-0 lg:ml-[10rem] mt-6 sm:mt-8 md:mt-[4rem]">
          <div className="overflow-x-auto">
          <Chart
            options={state.options}
            series={state.series}
            type="bar"
              width="100%"
              height="350"
          />
          </div>
        </div>

        <div className="mt-6 sm:mt-8 md:mt-[4rem] px-4 sm:px-6">
          <OrderList />
        </div>
      </section>
    </>
  );
};

export default AdminDashboard;