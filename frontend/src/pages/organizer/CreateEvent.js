import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../../components/DashboardLayout';
import { eventAPI } from '../../services/api';
import { toast } from 'react-toastify';

const CreateEvent = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'technical',
    startDate: '',
    endDate: '',
    venue: '',
    isOnline: false,
    meetingLink: '',
    maxParticipants: '',
    registrationDeadline: '',
    department: '',
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await eventAPI.create(formData);
      toast.success('Event created successfully!');
      navigate('/organizer/events');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to create event');
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Create New Event</h1>

        <form onSubmit={handleSubmit} className="card space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Event Title *</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="input-field"
              required
              placeholder="e.g., Annual Tech Symposium 2024"
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
              placeholder="Describe the event..."
            />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Category *</label>
              <select name="category" value={formData.category} onChange={handleChange} className="input-field">
                <option value="technical">Technical</option>
                <option value="cultural">Cultural</option>
                <option value="sports">Sports</option>
                <option value="workshop">Workshop</option>
                <option value="seminar">Seminar</option>
                <option value="conference">Conference</option>
                <option value="hackathon">Hackathon</option>
                <option value="competition">Competition</option>
                <option value="webinar">Webinar</option>
                <option value="training">Training</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Department</label>
              <input
                type="text"
                name="department"
                value={formData.department}
                onChange={handleChange}
                className="input-field"
                placeholder="e.g., Computer Science"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Start Date *</label>
              <input
                type="datetime-local"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                className="input-field"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">End Date *</label>
              <input
                type="datetime-local"
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
                className="input-field"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Venue *</label>
            <input
              type="text"
              name="venue"
              value={formData.venue}
              onChange={handleChange}
              className="input-field"
              required
              placeholder="e.g., Main Auditorium or Online"
            />
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              name="isOnline"
              checked={formData.isOnline}
              onChange={handleChange}
              className="w-4 h-4 text-primary-600"
            />
            <label className="ml-2 text-sm text-gray-700">This is an online event</label>
          </div>

          {formData.isOnline && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Meeting Link</label>
              <input
                type="url"
                name="meetingLink"
                value={formData.meetingLink}
                onChange={handleChange}
                className="input-field"
                placeholder="https://meet.example.com/event"
              />
            </div>
          )}

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Max Participants</label>
              <input
                type="number"
                name="maxParticipants"
                value={formData.maxParticipants}
                onChange={handleChange}
                className="input-field"
                min="1"
                placeholder="Leave blank for unlimited"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Registration Deadline</label>
              <input
                type="date"
                name="registrationDeadline"
                value={formData.registrationDeadline}
                onChange={handleChange}
                className="input-field"
              />
            </div>
          </div>

          <div className="flex space-x-4">
            <button type="submit" disabled={loading} className="btn-primary flex-1 disabled:opacity-50">
              {loading ? 'Creating...' : 'Create Event'}
            </button>
            <button
              type="button"
              onClick={() => navigate('/organizer/events')}
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

export default CreateEvent;
