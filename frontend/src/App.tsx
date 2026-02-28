
import './App.css'
import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import RegisterPage from './pages/RegisterPage'
import LoginPage from './pages/LoginPage'
import DashboardPage from './pages/DashboardPage'
import AddEntryPage from './pages/AddEntryPage'
import EditEntryPage from './pages/EditEntryPage'
import SettingsPage from './pages/SettingsPage'
import ProfilePage from './pages/ProfilePage'

function App() {


  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<HomePage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/login" element={<LoginPage />} />

      {/* Authenticated routes — each page renders its own nav */}
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/add-entry" element={<AddEntryPage />} />
      <Route path="/edit-entry/:logId" element={<EditEntryPage />} />
      <Route path="/settings" element={<SettingsPage />} />
      <Route path="/profile" element={<ProfilePage />} />
    </Routes>
  )
}

export default App
