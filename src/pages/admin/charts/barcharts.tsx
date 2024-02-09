import { useSelector } from "react-redux";
import AdminSidebar from "../../../components/admin/AdminSidebar";
import { BarChart } from "../../../components/admin/Charts";
import { RootState } from "../../../redux/store";
import { useBarQuery } from "../../../redux/api/dashboardApi";
import toast from "react-hot-toast";
import { CustomError } from "../../../types/api-types";
import { Skeleton } from "../../../components/loader";
import { getLastMonths } from "../../../utils/features";


const {last12Months,last6Months } = getLastMonths();
  
const Barcharts = () => {

  const { user } = useSelector((state: RootState) => state.userReducer)
  

  const { isLoading, error, isError, data } = useBarQuery(user?._id!)

  const users = data?.charts.users || [];
  const orders = data?.charts.orders || [];
  const products = data?.charts.products || [];


  if (isError) {
    const err = error as CustomError;
    toast.error(err.data.message);
  }

  return (
    <div className="admin-container">
      <AdminSidebar />
      <main className="chart-container">
        <h1>Bar Charts</h1>
        {isLoading ? <Skeleton length={20} /> : <>
        <section>
          <BarChart
            data_1={products}
            data_2={users}
            title_1="Products"
            title_2="Users"
            labels={last6Months}
            bgColor_1={`hsl(260, 50%, 30%)`}
            bgColor_2={`hsl(360, 90%, 90%)`}
          />
          <h2>Top Products & Top Customers</h2>
        </section>

        <section>
          <BarChart
            horizontal={true}
            data_1={orders}
            data_2={[]}
            title_1="Orders"
            title_2=""
            bgColor_1={`hsl(180, 40%, 50%)`}
            bgColor_2=""
            labels={last12Months}
          />
          <h2>Orders throughout the year</h2>
        </section>
        </>}
      </main>
    </div>
  );
};

export default Barcharts;
