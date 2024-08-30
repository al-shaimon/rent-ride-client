import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useGetAllAdminBookingQuery } from "../../../redux/features/admin/admin.api";
import { useGetAllCarsQuery } from "../../../redux/features/cars/cars.api";
import { toast } from "sonner";

const AdminOverview = () => {
  const { data, isLoading, isError } = useGetAllAdminBookingQuery([]);
  const { data: carsData, isFetching } = useGetAllCarsQuery([]);

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }
  if (isFetching) {
    return (
      <div className="flex h-screen items-center justify-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (isError) {
    toast.error("Error loading dashboard data");
  }

  const bookings = data?.data || [];
  const cars = carsData?.data || [];

  const totalBookings = bookings.length;
  const approvedBookings = bookings.filter(
    (booking: { approval: any }) => booking.approval,
  ).length;
  const pendingBookings = totalBookings - approvedBookings;
  const totalRevenue = bookings.reduce(
    (sum: any, booking: { totalCost: any }) => sum + booking.totalCost,
    0,
  );
  const availableCars = cars.filter(
    (car: { status: string; isDeleted: boolean }) =>
      car.status === "available" && !car.isDeleted,
  ).length;

  const revenueData = bookings.map(
    (booking: { date: any; totalCost: any }) => ({
      date: booking.date,
      revenue: booking.totalCost,
    }),
  );

  return (
    <div className="min-h-screen bg-base-200 p-6">
      <h1 className="mb-6 text-3xl font-bold">Admin Dashboard Overview</h1>

      <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        <div className="stat bg-primary text-primary-content">
          <div className="text-primary-content">Total Bookings</div>
          <div className="stat-value">{totalBookings}</div>
        </div>
        <div className="stat bg-secondary text-secondary-content">
          <div className="text-secondary-content">Approved Bookings</div>
          <div className="stat-value">{approvedBookings}</div>
        </div>
        <div className="stat bg-accent text-accent-content">
          <div className="text-accent-content">Pending Bookings</div>
          <div className="stat-value">{pendingBookings}</div>
        </div>
        <div className="stat bg-neutral text-neutral-content">
          <div className="text-neutral-content">Available Cars</div>
          <div className="stat-value">{availableCars}</div>
        </div>
      </div>

      <div className="card mb-8 bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">Total Revenue</h2>
          <p className="text-3xl font-bold">${totalRevenue.toFixed(2)}</p>
        </div>
      </div>

      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title mb-4">Revenue Over Time</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="revenue" fill="#1572D3" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default AdminOverview;
