import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  Home, Activity, BookOpen, Calendar, Users, 
  FileText, Settings, Award, Search, BarChart3, X 
} from 'lucide-react';

const Sidebar = ({ isOpen, onClose }) => {
  const { user } = useAuth();
  const location = useLocation();

  const getMenuItems = () => {
    const roleMenus = {
      student: [
        { path: '/student/dashboard', icon: Home, label: 'Dashboard' },
        { path: '/student/activities', icon: Activity, label: 'My Activities' },
        { path: '/student/activities/new', icon: Award, label: 'Add Activity' },
        { path: '/student/portfolio', icon: BookOpen, label: 'My Portfolio' },
      ],
      faculty: [
        { path: '/faculty/dashboard', icon: Home, label: 'Dashboard' },
        { path: '/faculty/verify', icon: FileText, label: 'Verify Activities' },
      ],
      admin: [
        { path: '/admin/dashboard', icon: Home, label: 'Dashboard' },
        { path: '/admin/reports', icon: BarChart3, label: 'Reports' },
      ],
      organizer: [
        { path: '/organizer/dashboard', icon: Home, label: 'Dashboard' },
        { path: '/organizer/events', icon: Calendar, label: 'Events' },
        { path: '/organizer/events/new', icon: Calendar, label: 'Create Event' },
      ],
      recruiter: [
        { path: '/recruiter/dashboard', icon: Home, label: 'Dashboard' },
        { path: '/recruiter/search', icon: Search, label: 'Search Students' },
      ],
    };

    return roleMenus[user?.role] || [];
  };

  const menuItems = getMenuItems();

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden" onClick={onClose} />
      )}

      {/* Sidebar */}
      <aside className={`fixed left-0 top-16 h-full bg-white shadow-lg z-50 w-64 transform transition-transform duration-300 
        ${isOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}>
        <div className="p-4">
          <button onClick={onClose} className="lg:hidden absolute top-4 right-4">
            <X className="w-6 h-6" />
          </button>

          <nav className="mt-8 space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={onClose}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition ${
                    isActive
                      ? 'bg-primary-100 text-primary-700'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
