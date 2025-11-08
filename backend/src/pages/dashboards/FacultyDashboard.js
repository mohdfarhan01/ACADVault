import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import DashboardLayout from '../../components/DashboardLayout';
import { verificationAPI } from '../../services/api';
import { FileText, CheckCircle, Clock } from 'lucide-react';

const FacultyDashboard = () => {
  const [pendingActivities, setPendingActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPendingActivities();
  }, []);

  const fetchPendingActivities = async () => {
    try {
      const response = await verificationAPI.getPending();
      setPendingActivities(response.data.data);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-gray-900">Faculty Dashboard</h1>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="card">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-yellow-100 text-yellow-600 rounded-lg">
                <Clock className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Pending Verification</p>
                <p className="text-2xl font-bold">{pendingActivities.length}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Pending Activities</h3>
            <Link to="/faculty/verify" className="btn-primary">
              Verify Activities
            </Link>
          </div>
          <div className="space-y-3">
            {pendingActivities.slice(0, 10).map((activity) => (
              <div key={activity._id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <h4 className="font-medium">{activity.title}</h4>
                  <p className="text-sm text-gray-600">by {activity.student?.name}</p>
                </div>
                <Link to="/faculty/verify" className="text-primary-600 hover:text-primary-700">
                  Review
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default FacultyDashboard;
