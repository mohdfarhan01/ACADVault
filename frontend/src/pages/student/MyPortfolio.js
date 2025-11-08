import React, { useState, useEffect } from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import { portfolioAPI } from '../../services/api';
import { toast } from 'react-toastify';
import { Download, Share2, Eye, Edit } from 'lucide-react';
import QRCode from 'qrcode.react';

const MyPortfolio = () => {
  const [portfolio, setPortfolio] = useState(null);
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    bio: '',
    skills: [],
    interests: [],
    socialLinks: {},
    isPublic: true,
  });

  useEffect(() => {
    fetchPortfolio();
  }, []);

  const fetchPortfolio = async () => {
    try {
      const response = await portfolioAPI.getMy();
      setPortfolio(response.data.data.portfolio);
      setActivities(response.data.data.activities);
      setFormData({
        bio: response.data.data.portfolio?.bio || '',
        skills: response.data.data.portfolio?.skills || [],
        interests: response.data.data.portfolio?.interests || [],
        socialLinks: response.data.data.portfolio?.socialLinks || {},
        isPublic: response.data.data.portfolio?.isPublic ?? true,
      });
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      await portfolioAPI.update(formData);
      toast.success('Portfolio updated successfully!');
      setEditing(false);
      fetchPortfolio();
    } catch (error) {
      toast.error('Failed to update portfolio');
    }
  };

  const handleGeneratePDF = async () => {
    try {
      toast.info('Generating PDF...');
      await portfolioAPI.generatePDF();
      toast.success('PDF generated successfully!');
    } catch (error) {
      toast.error('Failed to generate PDF');
    }
  };

  if (loading) {
    return <DashboardLayout><div className="text-center py-12">Loading...</div></DashboardLayout>;
  }

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">My Portfolio</h1>
          <div className="flex space-x-2">
            <button onClick={handleGeneratePDF} className="btn-secondary flex items-center space-x-2">
              <Download className="w-4 h-4" />
              <span>Download PDF</span>
            </button>
            <button
              onClick={() => setEditing(!editing)}
              className="btn-primary flex items-center space-x-2"
            >
              <Edit className="w-4 h-4" />
              <span>{editing ? 'Cancel' : 'Edit'}</span>
            </button>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Sidebar */}
          <div className="space-y-6">
            <div className="card text-center">
              <div className="w-24 h-24 bg-primary-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-3xl font-bold text-primary-600">
                  {portfolio?.student?.name?.charAt(0)}
                </span>
              </div>
              <h2 className="text-xl font-bold text-gray-900">{portfolio?.student?.name}</h2>
              <p className="text-gray-600">{portfolio?.student?.email}</p>

              {portfolio?.qrCode && (
                <div className="mt-4">
                  <QRCode value={portfolio.qrCodeData} size={150} className="mx-auto" />
                  <p className="text-xs text-gray-500 mt-2">Scan to view portfolio</p>
                </div>
              )}
            </div>

            <div className="card">
              <h3 className="font-semibold mb-3">Statistics</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Activities:</span>
                  <span className="font-semibold">{portfolio?.totalActivities || 0}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Verified:</span>
                  <span className="font-semibold text-green-600">{portfolio?.verifiedActivities || 0}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Points:</span>
                  <span className="font-semibold text-primary-600">{portfolio?.totalPoints || 0}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {editing ? (
              <div className="card">
                <h3 className="font-semibold mb-4">Edit Portfolio</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
                    <textarea
                      value={formData.bio}
                      onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                      className="input-field"
                      rows="4"
                      placeholder="Tell us about yourself..."
                    />
                  </div>

                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.isPublic}
                      onChange={(e) => setFormData({ ...formData, isPublic: e.target.checked })}
                      className="w-4 h-4 text-primary-600"
                    />
                    <label className="ml-2 text-sm text-gray-700">Make portfolio public</label>
                  </div>

                  <button onClick={handleSave} className="btn-primary w-full">
                    Save Changes
                  </button>
                </div>
              </div>
            ) : (
              <>
                {formData.bio && (
                  <div className="card">
                    <h3 className="font-semibold mb-3">About</h3>
                    <p className="text-gray-700">{formData.bio}</p>
                  </div>
                )}

                <div className="card">
                  <h3 className="font-semibold mb-4">Verified Activities</h3>
                  <div className="space-y-3">
                    {activities.map((activity) => (
                      <div key={activity._id} className="p-4 bg-gray-50 rounded-lg">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-medium text-gray-900">{activity.title}</h4>
                            <p className="text-sm text-gray-600">{activity.organization}</p>
                            <p className="text-xs text-gray-500 mt-1">
                              {new Date(activity.dateStarted).toLocaleDateString()}
                            </p>
                          </div>
                          <span className="px-2 py-1 bg-primary-100 text-primary-700 text-xs rounded">
                            {activity.category}
                          </span>
                        </div>
                      </div>
                    ))}
                    {activities.length === 0 && (
                      <p className="text-gray-500 text-center py-4">No verified activities yet</p>
                    )}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default MyPortfolio;
