# Employee Feedback Portal - Frontend

A modern, responsive React application for anonymous employee feedback submission and admin management.

## 🚀 Live Demo

**Deployed Application:** [https://ceei-fe.vercel.app/](https://ceei-fe.vercel.app/)

## 📋 Overview

This frontend application provides a dual-interface system:
- **Employee View**: Anonymous feedback submission form
- **Admin View**: Complete dashboard for managing and reviewing feedback

## 🛠 Tech Stack

- **Framework**: React 18+ with Vite
- **Styling**: Tailwind CSS with custom dark theme
- **Icons**: Lucide React
- **State Management**: React Hooks (useState, useEffect)
- **HTTP Client**: Fetch API
- **Build Tool**: Vite
- **Deployment**: Vercel

## 📁 Project Structure

```
src/
├── components/
│   ├── Header.jsx           # Navigation with view toggle
│   ├── EmployeeForm.jsx     # Feedback submission form
│   └── AdminDashboard.jsx   # Admin management interface
├── services/
│   └── api.js              # API communication layer
├── styles/
│   └── Header.css          # Custom glassmorphism styles
├── App.jsx                 # Main application component
├── main.jsx               # Application entry point
└── index.css              # Global styles and Tailwind imports
```

## 🚀 How to Run Locally

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/Prabhatlodhi/ceei-fe.git
   cd ceei-fe
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory:
   ```bash
   VITE_API_BASE_URL=http://localhost:5000/api
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5173`

### Build for Production

```bash
# Build the application
npm run build

# Preview the production build
npm run preview
```

## 🔧 Environment Configuration

### Development
```bash
VITE_API_BASE_URL=http://localhost:5000/api
```

### Production
```bash
VITE_API_BASE_URL=https://ceei.onrender.com/api
```

## 🎨 Features

### Employee Interface
- ✅ Clean, responsive feedback submission form
- ✅ Category selection (Work Environment, Leadership, Growth, Others)
- ✅ Character count validation (10-1000 characters)
- ✅ Real-time form validation
- ✅ Success/error message handling
- ✅ Anonymous submission guarantee
- ✅ Mobile-responsive design

### Admin Interface
- ✅ Real-time statistics dashboard (Total, Reviewed, Pending, Categories)
- ✅ Advanced filtering system:
  - Search by feedback content
  - Filter by category
  - Filter by review status
  - Customizable pagination (5, 10, 20, 50 items)
- ✅ Feedback management:
  - Mark feedback as reviewed
  - Delete feedback with confirmation
  - View submission timestamps
- ✅ Responsive table design with horizontal scroll
- ✅ Real-time data refresh

### UI/UX Features
- ✅ Dark theme with glassmorphism effects
- ✅ Purple/violet color scheme (no blue colors)
- ✅ Fixed glassmorphism header
- ✅ Smooth animations and transitions
- ✅ Hover effects and micro-interactions
- ✅ Loading states and error handling
- ✅ Accessible design with proper contrast

## 🔄 View Toggle System

The application features a seamless toggle between Employee and Admin views:
- **Header Toggle**: Switch between modes with visual indicators
- **State Management**: Persistent view state during session
- **Responsive Design**: Optimized for both mobile and desktop

## 📱 Responsive Design

- **Mobile First**: Optimized for mobile devices
- **Tablet**: Enhanced layout for medium screens
- **Desktop**: Full-featured interface with side-by-side elements
- **Cross-browser**: Compatible with modern browsers

## 🔒 Security Features

- **Anonymous Submissions**: No user tracking or identification
- **Input Validation**: Client-side validation with server-side backup
- **XSS Protection**: Sanitized input handling
- **CORS Configuration**: Proper cross-origin resource sharing

## 🎯 Assumptions Made

1. **Anonymous Usage**: No user authentication required for employees
2. **Admin Access**: Admin functions accessible without authentication (as per requirements)
3. **Modern Browsers**: Target audience uses modern browsers with ES6+ support
4. **Network Connectivity**: Assumes stable internet connection for API calls
5. **Screen Sizes**: Optimized for devices 320px and above
6. **Content Language**: English language interface

## ✅ What is Complete

### Core Functionality
- [x] Employee feedback submission form
- [x] Admin dashboard with full CRUD operations
- [x] Real-time statistics and filtering
- [x] Responsive design for all screen sizes
- [x] Error handling and loading states
- [x] Form validation and user feedback

### UI/UX
- [x] Dark theme with custom color scheme
- [x] Glassmorphism header design
- [x] Smooth animations and transitions
- [x] Mobile-responsive interface
- [x] Accessibility features

### Technical
- [x] API integration with error handling
- [x] Environment-based configuration
- [x] Production build optimization
- [x] Cross-browser compatibility

## 🔄 What Could Be Enhanced

### Future Enhancements
- [ ] User authentication system
- [ ] Role-based access control
- [ ] Email notifications for new feedback
- [ ] Export functionality (CSV, PDF)
- [ ] Advanced analytics dashboard
- [ ] Feedback categories management
- [ ] Bulk operations for admin
- [ ] Dark/light theme toggle
- [ ] Offline support with service workers
- [ ] Real-time updates with WebSockets

### Performance Optimizations
- [ ] Image optimization and lazy loading
- [ ] Code splitting for larger applications
- [ ] Caching strategies
- [ ] Progressive Web App (PWA) features

## 🛠 API Integration

The frontend communicates with the backend through RESTful APIs:

```javascript
// API Base URL
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

// Available Endpoints
POST   /api/feedback              // Submit new feedback
GET    /api/feedback              // Get all feedback with filters
GET    /api/feedback/:id          // Get specific feedback
PATCH  /api/feedback/:id/reviewed // Mark as reviewed
DELETE /api/feedback/:id          // Delete feedback
GET    /api/feedback/stats        // Get statistics
```

## 🐛 Troubleshooting

### Common Issues

1. **API Connection Failed**
   - Verify backend is running
   - Check VITE_API_BASE_URL in .env file
   - Ensure CORS is properly configured

2. **Build Errors**
   - Delete node_modules and package-lock.json
   - Run `npm install` again
   - Check Node.js version compatibility

3. **Styling Issues**
   - Verify Tailwind CSS is properly configured
   - Check for conflicting CSS classes
   - Ensure custom styles are loading

## 📞 Support

For issues and questions:
- **Repository**: [https://github.com/Prabhatlodhi/ceei-fe](https://github.com/Prabhatlodhi/ceei-fe)
- **Backend Repository**: [https://github.com/Prabhatlodhi/ceei-backend](https://github.com/Prabhatlodhi/ceei-backend)

## 📄 License

This project is licensed under the ISC License.

---

**Note**: This application is part of a full-stack Employee Feedback Portal system. Ensure the backend service is running for full functionality.
