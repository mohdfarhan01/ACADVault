import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import DashboardLayout from '../../components/DashboardLayout';
import { studentAPI } from '../../services/api';
import { Activity, Award, Clock, TrendingUp, Calendar, CheckCircle } from 'lucide-react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const StudentDashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const response = await studentAPI.getDashboard();
      setDashboardData(response.data.data);
    } catch (error) {
      console.error('Error fetching dashboard:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <DashboardLayout><div className="text-center py-12">Loading...</div></DashboardLayout>;
  }

  const { stats, recentActivities, upcomingEvents } = dashboardData;

  const chartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [{
      label: 'Activities',
      data: [2, 5, 3, 8, 6, 10],
      borderColor: 'rgb(14, 165, 233)',
      backgroundColor: 'rgba(14, 165, 233, 0.1)',
      tension: 0.4
    }]
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Student Dashboard</h1>
          <p className="text-gray-600 mt-1">Welcome back! Here's your activity overview.</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard icon={<Activity className="w-6 h-6" />} title="Total Activities" 
            value={stats.totalActivities} color="blue" />
          <StatCard icon={<CheckCircle className="w-6 h-6" />} title="Verified" 
            value={stats.verifiedActivities} color="green" />
          <StatCard icon={<Clock className="w-6 h-6" />} title="Pending" 
            value={stats.pendingActivities} color="yellow" />
          <StatCard icon={<Award className="w-6 h-6" />} title="Total Points" 
            value={stats.totalPoints} color="purple" />
        </div>

        {/* Chart */}
        <div className="card">
          <h3 className="text-lg font-semibold mb-4">Activity Trend</h3>
          <Line data={chartData} options={{ responsive: true, maintainAspectRatio: true }} />
        </div>

        {/* Recent Activities & Events */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Recent Activities */}
          <div className="card">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Recent Activities</h3>
              <Link to="/student/activities" className="text-primary-600 hover:text-primary-700 text-sm">
                View All
              </Link>
            </div>
            <div className="space-y-3">
              {recentActivities?.slice(0, 5).map((activity) => (
                <ActivityItem key={activity._id} activity={activity} />
              ))}
              {(!recentActivities || recentActivities.length === 0) && (
                <p className="text-gray-500 text-center py-4">No activities yet</p>
              )}
            </div>
            <Link to="/student/activities/new" className="btn-primary w-full mt-4">
              Add New Activity
            </Link>
          </div>

          {/* Upcoming Events */}
          <div className="card">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Upcoming Events</h3>
            </div>
            <div className="space-y-3">
              {upcomingEvents?.map((event) => (
                <EventItem key={event._id} event={event} />
              ))}
              {(!upcomingEvents || upcomingEvents.length === 0) && (
                <p className="text-gray-500 text-center py-4">No upcoming events</p>
              )}
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
        <div className={`p-3 rounded-lg ${colorClasses[color]}`}>
          {icon}
        </div>
        <div>
          <p className="text-sm text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
        </div>
      </div>
    </div>
  );
};

const ActivityItem = ({ activity }) => (
  <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
    <div className="flex-1">
      <h4 className="font-medium text-gray-900">{activity.title}</h4>
      <p className="text-sm text-gray-600">{activity.category}</p>
    </div>
    <span className={`text-xs px-2 py-1 rounded ${
      activity.verificationStatus === 'verified' ? 'bg-green-100 text-green-800' :
      activity.verificationStatus === 'pending' ? 'bg-yellow-100 text-yellow-800' :
      'bg-red-100 text-red-800'
    }`}>
      {activity.verificationStatus}
    </span>
  </div>
);

const EventItem = ({ event }) => (
  <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
    <Calendar className="w-5 h-5 text-primary-600 mt-1" />
    <div className="flex-1">
      <h4 className="font-medium text-gray-900">{event.title}</h4>
      <p className="text-sm text-gray-600">
        {new Date(event.startDate).toLocaleDateString()}
      </p>
    </div>
  </div>
);

export default StudentDashboard;
