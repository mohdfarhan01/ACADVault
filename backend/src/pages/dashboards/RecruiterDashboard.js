import React from 'react';
import { Link } from 'react-router-dom';
import DashboardLayout from '../../components/DashboardLayout';
import { Search, Users, Briefcase } from 'lucide-react';

const RecruiterDashboard = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-gray-900">Recruiter Dashboard</h1>

        <div className="grid md:grid-cols-3 gap-6">
          <Link to="/recruiter/search" className="card hover:shadow-lg transition cursor-pointer">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-blue-100 text-blue-600 rounded-lg">
                <Search className="w-6 h-6" />
              </div>
              <div>
                <p className="font-semibold">Search Students</p>
                <p className="text-sm text-gray-600">Find talent</p>
              </div>
            </div>
          </Link>
        </div>

        <div className="card">
          <h3 className="text-lg font-semibold mb-4">Welcome to AcadVault</h3>
          <p className="text-gray-600 mb-4">
            Search for talented students, view their verified portfolios, and connect with potential candidates.
          </p>
          <Link to="/recruiter/search" className="btn-primary inline-block">
            Start Searching
          </Link>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default RecruiterDashboard;
