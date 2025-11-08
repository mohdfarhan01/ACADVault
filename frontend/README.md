# AcadVault - Academic Record Management System

A comprehensive MERN stack web application for managing academic records, portfolios, and accreditation workflows.

## 🎯 Overview

AcadVault is a complete academic record management platform serving four user roles (students, faculty, administration, organizers, and recruiters) with distinct dashboards and workflows.

## ✨ Key Features

### 1. Centralized Activity Logging & Portfolio Generation
- Students can post achievements (certificates, PDFs, images)
- Log internships, projects, and event participation
- Verified, searchable portfolio accessible to recruiters
- Automated portfolio PDF generation

### 2. Automated Verification Workflow
- Faculty verification with digital signatures
- QR code generation for each verified activity
- Instant validation via QR scanning
- Secure on-the-spot portfolio access

### 3. Role-Based Dashboards
- **Student**: Activity logging, portfolio management, analytics
- **Faculty**: Activity verification, digital signatures
- **Admin**: User management, report generation, institutional activities
- **Organizer**: Event creation and management
- **Recruiter**: Student search, portfolio viewing

### 4. Accreditation Reports
- Automated NAAC/NBA report generation
- 6-month activity logs
- Customizable report criteria
- Department-wise analytics

## 🛠️ Tech Stack

### Backend
- **Node.js & Express.js** - Server and API framework
- **MongoDB & Mongoose** - Database
- **Firebase Admin** - File storage
- **JWT** - Authentication
- **QRCode** - QR code generation
- **PDFKit** - PDF report generation

### Frontend
- **React.js** - UI framework
- **React Router** - Navigation
- **TailwindCSS** - Styling
- **Chart.js** - Analytics visualization
- **Axios** - HTTP client
- **Lucide React** - Icons

## 📋 Prerequisites

- Node.js (v16 or higher)
- MongoDB (v5 or higher)
- npm or yarn
- Firebase account (for file storage)

## 🚀 Installation

### 1. Clone the Repository
```bash
git clone <repository-url>
cd ACADVault
```

### 2. Backend Setup
```bash
cd backend
npm install

# Create .env file
cp .env.example .env

# Configure environment variables in .env
# - MongoDB URI
# - JWT Secret
# - Firebase credentials
# - Email configuration (optional)

# Start backend server
npm run dev
```

The backend will run on `http://localhost:5000`

### 3. Frontend Setup
```bash
cd frontend
npm install

# Create .env file
cp .env.example .env

# Configure environment variables
# - REACT_APP_API_URL=http://localhost:5000/api
# - Firebase configuration

# Start frontend
npm start
```

The frontend will run on `http://localhost:3000`

## 📁 Project Structure

```
ACADVault/
├── backend/
│   ├── config/           # Configuration files
│   ├── controllers/      # Request handlers
│   ├── middleware/       # Custom middleware
│   ├── models/          # MongoDB models
│   ├── routes/          # API routes
│   ├── utils/           # Utility functions
│   └── server.js        # Entry point
│
└── frontend/
    ├── public/          # Static files
    └── src/
        ├── components/  # Reusable components
        ├── context/     # React context
        ├── pages/       # Page components
        ├── services/    # API services
        └── App.js       # Main app component
```

## 🔐 User Roles & Features

### Student
- Register and create profile
- Upload activities with documents
- Track verification status
- Build and customize portfolio
- View analytics and growth charts
- Download portfolio PDF
- QR code for portfolio sharing

### Faculty
- Review pending activity submissions
- Verify or reject activities
- Add verification notes
- Assign points to activities
- Digital signature on verified items

### Admin
- Dashboard with system statistics
- User management (activate/deactivate)
- Generate accreditation reports
- Create institutional activities
- View comprehensive analytics

### Organizer
- Create and manage events
- Track event participants
- Issue certificates
- Event QR codes
- Attendance management

### Recruiter
- Search students by skills, CGPA, department
- View verified portfolios
- Scan QR codes for quick access
- Save favorite candidates

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/register` - Register user
- `POST /api/auth/login` - Login
- `GET /api/auth/me` - Get current user

### Activities
- `GET /api/activities` - Get all activities
- `POST /api/activities` - Create activity
- `GET /api/activities/my-activities` - Get user's activities
- `PUT /api/activities/:id` - Update activity
- `DELETE /api/activities/:id` - Delete activity

### Verification
- `GET /api/verification/pending` - Get pending verifications
- `PUT /api/verification/:id/verify` - Verify activity
- `PUT /api/verification/:id/reject` - Reject activity
- `POST /api/verification/scan` - Scan QR code

### Portfolio
- `GET /api/portfolio/my-portfolio` - Get user portfolio
- `PUT /api/portfolio/my-portfolio` - Update portfolio
- `POST /api/portfolio/generate-pdf` - Generate PDF

### Events
- `GET /api/events` - Get all events
- `POST /api/events` - Create event
- `POST /api/events/:id/register` - Register for event

### Reports
- `POST /api/reports` - Generate report
- `GET /api/reports` - Get all reports
- `GET /api/reports/:id/download` - Download report

## 🔒 Security Features

- JWT-based authentication
- Password hashing with BCrypt
- Role-based access control (RBAC)
- Rate limiting
- Helmet security headers
- CORS configuration
- Input validation

## 📊 Database Models

- **User** - User accounts (all roles)
- **Activity** - Student activities
- **Event** - Institutional events
- **Portfolio** - Student portfolios
- **Report** - Generated reports
- **InstitutionalActivity** - Admin activities

## 🎨 Frontend Pages

### Public Pages
- Landing page
- Login
- Register
- Public portfolio view

### Student Pages
- Dashboard with statistics
- Activity form (create/edit)
- My activities (list/filter)
- Portfolio management

### Faculty Pages
- Dashboard
- Verify activities

### Admin Pages
- Dashboard with system stats
- Reports generation
- User management

### Organizer Pages
- Dashboard
- Event management
- Create event

### Recruiter Pages
- Dashboard
- Student search
- Portfolio viewer

## 📱 Features Walkthrough

### For Students
1. Register and complete profile
2. Add activities with supporting documents
3. Wait for faculty verification
4. Build portfolio with verified activities
5. Generate and download portfolio PDF
6. Share QR code with recruiters

### For Faculty
1. Login to faculty dashboard
2. View pending activity submissions
3. Review documents and details
4. Verify or reject with notes
5. Assign points to verified activities

### For Admins
1. Access system dashboard
2. View comprehensive statistics
3. Manage users and permissions
4. Generate accreditation reports
5. Create institutional activities

### For Organizers
1. Create new events
2. Set registration deadlines
3. Track participant registrations
4. Mark attendance
5. Generate event QR codes

### For Recruiters
1. Search students by criteria
2. View verified portfolios
3. Scan QR codes for quick access
4. Save potential candidates

## 🚀 Deployment

### Backend Deployment
- Deploy to Heroku, AWS, or DigitalOcean
- Set environment variables
- Configure MongoDB Atlas
- Set up Firebase Storage

### Frontend Deployment
- Build: `npm run build`
- Deploy to Netlify, Vercel, or AWS S3
- Configure environment variables
- Update API URL

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

## 📝 Environment Variables

### Backend (.env)
```
PORT=5000
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
JWT_EXPIRE=7d
FIREBASE_PROJECT_ID=your_firebase_project
FIREBASE_STORAGE_BUCKET=your_bucket
FRONTEND_URL=http://localhost:3000
```

### Frontend (.env)
```
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_FIREBASE_API_KEY=your_api_key
REACT_APP_FIREBASE_PROJECT_ID=your_project_id
```

## 📄 License

This project is licensed under the ISC License.

## 👥 Authors

- Development Team

## 🙏 Acknowledgments

- React.js team for the framework
- MongoDB for the database
- Firebase for file storage
- TailwindCSS for styling
- Chart.js for visualizations

## 📞 Support

For support, email support@acadvault.com or create an issue in the repository.

## 🔮 Future Enhancements

- AI-based activity categorization
- Blockchain verification
- Mobile app (React Native)
- Email notifications
- Advanced analytics dashboard
- Integration with learning management systems
- Multi-language support
- Real-time chat between recruiters and students

---

**Built with ❤️ for academic excellence**
