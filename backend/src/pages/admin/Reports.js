import React, { useState, useEffect } from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import { reportAPI } from '../../services/api';
import { FileText, Download, Plus } from 'lucide-react';

const Reports = () => {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      const response = await reportAPI.getAll();
      setReports(response.data.data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">Reports</h1>
          <button className="btn-primary">
            <Plus className="w-5 h-5 inline mr-2" />
            Generate Report
          </button>
        </div>
        <div className="space-y-4">
          {reports.map((report) => (
            <div key={report._id} className="card">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-semibold">{report.title}</h3>
                  <p className="text-sm text-gray-600">{report.reportType}</p>
                </div>
                <button className="btn-secondary">
                  <Download className="w-4 h-4 inline mr-2" />
                  Download
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Reports;
