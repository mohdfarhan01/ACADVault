import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { BookOpen } from 'lucide-react';

const Register = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'student',
    studentId: '',
    department: '',
    semester: '',
    company: '',
    organization: '',
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    setLoading(true);

    try {
      const user = await register(formData);
      navigate(`/${user.role}/dashboard`);
    } catch (error) {
      console.error('Registration error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-blue-100 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-2 mb-2">
            <BookOpen className="w-10 h-10 text-primary-600" />
            <h1 className="text-3xl font-bold text-gray-900">AcadVault</h1>
          </div>
          <p className="text-gray-600">Create your account</p>
        </div>

        <div className="card">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange}
                  className="input-field" required />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange}
                  className="input-field" required />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                <input type="password" name="password" value={formData.password} onChange={handleChange}
                  className="input-field" required minLength="6" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Confirm Password</label>
                <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange}
                  className="input-field" required />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">I am a</label>
              <select name="role" value={formData.role} onChange={handleChange} className="input-field">
                <option value="student">Student</option>
                <option value="faculty">Faculty</option>
                <option value="organizer">Organizer</option>
                <option value="recruiter">Recruiter</option>
              </select>
            </div>

            {formData.role === 'student' && (
              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Student ID</label>
                  <input type="text" name="studentId" value={formData.studentId} onChange={handleChange}
                    className="input-field" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Department</label>
                  <input type="text" name="department" value={formData.department} onChange={handleChange}
                    className="input-field" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Semester</label>
                  <input type="number" name="semester" value={formData.semester} onChange={handleChange}
                    className="input-field" min="1" max="8" />
                </div>
              </div>
            )}

            {formData.role === 'recruiter' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Company Name</label>
                <input type="text" name="company" value={formData.company} onChange={handleChange}
                  className="input-field" />
              </div>
            )}

            {formData.role === 'organizer' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Organization</label>
                <input type="text" name="organization" value={formData.organization} onChange={handleChange}
                  className="input-field" />
              </div>
            )}

            <button type="submit" disabled={loading}
              className="w-full btn-primary py-3 text-lg font-semibold disabled:opacity-50">
              {loading ? 'Creating account...' : 'Create Account'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Already have an account?{' '}
              <Link to="/login" className="text-primary-600 hover:text-primary-700 font-medium">
                Sign in
              </Link>
            </p>
          </div>
        </div>

        <div className="mt-6 text-center">
          <Link to="/" className="text-gray-600 hover:text-gray-800">&larr; Back to home</Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
