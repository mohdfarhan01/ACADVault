import React, { useState, useEffect } from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import { verificationAPI } from '../../services/api';
import { toast } from 'react-toastify';
import { CheckCircle, XCircle, Eye, FileText } from 'lucide-react';

const VerifyActivities = () => {
  const [activities, setActivities] = useState([]);
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [loading, setLoading] = useState(true);
  const [verificationNotes, setVerificationNotes] = useState('');
  const [points, setPoints] = useState(10);

  useEffect(() => {
    fetchPendingActivities();
  }, []);

  const fetchPendingActivities = async () => {
    try {
      const response = await verificationAPI.getPending();
      setActivities(response.data.data);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async (activityId) => {
    try {
      await verificationAPI.verify(activityId, {
        verificationNotes,
        points,
        digitalSignature: `Verified by faculty`,
      });
      toast.success('Activity verified successfully!');
      setSelectedActivity(null);
      fetchPendingActivities();
    } catch (error) {
      toast.error('Failed to verify activity');
    }
  };

  const handleReject = async (activityId) => {
    try {
      await verificationAPI.reject(activityId, { verificationNotes });
      toast.success('Activity rejected');
      setSelectedActivity(null);
      fetchPendingActivities();
    } catch (error) {
      toast.error('Failed to reject activity');
    }
  };

  if (loading) {
    return <DashboardLayout><div className="text-center py-12">Loading...</div></DashboardLayout>;
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-gray-900">Verify Activities</h1>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Activities List */}
          <div className="space-y-4">
            <div className="card">
              <h3 className="font-semibold mb-4">Pending Verification ({activities.length})</h3>
              <div className="space-y-3 max-h-[600px] overflow-y-auto">
                {activities.map((activity) => (
                  <div
                    key={activity._id}
                    onClick={() => setSelectedActivity(activity)}
                    className={`p-4 rounded-lg cursor-pointer transition ${
                      selectedActivity?._id === activity._id
                        ? 'bg-primary-50 border-2 border-primary-300'
                        : 'bg-gray-50 hover:bg-gray-100'
                    }`}
                  >
                    <h4 className="font-medium text-gray-900">{activity.title}</h4>
                    <p className="text-sm text-gray-600">{activity.category}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      By {activity.student?.name} - {activity.student?.studentId}
                    </p>
                  </div>
                ))}
                {activities.length === 0 && (
                  <p className="text-gray-500 text-center py-8">No pending activities</p>
                )}
              </div>
            </div>
          </div>

          {/* Activity Details */}
          <div>
            {selectedActivity ? (
              <div className="card">
                <h3 className="font-semibold mb-4">Activity Details</h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="text-sm text-gray-600">Title</label>
                    <p className="font-medium">{selectedActivity.title}</p>
                  </div>

                  <div>
                    <label className="text-sm text-gray-600">Description</label>
                    <p className="text-gray-800">{selectedActivity.description}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm text-gray-600">Category</label>
                      <p className="font-medium">{selectedActivity.category}</p>
                    </div>
                    <div>
                      <label className="text-sm text-gray-600">Organization</label>
                      <p className="font-medium">{selectedActivity.organization}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm text-gray-600">Start Date</label>
                      <p className="font-medium">
                        {new Date(selectedActivity.dateStarted).toLocaleDateString()}
                      </p>
                    </div>
                    <div>
                      <label className="text-sm text-gray-600">Location</label>
                      <p className="font-medium">{selectedActivity.location || 'N/A'}</p>
                    </div>
                  </div>

                  {selectedActivity.documents && selectedActivity.documents.length > 0 && (
                    <div>
                      <label className="text-sm text-gray-600">Documents</label>
                      <div className="space-y-2 mt-2">
                        {selectedActivity.documents.map((doc, index) => (
                          <a
                            key={index}
                            href={doc.fileUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center space-x-2 text-primary-600 hover:text-primary-700"
                          >
                            <FileText className="w-4 h-4" />
                            <span className="text-sm">{doc.fileName}</span>
                          </a>
                        ))}
                      </div>
                    </div>
                  )}

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Verification Notes
                    </label>
                    <textarea
                      value={verificationNotes}
                      onChange={(e) => setVerificationNotes(e.target.value)}
                      className="input-field"
                      rows="3"
                      placeholder="Add notes about the verification..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Points
                    </label>
                    <input
                      type="number"
                      value={points}
                      onChange={(e) => setPoints(parseInt(e.target.value))}
                      className="input-field"
                      min="0"
                      max="100"
                    />
                  </div>

                  <div className="flex space-x-3 pt-4">
                    <button
                      onClick={() => handleVerify(selectedActivity._id)}
                      className="flex-1 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition flex items-center justify-center space-x-2"
                    >
                      <CheckCircle className="w-5 h-5" />
                      <span>Verify</span>
                    </button>
                    <button
                      onClick={() => handleReject(selectedActivity._id)}
                      className="flex-1 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition flex items-center justify-center space-x-2"
                    >
                      <XCircle className="w-5 h-5" />
                      <span>Reject</span>
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="card text-center py-12">
                <Eye className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                <p className="text-gray-600">Select an activity to review</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default VerifyActivities;
