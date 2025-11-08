import React, { useState } from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import { recruiterAPI } from '../../services/api';
import { Search, Eye } from 'lucide-react';

const StudentSearch = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await recruiterAPI.searchStudents({});
      setStudents(response.data.data);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-gray-900">Search Students</h1>
        <div className="card">
          <button onClick={handleSearch} className="btn-primary">
            <Search className="w-5 h-5 inline mr-2" />
            Search All Students
          </button>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {students.map((student) => (
            <div key={student._id} className="card">
              <h3 className="font-semibold">{student.name}</h3>
              <p className="text-sm text-gray-600">{student.department}</p>
              <p className="text-sm text-gray-600">CGPA: {student.cgpa}</p>
              <button className="btn-primary w-full mt-4">
                <Eye className="w-4 h-4 inline mr-2" />
                View Portfolio
              </button>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default StudentSearch;
