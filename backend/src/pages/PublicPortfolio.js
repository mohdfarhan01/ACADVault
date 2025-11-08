import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { portfolioAPI } from '../services/api';

const PublicPortfolio = () => {
  const { studentId } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    fetchPortfolio();
  }, [studentId]);

  const fetchPortfolio = async () => {
    try {
      const response = await portfolioAPI.getPublic(studentId);
      setData(response.data.data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  if (!data) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="card text-center mb-6">
          <h1 className="text-3xl font-bold">{data.student.name}</h1>
          <p className="text-gray-600">{data.student.email}</p>
        </div>
        <div className="card">
          <h2 className="text-2xl font-bold mb-4">Activities</h2>
          {data.activities.map((activity) => (
            <div key={activity._id} className="mb-4 p-4 bg-gray-50 rounded">
              <h3 className="font-semibold">{activity.title}</h3>
              <p className="text-sm text-gray-600">{activity.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PublicPortfolio;
