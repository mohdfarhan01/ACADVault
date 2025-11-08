import React, { useState, useEffect } from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import { adminAPI } from '../../services/api';
import { Users, Activity, Calendar, CheckCircle } from 'lucide-react';

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const response = await adminAPI.getDashboard();
      setStats(response.data.data);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <DashboardLayout><div>Loading...</div></DashboardLayout>;

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard icon={<Users />} title="Total Users" value={stats.totalUsers} color="blue" />
          <StatCard icon={<Users />} title="Students" value={stats.totalStudents} color="green" />
          <StatCard icon={<Activity />} title="Activities" value={stats.totalActivities} color="purple" />
          <StatCard icon={<Calendar />} title="Events" value={stats.totalEvents} color="yellow" />
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <div className="card">
            <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
            <div className="space-y-2">
              <button className="w-full btn-primary">Generate Report</button>
              <button className="w-full btn-secondary">Manage Users</button>
            </div>
          </div>

          <div className="card">
            <h3 className="text-lg font-semibold mb-4">System Stats</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Pending Verifications:</span>
                <span className="font-semibold">{stats.pendingVerifications}</span>
              </div>
              <div className="flex justify-between">
                <span>Verified Activities:</span>
                <span className="font-semibold">{stats.verifiedActivities}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

const StatCard = ({ icon, title, value, color }) => {
  const colorClasses = {
    blue: 'bg-blue-100 text-blue-600',
    green: 'bg-green-100 text-green-600',
    yellow: 'bg-yellow-100 text-yellow-600',
    purple: 'bg-purple-100 text-purple-600',
  };

  return (
    <div className="card">
      <div className="flex items-center space-x-4">
        <div className={`p-3 rounded-lg ${colorClasses[color]}`}>{icon}</div>
        <div>
          <p className="text-sm text-gray-600">{title}</p>
          <p className="text-2xl font-bold">{value}</p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
