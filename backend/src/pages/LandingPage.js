import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Award, Users, BarChart3, QrCode, Shield } from 'lucide-react';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-blue-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <BookOpen className="w-8 h-8 text-primary-600" />
            <h1 className="text-2xl font-bold text-gray-800">AcadVault</h1>
          </div>
          <div className="space-x-4">
            <Link to="/login" className="text-gray-700 hover:text-primary-600 transition">
              Login
            </Link>
            <Link to="/register" className="btn-primary">
              Get Started
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center max-w-4xl mx-auto">
          <h2 className="text-5xl font-bold text-gray-900 mb-6">
            Comprehensive Academic Record Management
          </h2>
          <p className="text-xl text-gray-700 mb-8">
            Centralized platform for students, faculty, and institutions to manage, verify, 
            and showcase academic achievements with blockchain-like verification.
          </p>
          <div className="flex justify-center space-x-4">
            <Link to="/register" className="btn-primary px-8 py-3 text-lg">
              Start Building Your Portfolio
            </Link>
            <Link to="/login" className="btn-secondary px-8 py-3 text-lg">
              Sign In
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">
          Key Features
        </h3>
        <div className="grid md:grid-cols-3 gap-8">
          <FeatureCard
            icon={<Award className="w-12 h-12 text-primary-600" />}
            title="Activity Logging"
            description="Students can post achievements, internships, projects, and event participations with document uploads."
          />
          <FeatureCard
            icon={<Shield className="w-12 h-12 text-primary-600" />}
            title="Automated Verification"
            description="Faculty-verified activities with digital signatures and QR codes for instant validation."
          />
          <FeatureCard
            icon={<QrCode className="w-12 h-12 text-primary-600" />}
            title="QR Code Scanning"
            description="Recruiters can scan QR codes for secure, on-the-spot access to verified portfolios."
          />
          <FeatureCard
            icon={<Users className="w-12 h-12 text-primary-600" />}
            title="Role-Based Dashboards"
            description="Customized interfaces for students, faculty, admin, organizers, and recruiters."
          />
          <FeatureCard
            icon={<BarChart3 className="w-12 h-12 text-primary-600" />}
            title="Analytics & Reports"
            description="Comprehensive analytics and automated accreditation reports for NAAC/NBA."
          />
          <FeatureCard
            icon={<BookOpen className="w-12 h-12 text-primary-600" />}
            title="Digital Portfolio"
            description="Automatically generated portfolios with downloadable PDFs for job applications."
          />
        </div>
      </section>

      {/* User Roles Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Built for Everyone
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
            <RoleCard title="Students" description="Log activities, build portfolio, track achievements" />
            <RoleCard title="Faculty" description="Verify student activities, provide digital signatures" />
            <RoleCard title="Admin" description="Manage system, generate accreditation reports" />
            <RoleCard title="Organizers" description="Create events, manage participants" />
            <RoleCard title="Recruiters" description="Search students, view verified portfolios" />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <h3 className="text-4xl font-bold text-gray-900 mb-6">
          Ready to Get Started?
        </h3>
        <p className="text-xl text-gray-700 mb-8">
          Join AcadVault today and revolutionize academic record management.
        </p>
        <Link to="/register" className="btn-primary px-12 py-4 text-lg">
          Create Your Account
        </Link>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2024 AcadVault. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

const FeatureCard = ({ icon, title, description }) => (
  <div className="card hover:shadow-lg transition">
    <div className="flex flex-col items-center text-center">
      <div className="mb-4">{icon}</div>
      <h4 className="text-xl font-bold text-gray-900 mb-2">{title}</h4>
      <p className="text-gray-600">{description}</p>
    </div>
  </div>
);

const RoleCard = ({ title, description }) => (
  <div className="card text-center hover:shadow-lg transition">
    <h4 className="text-lg font-bold text-gray-900 mb-2">{title}</h4>
    <p className="text-sm text-gray-600">{description}</p>
  </div>
);

export default LandingPage;
