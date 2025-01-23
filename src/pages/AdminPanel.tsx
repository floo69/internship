import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Users, Briefcase, FileText, BarChart2 } from "lucide-react";
import ManageUsers from "./admin/ManageUsers";
import ApproveCompanies from "./admin/ApproveCompanies";
import ReviewInternships from "./admin/ReviewInternships";
import GenerateReports from "./admin/GenerateReports";
import axios from "axios";

const adminSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

type AdminFormData = z.infer<typeof adminSchema>;

const AdminPanel: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState("dashboard");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AdminFormData>({
    resolver: zodResolver(adminSchema),
  });

  const onSubmit = async (data: AdminFormData) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/admins`,
        data
      );
      console.log(response.data);
      setIsLoggedIn(true);
    } catch (error) {
      console.error("Error creating admin:", error);
    }
  };
  if (!isLoggedIn) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Admin Panel</h1>
        <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-6">Admin Login</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <label htmlFor="email" className="block mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                {...register("email")}
                className="w-full px-3 py-2 border rounded-md"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>
            <div className="mb-6">
              <label htmlFor="password" className="block mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                {...register("password")}
                className="w-full px-3 py-2 border rounded-md"
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>
            <button
              type="submit"
              className="w-full bg-purple-600 text-white py-2 rounded-md hover:bg-purple-700 transition duration-300"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    );
  }

  const renderContent = () => {
    switch (activeTab) {
      case "manageUsers":
        return <ManageUsers />;
      case "approveCompanies":
        return <ApproveCompanies />;
      case "reviewInternships":
        return <ReviewInternships />;
      case "generateReports":
        return <GenerateReports />;
      default:
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <DashboardCard
              icon={<Users size={24} />}
              title="Total Users"
              value="1,234"
            />
            <DashboardCard
              icon={<Briefcase size={24} />}
              title="Pending Companies"
              value="15"
            />
            <DashboardCard
              icon={<FileText size={24} />}
              title="Internships to Review"
              value="28"
            />
            <DashboardCard
              icon={<BarChart2 size={24} />}
              title="Reports Generated"
              value="42"
            />
          </div>
        );
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
      <div className="flex flex-wrap mb-8">
        <TabButton
          icon={<Users size={20} />}
          title="Manage Users"
          active={activeTab === "manageUsers"}
          onClick={() => setActiveTab("manageUsers")}
        />
        <TabButton
          icon={<Briefcase size={20} />}
          title="Approve Companies"
          active={activeTab === "approveCompanies"}
          onClick={() => setActiveTab("approveCompanies")}
        />
        <TabButton
          icon={<FileText size={20} />}
          title="Review Internships"
          active={activeTab === "reviewInternships"}
          onClick={() => setActiveTab("reviewInternships")}
        />
        <TabButton
          icon={<BarChart2 size={20} />}
          title="Generate Reports"
          active={activeTab === "generateReports"}
          onClick={() => setActiveTab("generateReports")}
        />
      </div>
      {renderContent()}
    </div>
  );
};

const TabButton: React.FC<{
  icon: React.ReactNode;
  title: string;
  active: boolean;
  onClick: () => void;
}> = ({ icon, title, active, onClick }) => (
  <button
    className={`flex items-center px-4 py-2 mr-2 mb-2 rounded-md ${
      active ? "bg-purple-600 text-white" : "bg-gray-200 text-gray-700"
    } hover:bg-purple-700 hover:text-white transition duration-300`}
    onClick={onClick}
  >
    {icon}
    <span className="ml-2">{title}</span>
  </button>
);

const DashboardCard: React.FC<{
  icon: React.ReactNode;
  title: string;
  value: string;
}> = ({ icon, title, value }) => (
  <div className="bg-white p-6 rounded-lg shadow-md">
    <div className="flex items-center mb-4">
      <div className="bg-purple-100 p-3 rounded-full mr-4">{icon}</div>
      <h2 className="text-xl font-semibold">{title}</h2>
    </div>
    <p className="text-3xl font-bold">{value}</p>
  </div>
);

export default AdminPanel;
