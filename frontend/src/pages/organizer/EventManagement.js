import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import DashboardLayout from '../../components/DashboardLayout';
import { eventAPI } from '../../services/api';
import { Calendar, Users, MapPin, Plus } from 'lucide-react';

const EventManagement = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await eventAPI.getMy();
      setEvents(response.data.data);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <DashboardLayout><div className="text-center py-12">Loading...</div></DashboardLayout>;
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">Event Management</h1>
          <Link to="/organizer/events/new" className="btn-primary flex items-center space-x-2">
            <Plus className="w-5 h-5" />
            <span>Create Event</span>
          </Link>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <EventCard key={event._id} event={event} />
          ))}
        </div>

        {events.length === 0 && (
          <div className="card text-center py-12">
            <p className="text-gray-600 mb-4">No events created yet</p>
            <Link to="/organizer/events/new" className="btn-primary inline-block">
              Create Your First Event
            </Link>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

const EventCard = ({ event }) => {
  const statusColors = {
    upcoming: 'bg-blue-100 text-blue-800',
    ongoing: 'bg-green-100 text-green-800',
    completed: 'bg-gray-100 text-gray-800',
    cancelled: 'bg-red-100 text-red-800',
  };

  return (
    <div className="card hover:shadow-lg transition">
      <div className="flex justify-between items-start mb-3">
        <span className="px-2 py-1 bg-primary-100 text-primary-700 text-xs rounded">
          {event.category}
        </span>
        <span className={`px-2 py-1 text-xs rounded ${statusColors[event.status]}`}>
          {event.status}
        </span>
      </div>

      <h3 className="text-lg font-semibold text-gray-900 mb-2">{event.title}</h3>
      <p className="text-sm text-gray-600 mb-3 line-clamp-2">{event.description}</p>

      <div className="space-y-2 text-sm text-gray-600">
        <div className="flex items-center">
          <Calendar className="w-4 h-4 mr-2" />
          {new Date(event.startDate).toLocaleDateString()}
        </div>
        <div className="flex items-center">
          <MapPin className="w-4 h-4 mr-2" />
          {event.venue}
        </div>
        <div className="flex items-center">
          <Users className="w-4 h-4 mr-2" />
          {event.participants?.length || 0} Participants
        </div>
      </div>

      {event.qrCode && (
        <div className="mt-3 pt-3 border-t border-gray-200">
          <img src={event.qrCode} alt="Event QR" className="w-24 h-24 mx-auto" />
        </div>
      )}
    </div>
  );
};

export default EventManagement;
