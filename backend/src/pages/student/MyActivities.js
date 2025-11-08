import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import DashboardLayout from '../../components/DashboardLayout';
import { activityAPI } from '../../services/api';
import { Filter, Plus, Eye, Calendar, MapPin } from 'lucide-react';

const MyActivities = () => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchActivities();
  }, []);

  const fetchActivities = async () => {
    try {
      const response = await activityAPI.getMy();
      setActivities(response.data.data);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredActivities = activities.filter((activity) => {
    if (filter === 'all') return true;
    return activity.verificationStatus === filter;
  });

  if (loading) {
    return <DashboardLayout><div className="text-center py-12">Loading...</div></DashboardLayout>;
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">My Activities</h1>
          <Link to="/student/activities/new" className="btn-primary flex items-center space-x-2">
            <Plus className="w-5 h-5" />
            <span>Add Activity</span>
          </Link>
        </div>

        {/* Filter */}
        <div className="card">
          <div className="flex items-center space-x-4">
            <Filter className="w-5 h-5 text-gray-600" />
            <div className="flex space-x-2">
              <button
                onClick={() => setFilter('all')}
                className={`px-4 py-2 rounded-lg ${
                  filter === 'all' ? 'bg-primary-600 text-white' : 'bg-gray-100 text-gray-700'
                }`}
              >
                All ({activities.length})
              </button>
              <button
                onClick={() => setFilter('verified')}
                className={`px-4 py-2 rounded-lg ${
                  filter === 'verified' ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-700'
                }`}
              >
                Verified
              </button>
              <button
                onClick={() => setFilter('pending')}
                className={`px-4 py-2 rounded-lg ${
                  filter === 'pending' ? 'bg-yellow-600 text-white' : 'bg-gray-100 text-gray-700'
                }`}
              >
                Pending
              </button>
              <button
                onClick={() => setFilter('rejected')}
                className={`px-4 py-2 rounded-lg ${
                  filter === 'rejected' ? 'bg-red-600 text-white' : 'bg-gray-100 text-gray-700'
                }`}
              >
                Rejected
              </button>
            </div>
          </div>
        </div>

        {/* Activities Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredActivities.map((activity) => (
            <ActivityCard key={activity._id} activity={activity} />
          ))}
        </div>

        {filteredActivities.length === 0 && (
          <div className="card text-center py-12">
            <p className="text-gray-600 mb-4">No activities found</p>
            <Link to="/student/activities/new" className="btn-primary inline-block">
              Add Your First Activity
            </Link>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

const ActivityCard = ({ activity }) => {
  const statusColors = {
    verified: 'bg-green-100 text-green-800 border-green-200',
    pending: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    rejected: 'bg-red-100 text-red-800 border-red-200',
  };

  return (
    <div className="card hover:shadow-lg transition">
      <div className="flex justify-between items-start mb-3">
        <span className="px-2 py-1 bg-primary-100 text-primary-700 text-xs rounded">
          {activity.category}
        </span>
        <span className={`px-2 py-1 text-xs rounded border ${statusColors[activity.verificationStatus]}`}>
          {activity.verificationStatus}
        </span>
      </div>

      <h3 className="text-lg font-semibold text-gray-900 mb-2">{activity.title}</h3>
      <p className="text-sm text-gray-600 mb-3 line-clamp-2">{activity.description}</p>

      <div className="space-y-1 text-sm text-gray-600 mb-3">
        <div className="flex items-center">
          <Calendar className="w-4 h-4 mr-2" />
          {new Date(activity.dateStarted).toLocaleDateString()}
        </div>
        <div className="flex items-center">
          <MapPin className="w-4 h-4 mr-2" />
          {activity.organization}
        </div>
      </div>

      {activity.qrCode && (
        <div className="mt-3 pt-3 border-t border-gray-200">
          <img src={activity.qrCode} alt="QR Code" className="w-24 h-24 mx-auto" />
        </div>
      )}

      {activity.verificationNotes && (
        <div className="mt-3 pt-3 border-t border-gray-200">
          <p className="text-xs text-gray-600">
            <strong>Note:</strong> {activity.verificationNotes}
          </p>
        </div>
      )}
    </div>
  );
};

export default MyActivities;
