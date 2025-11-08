# AcadVault Frontend

React-based frontend for the AcadVault Academic Record Management System.

## Features

- Modern, responsive UI with TailwindCSS
- Role-based dashboards for 5 user types
- Real-time analytics with Chart.js
- QR code generation and scanning
- PDF portfolio generation
- Activity management interface
- Event management system
- Verification workflow interface

## Tech Stack

- React 18
- React Router v6
- TailwindCSS
- Axios
- Chart.js
- Lucide React (icons)
- React Toastify
- QRCode.react

## Installation

```bash
npm install
```

## Environment Setup

Create `.env` file:
```
REACT_APP_API_URL=http://localhost:5000/api
```

## Development

```bash
npm start
```

Runs on http://localhost:3000

## Build

```bash
npm run build
```

Creates optimized production build in `build/` folder.

## Project Structure

```
src/
├── components/       # Reusable components
│   ├── Navbar.js
│   ├── Sidebar.js
│   ├── DashboardLayout.js
│   └── PrivateRoute.js
├── context/         # React Context
│   └── AuthContext.js
├── pages/           # Page components
│   ├── dashboards/  # Role-specific dashboards
│   ├── student/     # Student pages
│   ├── faculty/     # Faculty pages
│   ├── organizer/   # Organizer pages
│   ├── recruiter/   # Recruiter pages
│   └── admin/       # Admin pages
├── services/        # API services
│   └── api.js
└── App.js          # Main app
```

## Available Routes

### Public
- `/` - Landing page
- `/login` - Login
- `/register` - Registration
- `/portfolio/:id` - Public portfolio

### Student
- `/student/dashboard`
- `/student/activities`
- `/student/activities/new`
- `/student/portfolio`

### Faculty
- `/faculty/dashboard`
- `/faculty/verify`

### Admin
- `/admin/dashboard`
- `/admin/reports`

### Organizer
- `/organizer/dashboard`
- `/organizer/events`
- `/organizer/events/new`

### Recruiter
- `/recruiter/dashboard`
- `/recruiter/search`

## Key Components

### AuthContext
Manages authentication state and user session.

### PrivateRoute
Protects routes based on authentication and role.

### DashboardLayout
Common layout for all dashboard pages with navbar and sidebar.

## Styling

Uses TailwindCSS utility classes with custom theme:
- Primary color: Blue (#0ea5e9)
- Custom utility classes for buttons, cards, and form inputs

## API Integration

All API calls are centralized in `services/api.js` with Axios interceptors for:
- Automatic token attachment
- Error handling
- Token refresh

## License

ISC
