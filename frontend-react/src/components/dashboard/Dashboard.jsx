import React, { useEffect } from "react";
import axiosInstance from "../../axiosInstance";
const Dashboard = () => { 
  useEffect(() => {
    const fetchProtectedData = async () => {
      try {
        const response = await axiosInstance.get("protected-view");
      } catch (err) {
        console.error(err);
      }
    };
    fetchProtectedData();
  }, []);
  return <div className="container text-light">Dashboard</div>;
};

export default Dashboard;
