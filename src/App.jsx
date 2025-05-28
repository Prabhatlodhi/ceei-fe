import { useState } from 'react'
import EmployeeForm from './components/EmployeeForm'
import AdminDashboard from './components/AdminDashboard'
import Header from './components/Header'

function App() {
  const [currentView, setCurrentView] = useState('employee') // 'employee' or 'admin'

  return (
    <div className="min-h-screen bg-gray-950">
      <Header currentView={currentView} setCurrentView={setCurrentView} />
      
      <main className="container mx-auto px-4 py-8 pt-32">
        <div className="fade-in">
          {currentView === 'employee' ? (
            <EmployeeForm />
          ) : (
            <AdminDashboard />
          )}
        </div>
      </main>
      
      <footer className="bg-gray-900 border-t border-gray-800 mt-12">
        <div className="container mx-auto px-4 py-6 text-center text-gray-400">
          <p>&copy; 2025 Employee Feedback Portal. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

export default App