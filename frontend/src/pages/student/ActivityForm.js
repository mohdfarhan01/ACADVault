import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../../components/DashboardLayout';
import { activityAPI } from '../../services/api';
import { toast } from 'react-toastify';
import { Upload } from 'lucide-react';

const ActivityForm = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'achievement',
    dateStarted: '',
    dateCompleted: '',
    isOngoing: false,
    organization: '',
    location: '',
    skillsGained: '',
  });
  const [files, setFiles] = useState([]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleFileChange = (e) => {
    setFiles(Array.from(e.target.files));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = new FormData();
      Object.keys(formData).forEach((key) => {
        if (key === 'skillsGained') {
          data.append(key, JSON.stringify(formData[key].split(',').map(s => s.trim())));
        } else {
          data.append(key, formData[key]);
        }
      });

      files.forEach((file) => {
        data.append('documents', file);
      });

      await activityAPI.create(data);
      toast.success('Activity created successfully!');
      navigate('/student/activities');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to create activity');
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Add New Activity</h1>

        <form onSubmit={handleSubmit} className="card space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Title *</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="input-field"
              required
              placeholder="e.g., Won First Prize in Hackathon"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Description *</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="input-field"
              rows="4"
              required
              placeholder="Describe your achievement or activity..."
            />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Category *</label>
              <select name="category" value={formData.category} onChange={handleChange} className="input-field">
                <option value="achievement">Achievement</option>
                <option value="internship">Internship</option>
                <option value="project">Project</option>
                <option value="event_participation">Event Participation</option>
                <option value="competition">Competition</option>
                <option value="certification">Certification</option>
                <option value="publication">Publication</option>
                <option value="workshop">Workshop</option>
                <option value="seminar">Seminar</option>
                <option value="hackathon">Hackathon</option>
                <option value="sports">Sports</option>
                <option value="cultural">Cultural</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Organization *</label>
              <input
                type="text"
                name="organization"
                value={formData.organization}
                onChange={handleChange}
                className="input-field"
                required
                placeholder="Organization or institution name"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Start Date *</label>
              <input
                type="date"
                name="dateStarted"
                value={formData.dateStarted}
                onChange={handleChange}
                className="input-field"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Completion Date {formData.isOngoing && '(Ongoing)'}
              </label>
              <input
                type="date"
                name="dateCompleted"
                value={formData.dateCompleted}
                onChange={handleChange}
                className="input-field"
                disabled={formData.isOngoing}
              />
            </div>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              name="isOngoing"
              checked={formData.isOngoing}
              onChange={handleChange}
              className="w-4 h-4 text-primary-600"
            />
            <label className="ml-2 text-sm text-gray-700">This activity is ongoing</label>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="input-field"
              placeholder="City, Country or Online"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Skills Gained</label>
            <input
              type="text"
              name="skillsGained"
              value={formData.skillsGained}
              onChange={handleChange}
              className="input-field"
              placeholder="Separate skills with commas (e.g., JavaScript, React, Node.js)"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Upload Documents (Certificate, Photos, etc.)
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <Upload className="w-12 h-12 text-gray-400 mx-auto mb-2" />
              <input
                type="file"
                multiple
                accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                onChange={handleFileChange}
                className="hidden"
                id="file-upload"
              />
              <label htmlFor="file-upload" className="cursor-pointer text-primary-600 hover:text-primary-700">
                Click to upload files
              </label>
              <p className="text-sm text-gray-500 mt-1">PDF, JPG, PNG up to 10MB each</p>
              {files.length > 0 && (
                <div className="mt-3 text-sm text-gray-700">
                  {files.length} file(s) selected
                </div>
              )}
            </div>
          </div>

          <div className="flex space-x-4">
            <button type="submit" disabled={loading} className="btn-primary flex-1 disabled:opacity-50">
              {loading ? 'Submitting...' : 'Submit Activity'}
            </button>
            <button
              type="button"
              onClick={() => navigate('/student/activities')}
              className="btn-secondary flex-1"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
};

export default ActivityForm;
